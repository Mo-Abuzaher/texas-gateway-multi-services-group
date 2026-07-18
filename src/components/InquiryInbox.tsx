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
  RefreshCw,
  Lock,
  Unlock,
  Download,
  Copy,
  Check,
  Settings,
  LogOut,
  Send
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
  // Authentication state
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Core data states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // SMTP tester states
  const [showSmtpTester, setShowSmtpTester] = useState(false);
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpTo, setSmtpTo] = useState("");
  const [smtpTesting, setSmtpTesting] = useState(false);
  const [smtpResult, setSmtpResult] = useState<{ success: boolean; message: string } | null>(null);

  // UX copy feedback state
  const [copied, setCopied] = useState(false);

  // Fetch inquiries from server
  const fetchInquiries = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        credentials: "same-origin",
      });
      if (res.status === 401) {
        handleLogout();
        throw new Error("Session expired. Please log in again.");
      }
      if (!res.ok) throw new Error("Failed to load inquiries database");
      const data = await res.json();
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

  // Run inquiries fetch when inbox is open and token exists
  useEffect(() => {
    if (isOpen && token) {
      fetchInquiries();
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (!isOpen || token) return;

    let cancelled = false;
    fetch("/api/admin/session", { credentials: "same-origin" })
      .then((res) => {
        if (!cancelled && res.ok) {
          setToken("authenticated");
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isOpen, token]);

  // Handle administrator login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Incorrect administrator password");
      
      setToken("authenticated");
      setPassword("");
    } catch (err: any) {
      setLoginError(err.message || "Authentication failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle administrator logout
  const handleLogout = () => {
    if (token) {
      fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      }).catch(err => console.warn("Failed to notify session logout", err));
    }
    setToken(null);
    setInquiries([]);
    setSelectedInquiry(null);
    setShowSmtpTester(false);
  };

  // Handle dynamic SMTP connectivity test
  const runSmtpTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSmtpTesting(true);
    setSmtpResult(null);
    try {
      const res = await fetch("/api/admin/test-smtp", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          pass: smtpPass,
          to: smtpTo
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "SMTP verification failed");
      setSmtpResult({ success: true, message: data.message });
    } catch (err: any) {
      setSmtpResult({ success: false, message: err.message || "Failed to establish SMTP session" });
    } finally {
      setSmtpTesting(false);
    }
  };

  // Export inquiry logs as CSV format download
  const exportToCsv = async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/inquiries/export?format=csv", {
        credentials: "same-origin",
      });
      if (res.status === 401) {
        handleLogout();
        throw new Error("Session expired.");
      }
      if (!res.ok) throw new Error("Could not compile CSV file");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `texas_gateway_leads_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || "CSV Export failed");
    }
  };

  // Confirm and execute record deletion
  const confirmDelete = async () => {
    if (!deleteId || !token) return;
    try {
      const res = await fetch(`/api/inquiries/${deleteId}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (res.status === 401) {
        handleLogout();
        throw new Error("Session expired. Please log in again.");
      }
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

  // Clipboard copy handler
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div 
        className="bg-[#F5F5F0] border border-black/15 w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#2C2C2C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Block */}
        <div className="bg-[#1B2C6B] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B8922A]/25 border border-[#B8922A]/40 flex items-center justify-center shadow-inner">
              <FolderLock className="w-5 h-5 text-[#B8922A]" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight font-sans">Texas Gateway Administrative Portal</h2>
              <p className="text-[9px] font-mono uppercase tracking-wider text-[#F5F5F0]/70">Admin Lead Management & Strategic Advisory Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 active:scale-[0.98] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-white/90 cursor-pointer"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Render LOGIN Screen if Unauthenticated */}
        {!token ? (
          <div className="flex-1 flex items-center justify-center bg-[#1B2C6B]/5 p-6 overflow-y-auto">
            <div className="w-full max-w-md bg-white border border-black/10 rounded-2xl shadow-xl p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#B8922A]/10 border border-[#B8922A]/30 flex items-center justify-center mx-auto text-[#B8922A]">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-black font-sans">Authorized Access Required</h3>
                <p className="text-xs text-[#2C2C2C]/60 max-w-[280px] mx-auto font-sans leading-relaxed">
                  Enter your administrator credentials to review, analyze, and manage consultation inquiries.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#2C2C2C]/65 block text-start">
                    Administrator Security Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F5F0]/50 border border-[#2C2C2C]/20 rounded-lg px-4 py-2.5 text-sm text-[#2C2C2C] placeholder-[#2C2C2C]/30 focus:outline-[#B8922A] font-sans"
                  />
                </div>

                {loginError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs px-3 py-2 rounded-lg flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-[#1B2C6B] hover:bg-[#1B2C6B]/90 active:scale-[0.99] text-[#F5F5F0] font-semibold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Verifying Token...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-[#B8922A]" />
                      Unlock Security Hub
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Render MAIN Panel if Authenticated */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 bg-white/40">
            
            {/* Left Column: Submissions and Tools Panel */}
            <div className="w-full md:w-5/12 border-r border-[#2C2C2C]/10 flex flex-col h-full bg-white shrink-0">
              
              {/* Inbox Stats & CSV Export Utility Row */}
              <div className="p-4 bg-[#F5F5F0]/50 border-b border-[#2C2C2C]/10 flex justify-between items-center text-xs gap-2 shrink-0">
                <span className="font-mono text-[#2C2C2C]/65 font-semibold">
                  LEAD LOGS ({inquiries.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportToCsv}
                    disabled={inquiries.length === 0}
                    className="bg-[#1B2C6B]/10 text-[#1B2C6B] hover:bg-[#1B2C6B]/20 active:scale-[0.97] px-2.5 py-1 rounded-md font-semibold text-[10px] flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Export database records to CSV"
                  >
                    <Download className="w-3 h-3" />
                    Export CSV
                  </button>
                  <button
                    onClick={() => setShowSmtpTester(!showSmtpTester)}
                    className={`px-2.5 py-1 rounded-md font-semibold text-[10px] flex items-center gap-1.5 transition-all cursor-pointer ${
                      showSmtpTester 
                        ? "bg-[#B8922A] text-white" 
                        : "bg-[#2C2C2C]/10 text-[#2C2C2C] hover:bg-[#2C2C2C]/15"
                    }`}
                    title="Toggle SMTP Diagnostic tool"
                  >
                    <Settings className="w-3 h-3" />
                    SMTP Test
                  </button>
                </div>
              </div>

              {/* Inquiry list display area / SMTP tester widget */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#2C2C2C]/5 relative">
                
                {/* SMTP Connection Diagnostic Form Panel */}
                {showSmtpTester && (
                  <div className="absolute inset-0 bg-[#F5F5F0] z-50 p-5 space-y-4 overflow-y-auto border-b border-[#2C2C2C]/10 animate-in slide-in-from-top duration-200">
                    <div className="flex justify-between items-center border-b border-[#2C2C2C]/15 pb-2">
                      <span className="font-sans font-bold text-xs text-[#1B2C6B] uppercase tracking-wider flex items-center gap-1.5">
                        <Settings className="w-4 h-4 text-[#B8922A]" />
                        SMTP Connection Diagnostics
                      </span>
                      <button 
                        onClick={() => {
                          setShowSmtpTester(false);
                          setSmtpResult(null);
                        }}
                        className="text-[#2C2C2C]/60 hover:text-black cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[10px] leading-relaxed text-[#2C2C2C]/70">
                      Configure individual credentials dynamically below to verify your SMTP server's active forwarding capabilities.
                    </p>

                    <form onSubmit={runSmtpTest} className="space-y-3">
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono uppercase text-[#2C2C2C]/65">SMTP Host</label>
                          <input
                            type="text"
                            required
                            placeholder="smtp.gmail.com"
                            value={smtpHost}
                            onChange={(e) => setSmtpHost(e.target.value)}
                            className="w-full bg-white border border-[#2C2C2C]/25 rounded-md px-2.5 py-1.5 text-xs focus:outline-[#B8922A]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono uppercase text-[#2C2C2C]/65">SMTP Port</label>
                          <input
                            type="text"
                            required
                            placeholder="587"
                            value={smtpPort}
                            onChange={(e) => setSmtpPort(e.target.value)}
                            className="w-full bg-white border border-[#2C2C2C]/25 rounded-md px-2.5 py-1.5 text-xs focus:outline-[#B8922A]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-[#2C2C2C]/65">Username (Email)</label>
                        <input
                          type="text"
                          required
                          placeholder="consulting@firm.com"
                          value={smtpUser}
                          onChange={(e) => setSmtpUser(e.target.value)}
                          className="w-full bg-white border border-[#2C2C2C]/25 rounded-md px-2.5 py-1.5 text-xs focus:outline-[#B8922A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-[#2C2C2C]/65">App Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••••••"
                          value={smtpPass}
                          onChange={(e) => setSmtpPass(e.target.value)}
                          className="w-full bg-white border border-[#2C2C2C]/25 rounded-md px-2.5 py-1.5 text-xs focus:outline-[#B8922A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-[#2C2C2C]/65">Send Test Email To</label>
                        <input
                          type="email"
                          required
                          placeholder="recipient@gmail.com"
                          value={smtpTo}
                          onChange={(e) => setSmtpTo(e.target.value)}
                          className="w-full bg-white border border-[#2C2C2C]/25 rounded-md px-2.5 py-1.5 text-xs focus:outline-[#B8922A]"
                        />
                      </div>

                      {smtpResult && (
                        <div className={`p-3 rounded-lg border text-xs leading-relaxed flex gap-2 ${
                          smtpResult.success 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                            : "bg-rose-50 border-rose-200 text-rose-800"
                        }`}>
                          {smtpResult.success ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                          )}
                          <span>{smtpResult.message}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={smtpTesting}
                        className="w-full bg-[#1B2C6B] hover:bg-[#1B2C6B]/95 text-[#F5F5F0] font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        {smtpTesting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Establishing Connection...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-[#B8922A]" />
                            Verify Connection
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
                    <RefreshCw className="w-8 h-8 text-[#B8922A] animate-spin" />
                    <p className="text-xs text-[#2C2C2C]/60 font-mono">Quering administrative database...</p>
                  </div>
                ) : error ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3 py-16">
                    <AlertCircle className="w-8 h-8 text-rose-500" />
                    <p className="text-xs font-semibold text-[#2C2C2C]/80">{error}</p>
                    <button 
                      onClick={fetchInquiries}
                      className="bg-[#1B2C6B] text-white text-[10px] px-3.5 py-1.5 rounded-md font-semibold hover:bg-opacity-95 mt-2 cursor-pointer"
                    >
                      Retry Connection
                    </button>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-3 py-16">
                    <div className="w-12 h-12 bg-[#2C2C2C]/5 rounded-full flex items-center justify-center text-[#2C2C2C]/40">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs">No Submissions Found</p>
                      <p className="text-[10px] text-[#2C2C2C]/55 mt-1 max-w-[180px] mx-auto leading-relaxed">
                        Form inquiries submitted on the frontend will compile live in this vault.
                      </p>
                    </div>
                  </div>
                ) : (
                  inquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    const dateObject = new Date(inq.createdAt);
                    
                    return (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq);
                        }}
                        className={`p-4 text-left cursor-pointer transition-colors flex justify-between items-start gap-3 hover:bg-[#F5F5F0]/65 ${
                          isSelected ? "bg-[#1B2C6B]/5 border-l-4 border-[#1B2C6B]" : ""
                        }`}
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex justify-between items-center gap-2">
                            <h4 className="font-semibold text-xs text-black truncate">{inq.fullName}</h4>
                            <span className="text-[9px] font-mono text-[#2C2C2C]/50 shrink-0">
                              {dateObject.toLocaleDateString(undefined, {month: "short", day: "numeric"})}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#2C2C2C]/70 truncate font-mono">{inq.firmEmail}</p>
                          <span className="inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-[#B8922A]/10 text-[#a37f20] truncate max-w-full font-bold">
                            {inq.serviceSector}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(inq.id);
                          }}
                          className="p-1 text-[#2C2C2C]/35 hover:text-rose-600 rounded transition-colors self-center shrink-0 cursor-pointer"
                          title="Permanently delete log record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Detailed parameters inspection and management */}
            <div className="flex-1 flex flex-col h-full bg-[#F5F5F0]/30 overflow-hidden">
              {selectedInquiry ? (
                <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-5">
                  
                  {/* Lead Information Card Header */}
                  <div className="bg-white border border-black/5 p-5 rounded-2xl space-y-4 shadow-sm shrink-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[8px] font-mono bg-[#1B2C6B] text-white px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                          Client Profile Active
                        </span>
                        <h3 className="text-base font-bold text-black mt-2 leading-tight">{selectedInquiry.fullName}</h3>
                        <a 
                          href={`mailto:${selectedInquiry.firmEmail}`}
                          className="text-xs text-[#1B2C6B] hover:underline font-medium inline-flex items-center gap-1 mt-1 font-mono"
                        >
                          {selectedInquiry.firmEmail}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <button
                        onClick={() => setDeleteId(selectedInquiry.id)}
                        className="bg-rose-500/10 hover:bg-rose-500/15 text-rose-600 text-[10px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all cursor-pointer border border-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Log
                      </button>
                    </div>

                    <hr className="border-[#2C2C2C]/10" />

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[9px] tracking-wider font-semibold">Submission Date</span>
                        <span className="font-semibold flex items-center gap-1.5 text-black">
                          <Calendar className="w-3.5 h-3.5 text-[#B8922A]" />
                          {new Date(selectedInquiry.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[9px] tracking-wider font-semibold">Time Received</span>
                        <span className="font-semibold flex items-center gap-1.5 text-black">
                          <Clock className="w-3.5 h-3.5 text-[#B8922A]" />
                          {new Date(selectedInquiry.createdAt).toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Focus Sector Tag */}
                  <div className="bg-white border border-black/5 p-4 rounded-xl space-y-1.5 shadow-sm shrink-0">
                    <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[8px] tracking-wider font-bold">Focus Sector Requested</span>
                    <span className="text-xs font-bold text-black block">{selectedInquiry.serviceSector}</span>
                  </div>

                  {/* Submitted User Notes */}
                  <div className="bg-white border border-black/5 p-5 rounded-2xl space-y-2.5 shadow-sm shrink-0">
                    <span className="text-[#2C2C2C]/50 block uppercase font-mono text-[8px] tracking-wider font-bold">Original Message Context</span>
                    <div className="text-xs text-[#2C2C2C] leading-relaxed whitespace-pre-wrap bg-[#F5F5F0]/50 p-4 border border-[#2C2C2C]/10 rounded-xl italic font-sans">
                      {selectedInquiry.notes || "No additional text/context files were supplied with this form."}
                    </div>
                  </div>

                </div>
              ) : (
                /* Unselected State Placeholder */
                <div className="h-full flex flex-col items-center justify-center p-6 text-center text-[#2C2C2C]/50 gap-2.5">
                  <Mail className="w-10 h-10 stroke-[1.25] text-[#2C2C2C]/40 animate-pulse" />
                  <div className="space-y-1">
                    <p className="font-semibold text-xs text-black font-sans">No Inquiry Selected</p>
                    <p className="text-[10px] max-w-[200px] leading-relaxed mx-auto">
                      Select an incoming profile from the registry log list on the left to inspect parameters and manage inquiries.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer info strip */}
        <div className="bg-[#F5F5F0] border-t border-black/10 p-3 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] font-mono text-[#2C2C2C]/65">
          <span>SECURE ENVIRONMENT VAULT: <code>persistent inquiry database</code></span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            256-Bit SSL Host Enclosure Active
          </span>
        </div>
      </div>

      {/* Confirm Deletion Confirmation Overlay */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[99999] flex items-center justify-center p-4">
          <div className="bg-white border border-[#2C2C2C]/15 p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-black font-sans">Delete Inquiry Log Record?</h3>
              <p className="text-xs text-[#2C2C2C]/65 font-sans leading-relaxed">
                This will permanently remove the lead profile parameters from your local file systems. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg bg-[#F5F5F0] hover:bg-black/5 text-[#2C2C2C] text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
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
