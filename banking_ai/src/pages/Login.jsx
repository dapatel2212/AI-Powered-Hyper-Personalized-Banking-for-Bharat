import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/Common/LanguageSwitcher';
import useAppStore from '../store/useAppStore';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  
  const [consents, setConsents] = useState({
    transaction: false,
    health: false,
    chat: false,
    life: false,
    marketing: false
  });
  
  const [segment, setSegment] = useState('');

  const segments = [
    { id: 'student', label: t('onboarding.segments.student') },
    { id: 'salaried', label: t('onboarding.segments.salaried') },
    { id: 'family', label: t('onboarding.segments.family') },
    { id: 'farmer', label: t('onboarding.segments.farmer') },
    { id: 'shop', label: t('onboarding.segments.shop') },
    { id: 'gig', label: t('onboarding.segments.gig') },
    { id: 'homebuyer', label: t('onboarding.segments.homebuyer') }
  ];

  const { setSegment: setStoreSegment } = useAppStore();

  const handleLogin = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinishOnboarding = () => {
    if (segment) {
      setStoreSegment(segment);
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-end mb-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">{t('login.welcome')}</h1>
        </div>

        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('login.phone')}</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="+91"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('login.otp')}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="----"
                />
                <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  {t('login.sendOtp')}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 mt-4">
              {t('login.verifyOtp')}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('onboarding.consentTitle')}</h2>
              <div className="space-y-3">
                {Object.keys(consents).map(key => (
                  <label key={key} className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      checked={consents[key]}
                      onChange={(e) => setConsents({...consents, [key]: e.target.checked})}
                      className="mt-1 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">
                      {t(`onboarding.consent${key.charAt(0).toUpperCase() + key.slice(1)}`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('onboarding.segmentTitle')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {segments.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSegment(s.id)}
                    className={`p-3 rounded-lg border text-sm text-center transition-colors ${
                      segment === s.id ? 'border-primary bg-primary/5 text-primary font-medium' : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleFinishOnboarding}
              className="w-full py-3 bg-accent text-white rounded-lg font-bold hover:bg-accent/90 shadow-sm mt-8 transition-colors"
            >
              {t('onboarding.continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
