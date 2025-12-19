
import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
            <Shield className="text-brand-green" size={32} />
            <h1 className="text-3xl md:text-4xl font-serif text-brand-green font-bold">Privacy Policy</h1>
        </div>
        <p className="text-gray-500 mb-8 italic text-sm">Effective Date: October 2023</p>

        <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">1. Introduction & Constitutional Basis</h2>
            <p className="mb-3">
              Cross Connect Africa ("we," "us," or "our") respects your privacy and is committed to protecting your personal data in accordance with the <strong>Constitution of Kenya, 2010</strong>. Specifically, we uphold <strong>Article 31</strong>, which guarantees the right to privacy, including the right not to have information relating to their family or private affairs unnecessarily required or revealed.
            </p>
            <p>
              This policy outlines how we collect, use, and protect your data in compliance with the <strong>Data Protection Act, 2019</strong> and other relevant Kenyan laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">2. Data We Collect</h2>
            <p className="mb-2">To provide safe and effective adventure experiences, we may collect the following personal data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity Data:</strong> Full names, gender, date of birth, and identification numbers (where required for park entry or insurance).</li>
              <li><strong>Contact Data:</strong> Phone numbers (specifically for WhatsApp communication), email addresses, and postal addresses.</li>
              <li><strong>Health & Medical Data:</strong> Information regarding allergies, pre-existing medical conditions, and dietary requirements. This is classified as <em>Sensitive Personal Data</em> under the Data Protection Act and is collected strictly for safety and emergency response purposes.</li>
              <li><strong>Next of Kin Data:</strong> Emergency contact details.</li>
              <li><strong>Media Data:</strong> Photographs and video footage taken during expeditions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">3. Purpose of Processing</h2>
            <p>We process your data for the following lawful purposes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Service Delivery:</strong> To facilitate bookings, secure accommodation, transport, and park entry fees.</li>
              <li><strong>Safety & Emergency:</strong> To ensure our guides and medical team can respond appropriately to health emergencies.</li>
              <li><strong>Communication:</strong> To send itineraries, quotes, and updates via WhatsApp or Email.</li>
              <li><strong>Marketing:</strong> To showcase our activities on social media (subject to your consent regarding media usage).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">4. WhatsApp & Third-Party Communications</h2>
            <p>
              Our web application utilizes direct WhatsApp integration for bookings and inquiries. By clicking "Proceed to Booking" or "Send Message," you consent to transferring the data entered in our forms to the WhatsApp platform, which is governed by its own privacy policy. We advise users not to share sensitive financial information (such as PINs or full Credit Card numbers) via chat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">5. Data Retention & Security</h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. We employ reasonable physical and digital security measures to protect your data from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">6. Your Rights</h2>
            <p>Under the Data Protection Act, 2019, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Be informed of the use to which your personal data is to be put.</li>
              <li>Access your personal data in our custody.</li>
              <li>Object to the processing of all or part of your personal data.</li>
              <li>Correction of false or misleading data.</li>
              <li>Deletion of false or misleading data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">7. Contact Data Controller</h2>
            <p>
              If you have any questions regarding this policy or wish to exercise your rights, please contact our Data Protection Officer at: <br />
              <strong>Email:</strong> crossconnectmisiions@protonmail.com <br />
              <strong>Phone:</strong> +254 710 974 670 <br />
              <strong>Physical Address:</strong> Valley View Office Park, B1 Office 1, Nairobi, Kenya
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
