import React from 'react';
import { FileText, Gavel, AlertCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
            <Gavel className="text-brand-green" size={32} />
            <h1 className="text-3xl md:text-4xl font-serif text-brand-green font-bold">Terms of Service</h1>
        </div>
        <p className="text-gray-500 mb-8 italic text-sm">Last Updated: 2025</p>

        <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">1. Legal Agreement</h2>
            <p>
              These Terms of Service constitute a legally binding agreement between you ("The Client") and Cross Connect Africa ("The Company"), situated at Valley View Office Park, B1 Office 1, P.O. Box 18923-00100 Nairobi. By booking a trip, paying a deposit, or participating in any program, you agree to be bound by these terms. These terms are drafted in compliance with the <strong>Law of Contract Act (Cap 23)</strong> and the <strong>Consumer Protection Act, 2012</strong> of Kenya.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">2. Booking & Payment Structure</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Quotations:</strong> All quotations generated via our web app are estimates valid for 30 days and subject to availability. Final pricing is confirmed upon proforma invoice generation.</li>
              <li><strong>Commitment Deposit:</strong> A deposit of <strong>50%</strong> of the total cost is required to confirm and secure a booking. This deposit secures accommodation, transport logistics, certified facilitation staff, and safety resources. Cancellations and refunds are governed by the structured schedule set forth in Section 3 below.</li>
              <li><strong>Balance:</strong> The remaining <strong>50%</strong> balance is payable prior to or upon completion of the service as agreed in the proforma invoice.</li>
              <li><strong>Payment Methods:</strong> Payments should be made via official M-Pesa Paybill (303030 / A/C 2043432128) or Absa Bank Kenya Plc transfer as itemized on your official proforma. Cash payments are discouraged for security reasons.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">3. Cancellation & Refunds</h2>
            <p className="mb-2">Because bookings commit venue reservations, safety equipment, and certified facilitation personnel in advance, the following cancellation schedule applies:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>More than 30 days notice:</strong> 50% of the deposit paid is refunded (the remaining 50% covers administrative preparations and unrecoverable vendor holding commitments).</li>
              <li><strong>15 to 30 days notice:</strong> The deposit is non-refundable (forfeited to cover locked venue, transport, and personnel allocations).</li>
              <li><strong>Less than 14 days notice:</strong> 100% of the total mission cost is payable/forfeited due to committed operational resources.</li>
            </ul>
            <p className="mt-2">
              <strong>Force Majeure:</strong> In the event of cancellation due to Acts of God, political instability, severe weather, or government directives, the Company will offer a credit note for a future date within 12 months, rather than a cash refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">4. Client Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Health:</strong> The Client must disclose any medical conditions or dietary restrictions prior to the trip.</li>
              <li><strong>Conduct:</strong> The Client agrees to adhere to the instructions of the Guide/Facilitator. The Company reserves the right to terminate the participation of any individual whose behavior is deemed dangerous, illegal, or disruptive, without refund.</li>
              <li><strong>Damages:</strong> The Client is liable for any damage caused to equipment, accommodation, or vehicles due to negligence or willful misconduct.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">5. Indemnity & Limitation of Liability</h2>
            <p>
              While the Company takes every precaution to ensure safety, adventure activities carry inherent risks. By participating, the Client acknowledges these risks. The Company's liability is limited to the cost of the trip. The Company is not liable for indirect or consequential losses, including missed flights or lost earnings. This clause is subject to the limitations set forth in the <strong>Unfair Contract Terms Act</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-green mb-3 border-b border-brand-green/10 pb-2">6. Dispute Resolution</h2>
            <p>
              Any dispute arising out of or in connection with this agreement shall first be attempted to be settled amicably. If unresolved, the dispute shall be referred to arbitration in Nairobi in accordance with the <strong>Arbitration Act, 1995</strong> of Kenya.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;