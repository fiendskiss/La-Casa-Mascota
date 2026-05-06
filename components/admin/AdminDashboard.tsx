"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Booking {
  id: string;
  created_at: string;
  owner_name: string;
  email: string;
  phone: string;
  service: string;
  service_price: string;
  booking_date: string;
  time_slot: string;
  pet_name: string;
  pet_type: string;
  breed: string;
  age: string;
  notes: string;
  status: BookingStatus;
  admin_notes: string;
}

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending:   "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
  confirmed: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
  cancelled: "bg-red-400/15 text-red-400 border-red-400/30",
  completed: "bg-blue-400/15 text-blue-400 border-blue-400/30",
};

const STATUS_OPTIONS: BookingStatus[] = ["pending", "confirmed", "cancelled", "completed"];

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${STATUS_COLORS[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function BookingModal({ booking, onClose, onUpdate, onDelete }: {
  booking: Booking;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Booking>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [adminNotes, setAdminNotes] = useState(booking.admin_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(booking.id, { status, admin_notes: adminNotes });
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleting(true);
    await onDelete(booking.id);
    setDeleting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1e1916] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-white">
              {booking.pet_name} · {booking.breed}
            </h2>
            <p className="text-xs text-white/40 mt-0.5">{booking.service} · {booking.booking_date}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Owner", booking.owner_name],
              ["Pet", `${booking.pet_name} (${booking.pet_type})`],
              ["Email", booking.email],
              ["Phone", booking.phone],
              ["Breed", booking.breed],
              ["Age", booking.age],
              ["Date", booking.booking_date],
              ["Time", booking.time_slot],
              ["Service", booking.service],
              ["Price", booking.service_price],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-[0.12em] text-white/30 mb-0.5">{label}</p>
                <p className="text-sm text-white font-medium truncate">{value}</p>
              </div>
            ))}
          </div>

          {booking.notes && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">Pet Notes</p>
              <p className="text-sm text-white/70 bg-white/5 rounded-xl p-3 leading-relaxed">{booking.notes}</p>
            </div>
          )}

          {/* Status */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
                    status === s ? STATUS_COLORS[s] : "border-white/10 text-white/30 hover:text-white/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Admin notes */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Admin Notes</label>
            <textarea
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              rows={3}
              placeholder="Internal notes..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#f03a2b] transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#f03a2b] text-white font-bold uppercase tracking-wider text-sm rounded-xl py-3 hover:bg-[#c52e1e] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`px-4 rounded-xl text-sm font-bold uppercase tracking-wider border transition-all ${
                confirmDelete
                  ? "bg-red-500 text-white border-red-500"
                  : "border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30"
              }`}
            >
              {deleting ? "..." : confirmDelete ? "Confirm?" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({
  initialBookings,
  adminEmail,
}: {
  initialBookings: Booking[];
  adminEmail: string;
}) {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [refreshing, setRefreshing] = useState(false);

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
  }), [bookings]);

  const filtered = useMemo(() => bookings.filter(b => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || [b.owner_name, b.pet_name, b.email, b.service].some(v => v?.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  }), [bookings, search, statusFilter]);

  const handleRefresh = async () => {
    setRefreshing(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (data) setBookings(data);
    setRefreshing(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleUpdate = async (id: string, updates: Partial<Booking>) => {
    await supabase.from("bookings").update(updates).eq("id", id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleDelete = async (id: string) => {
    await supabase.from("bookings").delete().eq("id", id);
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#111009] text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#1a1210] border-r border-white/10 flex-col z-40 hidden lg:flex">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-tighter text-[#f03a2b] leading-tight">
            La Casa<br />Mascota
          </h1>
          <p className="text-xs text-white/30 mt-1 uppercase tracking-wider">Admin</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { icon: "📊", label: "All Bookings", val: "all" as const },
            { icon: "⏳", label: "Pending", val: "pending" as const },
            { icon: "✅", label: "Confirmed", val: "confirmed" as const },
            { icon: "🏁", label: "Completed", val: "completed" as const },
            { icon: "🚫", label: "Cancelled", val: "cancelled" as const },
          ].map(item => (
            <button
              key={item.val}
              onClick={() => setStatusFilter(item.val)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                statusFilter === item.val
                  ? "bg-[#f03a2b]/10 text-[#f03a2b]"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.icon}</span>
              <span className="flex-1 font-medium">{item.label}</span>
              {item.val === "pending" && stats.pending > 0 && (
                <span className="bg-yellow-400/20 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-white/30 truncate mb-2">{adminEmail}</p>
          <button onClick={handleSignOut} className="text-xs text-white/40 hover:text-[#f03a2b] transition-colors uppercase tracking-wider">
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-60 min-h-screen flex flex-col">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#111009]/95 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">Dashboard</h2>
            <p className="text-xs text-white/30">La Casa Mascota Reservations</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSignOut} className="lg:hidden text-xs text-white/40 hover:text-[#f03a2b] uppercase tracking-wider transition-colors">
              Sign Out
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/30 transition-all disabled:opacity-40"
            >
              <span className={refreshing ? "animate-spin inline-block" : "inline-block"}>↻</span>
              Refresh
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total", value: stats.total, color: "text-white" },
              { label: "Pending", value: stats.pending, color: "text-yellow-400" },
              { label: "Confirmed", value: stats.confirmed, color: "text-emerald-400" },
              { label: "Completed", value: stats.completed, color: "text-blue-400" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">{s.label}</p>
                <p className={`text-3xl font-black tracking-tight ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by owner, pet, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#f03a2b] transition-colors"
            />
            <div className="flex gap-2 flex-wrap">
              {(["all", ...STATUS_OPTIONS] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    statusFilter === s
                      ? "bg-[#f03a2b] text-white"
                      : "bg-white/5 border border-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/10 text-xs uppercase tracking-[0.12em] text-white/30">
              <span>Owner / Pet</span>
              <span>Service</span>
              <span>Date</span>
              <span>Status</span>
              <span></span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-4xl mb-3">🐾</p>
                <p className="text-white/30 text-sm">No bookings found</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.06]">
                {filtered.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto_auto] gap-3 md:gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{b.owner_name}</p>
                      <p className="text-xs text-white/40">{b.pet_name} · {b.pet_type}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm text-white">{b.service}</p>
                      <p className="text-xs text-white/40">{b.service_price}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm text-white">{b.booking_date}</p>
                      <p className="text-xs text-white/40">{b.time_slot}</p>
                    </div>
                    <div className="self-center">
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="hidden md:flex self-center text-white/20 group-hover:text-white/60 transition-colors">→</div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="px-5 py-3 border-t border-white/10 text-xs text-white/25">
                Showing {filtered.length} of {bookings.length} bookings
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <BookingModal
          booking={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}