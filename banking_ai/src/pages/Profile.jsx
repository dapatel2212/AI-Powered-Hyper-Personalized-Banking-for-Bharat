import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/Common/DashboardLayout';
import { UserCircleIcon } from '@heroicons/react/24/solid';

import StressScoreGauge from '../components/Stress/StressScoreGauge';
import useAppStore from '../store/useAppStore';

export default function Profile() {
  const { t } = useTranslation();
  const { customer } = useAppStore();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('profile.title')}</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
        <UserCircleIcon className="w-24 h-24 text-gray-300" />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{customer.name}</h2>
          <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full text-sm">
            🌾 {t(`onboarding.segments.${customer.segment}`)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">{t('login.phone')}</p>
              <p className="font-medium text-gray-900">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.dob')}</p>
              <p className="font-medium text-gray-900">12 Apr 1985</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('profile.aadhaar')}</p>
              <p className="font-medium text-gray-900">XXXX-XXXX-1234</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.stressLevel')}</h3>
          <StressScoreGauge score={customer.stressLevel === 'GREEN' ? 22 : customer.stressLevel === 'YELLOW' ? 45 : customer.stressLevel === 'ORANGE' ? 72 : 90} level={customer.stressLevel} />
        </div>
      </div>
    </DashboardLayout>
  );
}
