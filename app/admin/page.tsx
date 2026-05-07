"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { Booking } from "@/components/admin/AdminDashboard";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return "Supabase took too long to respond. Check the deployed environment variables and database access policies.";
    }

    return error.message;
  }

  return "Unable to load the admin dashboard.";
}

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const init = async () => {
      try {
        setLoading(true);
        setError("");

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          router.replace("/admin/login");
          return;
        }

        if (!isActive) return;
        setAdminEmail(session.user.email ?? "");

        const { data, error: bookingsError } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (bookingsError) {
          throw bookingsError;
        }

        if (isActive) {
          setBookings(data ?? []);
        }
      } catch (err) {
        if (isActive) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      isActive = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111009] flex items-center justify-center">
        <p className="text-white/40 text-sm uppercase tracking-widest">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111009] flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-white/10 bg-white/5 rounded-2xl p-6 text-center">
          <p className="text-[#f03a2b] text-sm font-bold uppercase tracking-widest">
            Dashboard Error
          </p>
          <p className="mt-3 text-white/70 text-sm leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#f03a2b] text-white font-bold uppercase tracking-[0.15em] rounded-xl px-5 py-3 text-xs transition-all hover:bg-[#c52e1e]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard initialBookings={bookings} adminEmail={adminEmail} />;
}
