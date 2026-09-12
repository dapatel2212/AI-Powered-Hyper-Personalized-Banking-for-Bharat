import DashboardLayout from '../components/Common/DashboardLayout';
import LoanWizard from '../components/Loan/LoanWizard';

export default function Loan() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Apply for a Loan</h1>
      </div>
      <LoanWizard />
    </DashboardLayout>
  );
}
