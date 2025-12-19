import React, { useState } from 'react';
import { AlertTriangle, FileSignature, Download, MessageCircle, X, CheckCircle } from 'lucide-react';

const LiabilityWaiver: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDownloadAndSign = () => {
    // 1. Trigger the browser print (Save as PDF)
    window.print();
    
    // 2. Show the modal instructing them to send it via WhatsApp after a short delay
    // The delay ensures the print dialog has likely opened
    setTimeout(() => {
        setShowUploadModal(true);
    }, 2000);
  };

  const handleWhatsAppSend = () => {
    const message = `*LIABILITY WAIVER SUBMISSION*
    
I have downloaded, printed, and signed the Liability Waiver.
I am attaching the signed document/photo here.

Client Name: [Please Insert Name]`;

    window.open(`https://wa.me/254710974670?text=${encodeURIComponent(message)}`, '_blank');
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 relative" id="waiver-content">
        <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-brand-gold" size={32} />
            <h1 className="text-3xl md:text-4xl font-serif text-brand-green font-bold">Liability Waiver & Assumption of Risk</h1>
        </div>
        
        <div className="bg-brand-green/5 border-l-4 border-brand-gold p-4 mb-8 text-sm text-brand-green">
            <strong>Legal Notice:</strong> This is a legally binding document. By booking a trip with Cross Connect Africa, you are deemed to have read, understood, and agreed to these terms. It affects your legal rights in the event of injury.
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed font-serif text-sm md:text-base">
          <section>
            <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide mb-3">1. Voluntary Participation & Assumption of Risk</h2>
            <p>
              I hereby acknowledge that I have voluntarily applied to participate in the expedition/activity organized by Cross Connect Africa. I understand that the activities (including but not limited to hiking, camping, rock climbing, and team building exercises) involve inherent risks and hazards, including but not limited to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Physical exertion for which I may not be prepared.</li>
                <li>Forces of nature including extreme weather, lightning, and high altitude.</li>
                <li>Interactions with wild animals, insects, and flora.</li>
                <li>Accidents or illness in remote places without immediate access to medical facilities.</li>
            </ul>
            <p className="mt-2">
              <strong>I expressly accept and assume all such risks, dangers, and hazards</strong>, and the possibility of personal injury, death, property damage, or loss resulting therefrom.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide mb-3">2. Release of Liability</h2>
            <p>
              To the fullest extent permitted by the laws of Kenya, I hereby release, waive, discharge, and covenant not to sue Cross Connect Africa, its directors, employees, agents, and contractors (collectively, the "Releasees") from any and all liability, claims, demands, actions, and causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained by me, whether caused by the negligence of the Releasees or otherwise, while participating in such activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide mb-3">3. Medical Certification & Authorization</h2>
            <p>
              I certify that I have no medical or physical conditions which could interfere with my safety in this activity, or else I am willing to assume and bear the costs of all risks that may be created, directly or indirectly, by any such condition.
            </p>
            <p className="mt-2">
              I authorize Cross Connect Africa staff to obtain or provide emergency medical treatment for me in the event of injury or illness, and I agree to bear all costs associated with such treatment and evacuation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide mb-3">4. Indemnification</h2>
            <p>
              I agree to indemnify and hold harmless the Releasees from any loss, liability, damage, or costs, including court costs and attorney fees, that they may incur due to my participation in said activities, whether caused by negligence of Releasees or otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide mb-3">5. Photography & Media Release</h2>
            <p>
              I grant Cross Connect Africa the right to take photographs, video, and digital recordings of me during the activity and to use these in any and all media for promotional and marketing purposes. I waive any right to inspect or approve the finished product or any right to royalties or other compensation arising from or related to the use of the image.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide mb-3">6. Acknowledgment</h2>
            <p>
              I have read this Waiver and Release of Liability, fully understand its terms, understand that I have given up substantial rights by signing it, and sign it freely and voluntarily without any inducement.
            </p>
          </section>

          {/* Signature Block for Print */}
          <section className="border-t-2 border-gray-200 mt-12 pt-8 print:block hidden">
             <div className="grid grid-cols-2 gap-12">
                 <div>
                    <div className="h-0.5 bg-gray-400 mb-2 w-full"></div>
                    <p className="text-sm font-bold uppercase">Participant Name</p>
                 </div>
                 <div>
                    <div className="h-0.5 bg-gray-400 mb-2 w-full"></div>
                    <p className="text-sm font-bold uppercase">Signature</p>
                 </div>
                 <div>
                    <div className="h-0.5 bg-gray-400 mb-2 w-full"></div>
                    <p className="text-sm font-bold uppercase">Date</p>
                 </div>
                 <div>
                    <div className="h-0.5 bg-gray-400 mb-2 w-full"></div>
                    <p className="text-sm font-bold uppercase">Parent/Guardian (if under 18)</p>
                 </div>
             </div>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center print:hidden">
            <div className="text-xs text-gray-500 italic">
                * Please download, print, sign, and send this document back to us via WhatsApp.
            </div>
            <button 
                onClick={handleDownloadAndSign} 
                className="px-8 py-4 bg-brand-green text-white font-bold rounded uppercase tracking-wider hover:bg-brand-green/90 transition-all flex items-center gap-2 shadow-lg"
            >
                <Download size={20} /> Download PDF & Sign
            </button>
        </div>
      </div>

      {/* SUBMISSION MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className="bg-brand-green p-6 flex justify-between items-center text-white">
                    <h3 className="text-xl font-serif font-bold">Step 2: Sign & Submit</h3>
                    <button onClick={() => setShowUploadModal(false)} className="hover:text-brand-gold"><X size={24} /></button>
                </div>
                <div className="p-8 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} className="text-green-600" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Download Initiated</h4>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        Please save the PDF, print it, and sign at the bottom. Once signed, take a clear photo or scan and send it to our team.
                    </p>

                    <button 
                        onClick={handleWhatsAppSend}
                        className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                        <MessageCircle size={24} /> Attach on WhatsApp
                    </button>
                    
                    <button 
                        onClick={() => setShowUploadModal(false)}
                        className="mt-4 text-xs text-gray-500 underline hover:text-brand-green"
                    >
                        I'll do this later
                    </button>
                </div>
            </div>
        </div>
      )}

      <style>{`
        @media print {
            body * {
                visibility: hidden;
            }
            #waiver-content, #waiver-content * {
                visibility: visible;
            }
            #waiver-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 40px;
                box-shadow: none;
                border: none;
            }
            nav, footer, button {
                display: none !important;
            }
        }
      `}</style>
    </div>
  );
};

export default LiabilityWaiver;