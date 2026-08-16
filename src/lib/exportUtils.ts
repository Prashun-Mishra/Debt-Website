import type { Tables } from "@/integrations/supabase/types";

export type EnquiryRow = Tables<"enquiries">;

/**
 * Formats ISO timestamp string into UK date and time (e.g. 14 Aug 2026, 20:12:35 UTC)
 */
export function formatUKDateTime(isoString: string | null | undefined): string {
  if (!isoString) return "N/A";
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Generates and downloads a clean CSV file of customer enquiry records for audit purposes.
 */
export function exportEnquiriesToCSV(data: EnquiryRow[], fileNamePrefix = "UK_Debt_Enquiries_Audit"): void {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = [
    "Reference ID (UUID)",
    "Submission Date & Time (UTC)",
    "Full Name",
    "Phone Number",
    "Email Address",
    "Postcode",
    "Employment Status",
    "Approximate Debt Level",
    "GDPR Opt-In Consent",
    "IP Address",
  ];

  const rows = data.map((item) => [
    `"${item.id}"`,
    `"${item.created_at}"`,
    `"${(item.full_name || "").replace(/"/g, '""')}"`,
    `"${(item.phone || "").replace(/"/g, '""')}"`,
    `"${(item.email || "").replace(/"/g, '""')}"`,
    `"${(item.postcode || "").replace(/"/g, '""')}"`,
    `"${(item.employment || "").replace(/"/g, '""')}"`,
    `"${(item.debt_level || "").replace(/"/g, '""')}"`,
    `"${item.consent ? "YES (Explicit Consent Granted)" : "NO"}"`,
    `"${item.ip_address || "Not Captured"}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  const todayStr = new Date().toISOString().split("T")[0];

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${fileNamePrefix}_${todayStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
