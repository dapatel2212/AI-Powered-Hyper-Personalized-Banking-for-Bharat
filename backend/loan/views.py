"""
Loan endpoints: Eligibility check with ethical guardrails,
EMI calculation, and application submission.
"""

import uuid
from datetime import datetime, timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from utils.mongodb_helper import get_collection
from utils.audit import log_decision
from utils.constants import STRESS_LOAN_BLOCK_THRESHOLD


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def loan_eligibility(request, customer_id):
    """
    GET /api/loan/eligibility/{customer_id}/
    Ethical check: blocks if stress_score > 50.
    """
    cust = get_collection('customers').find_one({'customer_id': customer_id})
    if not cust:
        return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

    stress_score = cust.get('stress_score', 0)
    income = cust.get('income_monthly', 25000)

    if stress_score > STRESS_LOAN_BLOCK_THRESHOLD:
        return Response({
            'customer_id': customer_id,
            'is_eligible': False,
            'reason': 'Responsible Lending Lock: Financial stress score exceeds safety threshold.',
            'stress_score': stress_score,
            'alternative_offered': 'emi_restructure'
        })

    max_amount = min(200000, income * 4)

    return Response({
        'customer_id': customer_id,
        'is_eligible': True,
        'pre_approved_amount': max_amount,
        'interest_rate': 11.5,
        'max_tenure_months': 36
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def emi_calculate(request):
    """
    POST /api/loan/emi-calculate/
    Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    """
    data = request.data
    amount = float(data.get('amount', 50000))
    tenure = int(data.get('tenure_months', 12))
    annual_rate = float(data.get('interest_rate', 11.5))

    monthly_rate = annual_rate / (12 * 100)
    pow_val = (1 + monthly_rate) ** tenure
    emi = (amount * monthly_rate * pow_val) / (pow_val - 1)

    total_payment = emi * tenure
    total_interest = total_payment - amount

    return Response({
        'amount': amount,
        'tenure_months': tenure,
        'interest_rate': annual_rate,
        'monthly_emi': round(emi, 2),
        'total_interest': round(total_interest, 2),
        'total_payable': round(total_payment, 2)
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def loan_apply(request):
    """
    POST /api/loan/apply/
    Submits loan application with guardrail check.
    """
    data = request.data
    customer_id = data.get('customer_id') or request.user.customer_id
    amount = float(data.get('amount', 50000))
    tenure = int(data.get('tenure_months', 12))

    cust = get_collection('customers').find_one({'customer_id': customer_id})
    if cust and cust.get('stress_score', 0) > STRESS_LOAN_BLOCK_THRESHOLD:
        log_decision(customer_id, 'loan_application_blocked_guardrail', {'stress_score': cust.get('stress_score')})
        return Response({
            'error': 'Application blocked by ethical AI guardrail due to elevated financial stress.'
        }, status=status.HTTP_403_FORBIDDEN)

    app_id = f"LN_{uuid.uuid4().hex[:8].upper()}"
    now = datetime.now(timezone.utc).isoformat()

    loan_doc = {
        'application_id': app_id,
        'customer_id': customer_id,
        'amount': amount,
        'tenure_months': tenure,
        'status': 'APPROVED',
        'created_at': now
    }
    get_collection('loans').insert_one(loan_doc)
    log_decision(customer_id, 'loan_approved', {'application_id': app_id, 'amount': amount})

    loan_doc.pop('_id', None)
    return Response(loan_doc, status=status.HTTP_201_CREATED)
