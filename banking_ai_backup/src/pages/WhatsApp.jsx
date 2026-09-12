import DashboardLayout from '../components/Common/DashboardLayout';
import WhatsAppSimulator from '../components/Chatbot/WhatsAppSimulator';

export default function WhatsApp() {
  return (
    <DashboardLayout>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Omnichannel AI Experience</h1>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto">Our NLP engine works across the mobile app and WhatsApp seamlessly. Try out the WhatsApp simulator below.</p>
      </div>
      <WhatsAppSimulator />
    </DashboardLayout>
  );
}
