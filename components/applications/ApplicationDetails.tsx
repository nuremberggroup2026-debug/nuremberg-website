"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Phone, 
  ClipboardCopy, 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Hash, 
  CheckCircle2, 
  Briefcase, 
  FileText, 
  Download 
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NewCareer } from "@/types";

type Application = {
  id?: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone_number: string | null;
  applied_at: Date | null;
  is_shown: boolean | null 
;
  cv: string | null;
  careers: NewCareer | null;
};

interface Props {
  applicationDetails: Application;
  markApplicationAsShownAction: (applicationId: string) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function ApplicationDetailsClient({
  applicationDetails,
  markApplicationAsShownAction,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const email = applicationDetails.email ?? "";
  const phone = applicationDetails.phone_number ?? "";
  const fullName = `${applicationDetails.first_name} ${applicationDetails.last_name ?? ""}`;

  function copyToClipboard(text: string, label = "Copied") {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} to clipboard`);
    });
  }

  const markAsShown = async () => {
    if (!applicationDetails.id) return;
    setLoading(true);
    try {
      const result = await markApplicationAsShownAction(applicationDetails.id);
      if (result.status === 201) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to List
          </button>

          <div className="flex items-center gap-3">
            {!applicationDetails.is_shown ? (
              <button
                disabled={loading}
                onClick={markAsShown}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Mark as Reviewed"}
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                REVIEWED
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              {/* Job Image Header */}
              <div className="relative h-48 bg-slate-100">
                {applicationDetails?.careers?.image ? (
                  <Image src={applicationDetails.careers.image} alt="Job" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Briefcase className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent flex items-end p-5">
                  <span className="text-white/90 text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded">
                    {applicationDetails.careers?.position_en ?? "Position"}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {/* CV Download Section */}
                <div className="mb-8">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Documents</h3>
                  {applicationDetails.cv ? (
                    <a 
                      href={applicationDetails.cv} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg group"
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Download Resume (CV)
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-medium justify-center cursor-not-allowed">
                      <FileText className="w-5 h-5" />
                      No CV Uploaded
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact</h3>
                  <ContactAction 
                    icon={<Mail className="w-4 h-4" />} 
                    value={email} 
                    label="Email" 
                    onCopy={() => copyToClipboard(email, "Email")}
                  />
                  <ContactAction 
                    icon={<Phone className="w-4 h-4" />} 
                    value={phone} 
                    label="Phone" 
                    onCopy={() => copyToClipboard(phone, "Phone")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Information */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{fullName}</h1>
                  <p className="text-slate-500 text-lg mt-1">Applying for {applicationDetails.careers?.position_en || "this role"}</p>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</p>
                   <p className={`text-sm font-bold ${applicationDetails.is_shown ? 'text-emerald-600' : 'text-blue-600'}`}>
                    {applicationDetails.is_shown ? '• Application Reviewed' : '• New Application'}
                   </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <InfoBlock 
                  icon={<Calendar className="w-5 h-5 text-indigo-500" />} 
                  label="Date Submitted" 
                  value={applicationDetails.applied_at ? new Date(applicationDetails.applied_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }) : "N/A"} 
                />
                <InfoBlock 
                  icon={<Hash className="w-5 h-5 text-amber-500" />} 
                  label="Application ID" 
                  value={applicationDetails.id?.substring(0, 12).toUpperCase() ?? "N/A"} 
                />
                <InfoBlock 
                  icon={<Mail className="w-5 h-5 text-blue-500 " />} 
                  label="Registered Email" 
                  value={email} 
                />
                <InfoBlock 
                  icon={<Phone className="w-5 h-5 text-emerald-500" />} 
                  label="Contact Phone" 
                  value={phone || "Not provided"} 
                />
              </div>

              {/* CV Preview Placeholder / Info */}
              <div className="mt-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center text-center">
                <FileText className="w-12 h-12 text-slate-300 mb-4" />
                <h4 className="text-slate-900 font-bold mb-1">Detailed Resume Access</h4>
                <p className="text-slate-500 text-sm max-w-sm mb-6">
                  You can download the original PDF/DOCX file provided by the candidate to view their full work history and skills.
                </p>
                {applicationDetails.cv && (
                  <a 
                    href={applicationDetails.cv} 
                    target="_blank" 
                    className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-2"
                  >
                    Open CV in Browser →
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* Helper Components */

function ContactAction({ icon, value, label, onCopy }: { icon: React.ReactNode, value: string, label: string, onCopy: () => void }) {
  return (
    <div className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-indigo-600 shadow-sm transition-colors">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-700 truncate max-w-[140px]">{value || "---"}</span>
        </div>
      </div>
      {value && (
        <button onClick={onCopy} className="p-2 text-slate-300 hover:text-slate-600" title="Copy">
          <ClipboardCopy className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-slate-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xs xl:text-base font-bold text-slate-800 leading-tight">{value}</p>
      </div>
    </div>
  );
}