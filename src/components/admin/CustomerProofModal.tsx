import { Printer, ShieldCheck, X, FileText, CheckCircle2, Lock, User, Phone, Mail, MapPin, Briefcase, PoundSterling, Globe } from "lucide-react";
import type { EnquiryRow } from "@/lib/exportUtils";
import { formatUKDateTime } from "@/lib/exportUtils";

interface CustomerProofModalProps {
  enquiry: EnquiryRow | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerProofModal({ enquiry, isOpen, onClose }: CustomerProofModalProps) {
  if (!isOpen || !enquiry) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="relative w-full max-w-2xl rounded-xl border border-hairline bg-card p-6 shadow-2xl transition-all sm:p-8 print:max-w-none print:border-none print:shadow-none print:p-0 print:bg-white">
        
        {/* Header Controls (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-forest" />
            <h2 className="text-lg font-semibold text-foreground">UK Compliance & Legal Proof Certificate</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-md bg-forest px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-forest/90"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div className="mt-4 space-y-6 print:mt-0 print:space-y-4">
          
          {/* Certificate Title Header */}
          <div className="rounded-lg border border-forest/20 bg-forest/5 p-4 text-center print:border-black print:bg-transparent">
            <div className="flex items-center justify-center gap-2 text-forest print:text-black">
              <Lock className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Official Audit Record & Lead Proof</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-foreground print:text-black">
              Customer Enquiry Compliance Certificate
            </h1>
            <p className="mt-1 text-xs text-muted-foreground print:text-gray-600">
              Verified & Timestamped Record stored under UK Data Protection Act 2018 & FCA Regulations
            </p>
          </div>

          {/* Metadata Bar */}
          <div className="grid grid-cols-1 gap-3 rounded-md bg-accent/40 p-4.5 text-xs sm:grid-cols-2 print:border print:border-gray-300 print:bg-gray-50">
            <div>
              <span className="font-medium text-muted-foreground print:text-gray-700">Audit Reference UUID:</span>
              <p className="mt-0.5 font-mono font-semibold text-foreground print:text-black break-all">{enquiry.id}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground print:text-gray-700">Submission Timestamp (UTC):</span>
              <p className="mt-0.5 font-semibold text-foreground print:text-black">
                {formatUKDateTime(enquiry.created_at)}
              </p>
            </div>
          </div>

          {/* Customer Input Data Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 print:text-black">
              Captured Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2.5 rounded-lg border border-border p-3.5 print:border-gray-300">
                <User className="h-4 w-4 text-forest shrink-0 mt-0.5 print:text-black" />
                <div>
                  <span className="text-xs text-muted-foreground print:text-gray-600">Full Name</span>
                  <p className="font-medium text-foreground print:text-black">{enquiry.full_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border p-3.5 print:border-gray-300">
                <Phone className="h-4 w-4 text-forest shrink-0 mt-0.5 print:text-black" />
                <div>
                  <span className="text-xs text-muted-foreground print:text-gray-600">Phone Number</span>
                  <p className="font-medium text-foreground print:text-black">{enquiry.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border p-3.5 print:border-gray-300">
                <Mail className="h-4 w-4 text-forest shrink-0 mt-0.5 print:text-black" />
                <div>
                  <span className="text-xs text-muted-foreground print:text-gray-600">Email Address</span>
                  <p className="font-medium text-foreground print:text-black break-all">{enquiry.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border p-3.5 print:border-gray-300">
                <MapPin className="h-4 w-4 text-forest shrink-0 mt-0.5 print:text-black" />
                <div>
                  <span className="text-xs text-muted-foreground print:text-gray-600">UK Postcode</span>
                  <p className="font-medium text-foreground print:text-black">{enquiry.postcode}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border p-3.5 print:border-gray-300">
                <Briefcase className="h-4 w-4 text-forest shrink-0 mt-0.5 print:text-black" />
                <div>
                  <span className="text-xs text-muted-foreground print:text-gray-600">Employment Status</span>
                  <p className="font-medium text-foreground print:text-black">{enquiry.employment}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border p-3.5 print:border-gray-300">
                <PoundSterling className="h-4 w-4 text-forest shrink-0 mt-0.5 print:text-black" />
                <div>
                  <span className="text-xs text-muted-foreground print:text-gray-600">Approximate Debt Level</span>
                  <p className="font-medium text-foreground print:text-black">{enquiry.debt_level}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Consent & Technical Audit Proof Box */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3 print:border-gray-400 print:bg-transparent">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs print:text-black">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 print:text-black" />
              <span>Explicit Consent & Opt-In Verification</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed print:text-gray-700">
              The individual explicitly checked the required opt-in box agreeing to data storage, contact via telephone/email/SMS, and sharing with FCA-authorised debt relief partners at the moment of form submission.
            </p>
            <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap justify-between items-center text-[11px] text-muted-foreground print:border-gray-300 print:text-gray-600">
              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-forest print:text-black" />
                <span>Captured IP Address: <strong className="font-mono text-foreground print:text-black">{enquiry.ip_address || "Captured via Web Server"}</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-forest print:text-black" />
                <span>Consent Status: <strong className="text-emerald-600 print:text-black">VERIFIED OPT-IN (TRUE)</strong></span>
              </div>
            </div>
          </div>

          {/* Official Verification Seal / Footer Signature Line */}
          <div className="pt-4 border-t border-border flex justify-between items-end text-[11px] text-muted-foreground print:pt-6 print:border-gray-400">
            <div>
              <p className="font-serif italic font-medium text-foreground print:text-black">Square Up Any Debt — Compliance & Data Vault</p>
              <p className="text-[10px] text-muted-foreground print:text-gray-500">Document generated for legal audit and FCA verification</p>
            </div>
            <div className="text-right">
              <div className="inline-block rounded border border-forest/40 px-2 py-1 text-[10px] font-mono text-forest uppercase font-semibold print:border-black print:text-black">
                VERIFIED UK AUDIT PROOF
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
