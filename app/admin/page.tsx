"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }

      setAdminEmail(session.user.email ?? "");

      // Fetch bookings
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      setBookings(data ?? []);
      setLoading(false);
    };

    init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111009] flex items-center justify-center">
        <p className="text-white/40 text-sm uppercase tracking-widest">Loading...</p>
      </div>
    );
  }

  return <AdminDashboard initialBookings={bookings} adminEmail={adminEmail} />;
}