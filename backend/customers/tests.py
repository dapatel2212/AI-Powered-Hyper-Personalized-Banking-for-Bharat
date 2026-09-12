"""
Unit tests for Auth endpoints.
"""

from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.contrib.auth.hashers import make_password
from rest_framework.test import APIClient
from utils.auth import get_tokens_for_customer


class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('customers.views.get_collection')
    def test_register_success(self, mock_get_coll):
        mock_coll = MagicMock()
        mock_coll.find_one.return_value = None  # User does not exist
        mock_get_coll.return_value = mock_coll

        res = self.client.post('/api/auth/register/', {
            'email': 'farmer@demo.com',
            'password': 'password123',
            'name': 'Ramesh Kumar',
            'phone': '+919876543210'
        }, format='json')

        self.assertEqual(res.status_code, 201)
        self.assertIn('tokens', res.data)
        self.assertIn('access', res.data['tokens'])
        self.assertIn('refresh', res.data['tokens'])
        self.assertEqual(res.data['customer']['email'], 'farmer@demo.com')
        mock_coll.insert_one.assert_called_once()

    @patch('customers.views.get_collection')
    def test_login_success(self, mock_get_coll):
        mock_coll = MagicMock()
        mock_coll.find_one.return_value = {
            'customer_id': 'CUST_123',
            'email': 'farmer@demo.com',
            'phone': '+919876543210',
            'password': make_password('password123'),
            'name': 'Ramesh Kumar',
        }
        mock_get_coll.return_value = mock_coll

        res = self.client.post('/api/auth/login/', {
            'email': 'farmer@demo.com',
            'password': 'password123'
        }, format='json')

        self.assertEqual(res.status_code, 200)
        self.assertIn('tokens', res.data)
        self.assertIn('access', res.data['tokens'])

    @patch('customers.views.get_collection')
    def test_login_invalid_password(self, mock_get_coll):
        mock_coll = MagicMock()
        mock_coll.find_one.return_value = {
            'customer_id': 'CUST_123',
            'email': 'farmer@demo.com',
            'password': make_password('correct_password'),
        }
        mock_get_coll.return_value = mock_coll

        res = self.client.post('/api/auth/login/', {
            'email': 'farmer@demo.com',
            'password': 'wrong_password'
        }, format='json')

        self.assertEqual(res.status_code, 401)

    def test_token_refresh(self):
        customer = {'customer_id': 'CUST_123', 'email': 'test@demo.com'}
        tokens = get_tokens_for_customer(customer)

        res = self.client.post('/api/auth/token/refresh/', {
            'refresh': tokens['refresh']
        }, format='json')

        self.assertEqual(res.status_code, 200)
        self.assertIn('access', res.data)

    @patch('utils.auth.get_collection')
    def test_profile_with_jwt(self, mock_get_coll):
        customer = {
            'customer_id': 'CUST_123',
            'email': 'test@demo.com',
            'name': 'Test User',
            'segment': 'prudent_savers',
        }
        mock_coll = MagicMock()
        mock_coll.find_one.return_value = customer
        mock_get_coll.return_value = mock_coll

        tokens = get_tokens_for_customer(customer)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")

        res = self.client.get('/api/auth/profile/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['customer_id'], 'CUST_123')
        self.assertEqual(res.data['name'], 'Test User')
