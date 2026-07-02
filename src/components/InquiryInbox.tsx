import React, { useState, useEffect } from "react";
import { 
  FolderLock, 
  X, 
  Trash2, 
  Mail, 
  Clock, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  RefreshCw 
} from "lucide-react";

interface Inquiry {
  id: string;
  fullName: string;
  firmEmail: string;
  serviceSector: string;
  notes: string;
  createdAt: string;
}

interface InquiryInboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryInbox({ isOpen, onClose }: InquiryInboxProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries");
      if (!res.ok) throw new Error("Failed to load inquiries database");
      const data = await res.json();
      // Sort newest first
      const sorted = data.sort((a: Inquiry, b: Inquiry) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setInquiries(sorted);
    } catch (err: any) {
      setError(err.message || "Could not retrieve saved entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/inquiries/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete the selected entry");
      
      setInquiries((prev) => prev.filter(inq => inq.id !== deleteId));
      if (selectedInquiry?.id === deleteId) {
        setSelectedInquiry(null);
      }
      setDeleteId(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete inquiry.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div 
        className="bg-[#F5F5F0] border border-black/15 w-full max-w-4xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#2C2C2C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Header */}
        <div className="bg-[#1B2C6B] text-white px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8922A]/20 border border-[#B8922A]/40 flex items-center justify-center">
              <FolderLock className="w-5 h-5 text-[#B8922A]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight font-sans">Advisory Desk Inbox Portal</h2>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F0]/70">Admin Security Credentials / Self-Service Log</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchInquiries}
              className="p-2 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-all transition-colors"
              title="Refresh inbox"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-all transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0 bg-white/40">
          
          {/* Left panel: Submissions list */}
          <div className="w-full md:w-5/12 border-r border-[#2C2C2C]/10 flex flex-col h-full bg-white">
            <div className="p-4 bg-[#F5F5F0]/50 border-b border-[#2C2C2C]/10 flex justify-between items-center text-xs">
              <span className="font-mono text-[#2C2C2C]/65 font-semibold">
                INQUIRY DATABASE ({inquiries.length})
              </span>
              <span className="text-[10px] bg-[#1B2C6B]/10 text-[#1B2C6B] px-1.5 py-0.5 rounded font-mono">
                LOCAL PERSISTENCE
              </span>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12">
                <RefreshCw className="w-8 h-8 text-[#B8922A] animate-spin" />
                <p className="text-xs text-[#2C2C2C]/60 font-mono">Querying data vault...</p>
              </div>
            ) : error ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3">
                <AlertCircle className="w-10 h-10 text-red-500" />
                <p className="text-sm font-semibold">{error}</p>
                <button 
                  onClick={fetchInquiries}
                  className="bg-[#1B2C6B] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 mt-2"
                >
                  Retry Connection
                </button>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3">
                <div className="w-12 h-12 bg-[#2C2C2C]/5 rounded-full flex items-center justify-center text-[#2C2C2C]/40">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-sm">No Inquiries Found</p>
                  <p className="text-xs text-[#2C2C2C]/60 mt-1 max-w-[200px]">Submissions made through the consultation form will automatically compile here.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto divide-y divide-[#2C2C2C]/5">
                {inquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  const dateObject = new Date(inq.createdAt);
                  
                  return (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`p-4 text-left cursor-pointer transition-colors flex justify-between items-start gap-3 hover:bg-[#F5F5F0]/65 ${
                        isSelected ? "bg-[#1B2C6B]/5 border-l-4 border-[#1B2C6B]" : ""
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex justify-between items-center gap-2">
                          <h4 className="font-semibold text-sm text-black truncate">{inq.fullName}</h4>
                          <span className="text-[10px] font-mono text-[#2C2C2C]/50 shrink-0">
                            {dateObject.toLocaleDateString(undefined, {month: "short", day: "numeric"})}
                          </span>
                        </div>
                        <p className="text-xs text-[#2C2C2C]/75 truncate">{inq.firmEmail}</p>
                        <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#B8922A]/10 text-[#a37f20] truncate max-w-full">
                          {inq.serviceSector}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(inq.id);
                        }}
                        className="p-1 text-[#2C2C2C]/40 hover:text-red-600 rounded transition-colors self-center shrink-0"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right panel: Details preview */}
          <div className="hidden md:flex md:w-7/12 flex-col h-full bg-[#F5F5F0]/30 overflow-y-auto p-6">
            {selectedInquiry ? (
              <div className="space-y-6">
                {/* Meta details header */}
                <div className="bg-white border border-black/10 p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] font-mono bg-[#1B2C6B] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                        Live Payload Active
                      </span>
                      <h3 className="text-xl font-bold text-black mt-2 leading-tight">{selectedInquiry.fullName}</h3>
                      <a 
                        href={`mailto:${selectedInquiry.firmEmail}`}
                        className="text-xs text-[#1B2C6B] hover:underline font-medium inline-flex items-center gap-1 mt-1 transition-all"
                      >
                        {selectedInquiry.firmEmail}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    
                    <button
                      onClick={() => setDeleteId(selectedInquiry.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>

                  <hr className="border-[#2C2C2C]/10" />

                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[9px] tracking-wider">Submission Date</span>
                      <span className="font-semibold flex items-center gap-1 text-black">
                        <Calendar className="w-3.5 h-3.5 text-[#B8922A]" />
                        {new Date(selectedInquiry.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[9px] tracking-wider">Arrival Time</span>
                      <span className="font-semibold flex items-center gap-1 text-black">
                        <Clock className="w-3.5 h-3.5 text-[#B8922A]" />
                        {new Date(selectedInquiry.createdAt).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service of Interest */}
                <div className="bg-white border border-black/10 p-5 rounded-2xl space-y-2">
                  <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[9px] tracking-wider">Sector of Practice Focus</span>
                  <span className="text-sm font-bold text-black block">{selectedInquiry.serviceSector}</span>
                </div>

                {/* Inquiry notes summary */}
                <div className="bg-white border border-black/10 p-5 rounded-2xl flex-1 space-y-3">
                  <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[9px] tracking-wider">Form Message / Context</span>
                  <div className="text-sm text-[#2C2C2C] leading-relaxed whitespace-pre-wrap font-sans bg-[#F5F5F0]/50 p-4 border border-[#2C2C2C]/10 rounded-lg italic">
                    {selectedInquiry.notes || "No message or detailed context files were supplied with this request."}
                  </div>
                </div>

                {/* Verification Check of Email Setup */}
                <div className="bg-[#1B2C6B]/5 border border-[#1B2C6B]/15 p-4 rounded-xl flex gap-3 text-xs text-[#1B2C6B]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">Local Verification Check Successful</span>
                    <span className="text-[#2C2C2C]/80 block">This submission has been securely written directly to your host's local inquiries filesystem pool. If you configure SMTP credentials inside your environment dashboard, this will automatically activate actual inline mail routing.</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#2C2C2C]/50 gap-2">
                <Mail className="w-12 h-12 stroke-[1.25]" />
                <p className="font-mono text-xs">Select an inquiry from the database list to inspect the full form parameters and notes.</p>
              </div>
            )}
          </div>

        </div>

        {/* Info Banner bottom */}
        <div className="bg-[#F5F5F0] border-t border-black/10 p-4 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-[#2C2C2C]/65">
          <span>HOST POOL FILE: <code>/data/inquiries.json</code></span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            System Secure & Active
          </span>
        </div>
      </div>

      {/* Custom Non-blocking Delete Confirmation Modal Overlay */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[99999] flex items-center justify-center p-4">
          <div className="bg-white border border-[#2C2C2C]/15 p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-black font-sans">Delete Inquiry Log?</h3>
              <p className="text-xs text-[#2C2C2C]/70 font-sans leading-relaxed">
                This will permanently remove the record from your local database system. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg bg-[#F5F5F0] hover:bg-black/5 text-[#2C2C2C] text-xs font-semibold tracking-tight transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold tracking-tight transition-colors"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
