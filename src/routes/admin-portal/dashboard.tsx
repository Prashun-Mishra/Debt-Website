import { useState, useEffect, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ShieldCheck,
  LogOut,
  Search,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  CheckCircle2,
  Calendar,
  Filter,
  FileSpreadsheet,
  Users,
  Lock,
  Clock,
  PoundSterling,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { EnquiryRow } from "@/lib/exportUtils";
import { formatUKDateTime, exportEnquiriesToCSV } from "@/lib/exportUtils";
import { CustomerProofModal } from "@/components/admin/CustomerProofModal";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-portal/dashboard")({
  head: () => ({
    title: "Admin Dashboard | UK Customer Proof Vault",
    meta: [
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [debtFilter, setDebtFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1. Check Auth & Load Session
  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (mounted) navigate({ to: "/admin-portal/login" });
        return;
      }
      if (mounted) {
        setUserEmail(session.user.email ?? "Admin User");
        fetchData();
      }
    }

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate({ to: "/admin-portal/login" });
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // 2. Fetch Enquiries from Supabase Database
  const fetchData = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching enquiries:", error);
        toast.error("Failed to load customer records: " + error.message);
      } else {
        setEnquiries(data || []);
      }
    } catch (err) {
      console.error("Unexpected error loading data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 3. Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully.");
    navigate({ to: "/admin-portal/login" });
  };

  // 4. Handle Delete Record (for right to erasure / data cleanup)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer record? This action cannot be undone.")) {
      return;
    }
    setDeletingId(id);
    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) {
        toast.error("Failed to delete record: " + error.message);
      } else {
        toast.success("Record deleted successfully.");
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err: any) {
      toast.error("Error deleting record.");
    } finally {
      setDeletingId(null);
    }
  };

  // 5. Filtered Data Computation
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Search query filter (Name, Phone, Email, Postcode)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.full_name?.toLowerCase().includes(q);
        const matchesPhone = item.phone?.toLowerCase().includes(q);
        const matchesEmail = item.email?.toLowerCase().includes(q);
        const matchesPostcode = item.postcode?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesPostcode) {
          return false;
        }
      }

      // Debt level filter
      if (debtFilter !== "all" && item.debt_level !== debtFilter) {
        return false;
      }

      // Date quick filter
      if (dateFilter !== "all" && item.created_at) {
        const itemDate = new Date(item.created_at);
        const now = new Date();
        if (dateFilter === "today") {
          const isSameDay =
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear();
          if (!isSameDay) return false;
        } else if (dateFilter === "7days") {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (itemDate < sevenDaysAgo) return false;
        } else if (dateFilter === "30days") {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (itemDate < thirtyDaysAgo) return false;
        }
      }

      return true;
    });
  }, [enquiries, searchQuery, debtFilter, dateFilter]);

  // Unique debt levels for dropdown options
  const debtOptions = useMemo(() => {
    const set = new Set<string>();
    enquiries.forEach((item) => {
      if (item.debt_level) set.add(item.debt_level);
    });
    return Array.from(set);
  }, [enquiries]);

  // Metrics computation
  const metrics = useMemo(() => {
    const total = enquiries.length;
    const consents = enquiries.filter((e) => e.consent).length;
    const consentRate = total > 0 ? Math.round((consents / total) * 100) : 100;
    const latestDate = enquiries[0]?.created_at ? formatUKDateTime(enquiries[0].created_at) : "No submissions yet";

    return { total, consents, consentRate, latestDate };
  }, [enquiries]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-forest" />
          <p className="text-sm font-medium text-muted-foreground">Verifying security session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-forest font-display text-sm text-forest-foreground">
              S
            </div>
            <div>
              <h1 className="font-display text-lg text-foreground flex items-center gap-2">
                Square Up Any Debt <span className="hidden sm:inline-block text-[10px] font-sans font-medium text-forest uppercase tracking-wider border border-forest/20 bg-forest/5 px-2 py-0.5 rounded-full">Audit Vault</span>
              </h1>
              <p className="text-[11px] text-muted-foreground">UK Compliance & Legal Proof Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-hairline bg-cream px-3 py-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-forest" />
              <span>{userEmail}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Alert */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-forest/15 bg-forest/5 p-4 text-xs text-foreground">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-forest shrink-0" />
            <div>
              <strong className="text-forest font-semibold block sm:inline mr-1">UK Legal Compliance Vault:</strong>
              <span className="text-muted-foreground">All records are stored with full ISO timestamps, consent state, and IP audit metadata for FCA & UK GDPR audit compliance.</span>
            </div>
          </div>
          <button
            onClick={() => exportEnquiriesToCSV(filteredEnquiries)}
            className="inline-flex items-center gap-2 rounded-md bg-coral px-3.5 py-2 text-xs font-semibold text-coral-foreground transition-all hover:bg-coral-hover shrink-0 shadow-[var(--shadow-soft)]"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV Audit Report
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-xl border border-hairline bg-card p-5 shadow-[var(--shadow-soft)] card-lift">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Total Customer Enquiries</span>
              <Users className="h-4 w-4 text-forest" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-display text-foreground">{metrics.total}</span>
              <span className="text-xs text-muted-foreground">records</span>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 shadow-[var(--shadow-soft)] card-lift">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Verified GDPR Consents</span>
              <CheckCircle2 className="h-4 w-4 text-forest" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-display text-foreground">{metrics.consentRate}%</span>
              <span className="text-xs text-forest">({metrics.consents} opted-in)</span>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 shadow-[var(--shadow-soft)] card-lift">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Most Recent Submission</span>
              <Clock className="h-4 w-4 text-forest" />
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-foreground block truncate">{metrics.latestDate}</span>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-card p-5 shadow-[var(--shadow-soft)] card-lift">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-medium">Audit Compliance Status</span>
              <ShieldCheck className="h-4 w-4 text-forest" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-forest/5 px-2.5 py-1 text-xs font-medium text-forest">
                ACTIVE AUDIT READY
              </span>
            </div>
          </div>

        </div>

        {/* Filter Controls Bar */}
        <div className="rounded-xl border border-hairline bg-card p-4 space-y-4 shadow-[var(--shadow-soft)]">
          
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, Email, Phone, or UK Postcode..."
                className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-forest focus:ring-2 focus:ring-forest/15"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Debt Level Filter */}
              <div className="flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={debtFilter}
                  onChange={(e) => setDebtFilter(e.target.value)}
                  className="bg-transparent text-foreground outline-none text-xs"
                >
                  <option value="all">All Debt Levels</option>
                  {debtOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-transparent text-foreground outline-none text-xs"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-cream disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-forest" : ""}`} />
                Refresh
              </button>

            </div>

          </div>

          {/* Active Filter Indicators */}
          {(searchQuery || debtFilter !== "all" || dateFilter !== "all") && (
            <div className="flex items-center gap-2 pt-2 border-t border-hairline text-[11px] text-muted-foreground">
              <span>Showing {filteredEnquiries.length} of {enquiries.length} records</span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDebtFilter("all");
                  setDateFilter("all");
                }}
                className="text-forest underline underline-offset-2 hover:text-forest-dark ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>

        {/* Data Table Section */}
        <div className="overflow-hidden rounded-xl border border-hairline bg-card shadow-[var(--shadow-soft)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              <thead className="border-b border-hairline bg-cream text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="px-4 py-3.5">Submission Date (UTC)</th>
                  <th className="px-4 py-3.5">Full Name</th>
                  <th className="px-4 py-3.5">Contact Details</th>
                  <th className="px-4 py-3.5">Postcode</th>
                  <th className="px-4 py-3.5">Employment</th>
                  <th className="px-4 py-3.5">Debt Level</th>
                  <th className="px-4 py-3.5">Opt-In Consent</th>
                  <th className="px-4 py-3.5 text-right">Legal Proof & Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-hairline text-foreground">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-muted-foreground/50" />
                        <p>No customer records found matching your filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-cream/50">
                      
                      {/* Submission Date */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                        {formatUKDateTime(item.created_at)}
                      </td>

                      {/* Full Name */}
                      <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">
                        {item.full_name}
                      </td>

                      {/* Contact Details */}
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <p className="font-medium text-foreground">{item.phone}</p>
                          <p className="text-[11px] text-muted-foreground">{item.email}</p>
                        </div>
                      </td>

                      {/* Postcode */}
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono font-medium text-forest">
                        {item.postcode}
                      </td>

                      {/* Employment */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground">
                        {item.employment}
                      </td>

                      {/* Debt Level */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-md border border-coral/20 bg-coral/5 px-2 py-1 text-[11px] font-medium text-coral">
                          {item.debt_level}
                        </span>
                      </td>

                      {/* Consent */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {item.consent ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-forest/20 bg-forest/5 px-2.5 py-0.5 text-[10px] font-medium text-forest">
                            <CheckCircle2 className="h-3 w-3" /> VERIFIED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-destructive/20 bg-destructive/5 px-2.5 py-0.5 text-[10px] font-medium text-destructive">
                            NO CONSENT
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedEnquiry(item);
                              setIsModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 rounded-md border border-forest/30 bg-forest/5 px-2.5 py-1 text-[11px] font-semibold text-forest transition-colors hover:bg-forest/10"
                            title="View Official Legal Proof Certificate"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View Proof
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Delete Record"
                          >
                            {deletingId === item.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </main>

      {/* Customer Legal Proof & Audit Certificate Modal */}
      <CustomerProofModal
        enquiry={selectedEnquiry}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEnquiry(null);
        }}
      />

    </div>
  );
}
