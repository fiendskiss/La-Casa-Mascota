"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"

type Service = "overnight" | "three-days" | "one-week" | "one-month";
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface PetDetails {
  ownerName: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  breed: string;
  age: string;
  notes: string;
}

const SERVICES = [
  { id: "overnight" as Service, label: "Overnight Care", price: "₱800", desc: "Perfect for short stays." },
  { id: "three-days" as Service, label: "Three Days", price: "₱2,200", desc: "Short-term boarding package." },
  { id: "one-week" as Service, label: "One Week", price: "₱5,000", desc: "Best value for regular care." },
  { id: "one-month" as Service, label: "One Month", price: "₱24,000", desc: "Long-term discounted stay." },
];

const STEP_TITLES: Record<number, string> = {
  1: "CHOOSE A SERVICE\nYOU WOULD LIKE",
  2: "PICK YOUR\nDATES",
  3: "PICK YOUR\nTIME SLOT",
  4: "TELL US ABOUT\nYOUR PET",
  5: "OWNER\nINFORMATION",
  6: "REVIEW YOUR\nBOOKING",
  7: "BOOKING\nCONFIRMED",
};

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }

function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const fmt = (d: number) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isPast = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return date < t;
  };

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);

  return (
    <div className="cal-wrap">
      <div className="cal-header">
        <button onClick={prevMonth} className="cal-nav">‹</button>
        <span className="cal-title">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="cal-nav">›</button>
      </div>
      <div className="cal-grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} className="cal-dow">{d}</div>)}
        {Array(firstDay).fill(null).map((_, i) => <div key={`b${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map(d => (
          <button
            key={d}
            disabled={isPast(d)}
            onClick={() => onSelect(fmt(d))}
            className={`cal-day ${selected === fmt(d) ? "sel" : ""} ${isPast(d) ? "past" : ""}`}
          >
            {d}
          </button>
        ))}
      </div>
      <style jsx>{`
        .cal-wrap { width: 100%; max-width: 360px; margin: 0 auto; }
        .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
        .cal-title { font-family: var(--font-display); font-size: 0.9rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--red); }
        .cal-nav { background: none; border: 1px solid var(--red); border-radius: 50%; width: 32px; height: 32px; cursor: pointer; color: var(--red); font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .cal-nav:hover { background: var(--red); color: white; }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .cal-dow { text-align: center; font-family: var(--font-display); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--red-muted); padding-bottom: 8px; }
        .cal-day { aspect-ratio: 1; border: none; background: none; border-radius: 50%; font-size: 0.82rem; cursor: pointer; color: var(--text); transition: all 0.15s; }
        .cal-day:hover:not(:disabled) { background: var(--cream-dark); }
        .cal-day.sel { background: var(--red) !important; color: white !important; font-weight: 700; }
        .cal-day.past { color: var(--cream-dark); cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<Service | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [pet, setPet] = useState<PetDetails>({
    ownerName: "", email: "", phone: "",
    petName: "", petType: "", breed: "", age: "", notes: "",
  });

  const selectedService = SERVICES.find(s => s.id === service);

  const canProceed: Record<number, boolean> = {
    1: !!service,
    2: !!date,
    3: !!timeSlot,
    4: !!(pet.petName && pet.petType && pet.breed && pet.age),
    5: !!(pet.ownerName && pet.email && pet.phone),
    6: true,
    7: true,
  };

  const handlePetChange = (field: keyof PetDetails, value: string) =>
    setPet(p => ({ ...p, [field]: value }));

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-PH", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  };

  // Save booking request to Supabase.
  const sendBooking = async () => {
    try {
      setIsSending(true);

      const { error } = await supabase.from("bookings").insert([
        {
          // Owner
          owner_name: pet.ownerName,
          email: pet.email,
          phone: pet.phone,

          // Service
          service: selectedService?.label,
          service_price: selectedService?.price,

          // Schedule
          booking_date: date,
          time_slot: timeSlot,

          // Pet
          pet_name: pet.petName,
          pet_type: pet.petType,
          breed: pet.breed,
          age: pet.age,
          notes: pet.notes,

          // Admin defaults
          status: "pending",
          admin_notes: "",
        },
      ]);

      if (error) {
        console.error("Supabase error:", JSON.stringify(error, null, 2));
        alert("Failed to save booking. Please try again.");
        setIsSending(false);
        return;
      }

      setIsSending(false);
      setStep(7);
    } catch (err) {
      console.error("Unexpected error:", err);
      setIsSending(false);
    }
  };

  const titleLines = STEP_TITLES[step]?.split("\n") || [];

  return (
    <>
      <style jsx global>{`
        :root {
          --cream: #e9e7df;
          --cream-dark: #d9cfc5;
          --red: #f03a2b;
          --red-muted: #c07060;
          --text: #1a1210;
          --text-muted: #7a6a62;
          --font-display: var(--font-display, 'Oswald', 'Impact', sans-serif);
          --font-body: var(--font-body, 'Inter', sans-serif);
        }
        *, *::before, *::after { box-sizing: border-box; }
        .booking-root { min-height: 100vh; background: var(--cream); display: flex; flex-direction: column; }
        .top-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem; border-bottom: 1px solid var(--cream-dark); background: var(--cream); }
        .close-btn { background: none; border: none; cursor: pointer; color: var(--red); padding: 4px; transition: opacity 0.2s; }
        .close-btn:hover { opacity: 0.6; }
        .close-x { display: block; width: 26px; height: 26px; position: relative; }
        .close-x::before, .close-x::after { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 1.5px; background: var(--red); transform-origin: center; }
        .close-x::before { transform: translateY(-50%) rotate(45deg); }
        .close-x::after { transform: translateY(-50%) rotate(-45deg); }
        .booking-main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 1.25rem 7rem; min-height: 100vh; }
        .page-title { font-family: var(--font-display); font-size: clamp(2.5rem, 8vw, 6rem); color: var(--red); text-align: center; line-height: 0.95; letter-spacing: 0.01em; margin-bottom: clamp(1.5rem, 4vw, 3rem); animation: fadeUp 0.4s ease both; }
        .content-panel { width: 100%; max-width: 480px; animation: fadeUp 0.4s ease 0.05s both; }
        .pill-select-wrap { position: relative; width: 100%; }
        .pill-select-btn { width: 100%; border: 1.5px solid var(--red); border-radius: 50px; padding: 0.9rem 1.5rem; background: transparent; font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.1em; color: var(--red); cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: background 0.2s; }
        .pill-select-btn:hover { background: rgba(240,58,43,0.05); }
        .pill-select-btn .chevron { font-size: 1.1rem; transition: transform 0.2s; }
        .pill-select-btn.open .chevron { transform: rotate(180deg); }
        .pill-dropdown { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: var(--cream); border: 1.5px solid var(--red); border-radius: 20px; overflow: hidden; z-index: 50; animation: fadeDown 0.2s ease; }
        .pill-option { width: 100%; border: none; background: none; padding: 0.9rem 1.5rem; font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.08em; color: var(--text); cursor: pointer; text-align: left; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s; border-bottom: 1px solid var(--cream-dark); }
        .pill-option:last-child { border-bottom: none; }
        .pill-option:hover { background: rgba(240,58,43,0.07); }
        .pill-option.active { color: var(--red); background: rgba(240,58,43,0.07); }
        .pill-option-price { font-family: var(--font-body); font-size: 0.8rem; color: var(--text-muted); }
        .time-slots { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
        .time-slot-btn { width: 100%; border: 1.5px solid var(--red); border-radius: 50px; padding: 0.85rem 1.5rem; background: transparent; font-family: var(--font-display); font-size: 0.95rem; letter-spacing: 0.1em; color: var(--red); cursor: pointer; transition: all 0.2s; text-align: center; }
        .time-slot-btn:hover { background: rgba(240,58,43,0.07); }
        .time-slot-btn.sel { background: var(--red); color: white; }
        .selected-date-note { font-family: var(--font-body); font-size: 0.86rem; color: var(--text-muted); text-align: center; line-height: 1.6; }
        .selected-date-note strong { color: var(--text); }
        .section-head { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 0.18em; color: var(--red-muted); text-transform: uppercase; margin-bottom: 1rem; margin-top: 1.5rem; }
        .form-stack { display: flex; flex-direction: column; gap: 0.75rem; }
        .field-group { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-family: var(--font-display); font-size: 0.72rem; letter-spacing: 0.15em; color: var(--red-muted); text-transform: uppercase; }
        .field-input { border: 1.5px solid var(--cream-dark); border-radius: 14px; padding: 0.75rem 1rem; font-family: var(--font-body); font-size: 0.95rem; color: var(--text); background: transparent; outline: none; transition: border-color 0.2s; width: 100%; }
        .field-input:focus { border-color: var(--red); }
        .field-input::placeholder { color: var(--cream-dark); }
        textarea.field-input { resize: vertical; min-height: 80px; }
        .pet-type-row { display: flex; gap: 0.6rem; }
        .pet-type-btn { flex: 1; border: 1.5px solid var(--cream-dark); border-radius: 14px; padding: 0.7rem 0.5rem; background: none; font-family: var(--font-display); font-size: 0.85rem; letter-spacing: 0.06em; color: var(--text); cursor: pointer; transition: all 0.2s; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .pet-type-btn span:first-child { font-size: 1.2rem; }
        .pet-type-btn:hover { border-color: var(--red); }
        .pet-type-btn.sel { border-color: var(--red); background: rgba(240,58,43,0.08); color: var(--red); }
        .confirm-rows { display: flex; flex-direction: column; }
        .confirm-row { display: flex; justify-content: space-between; align-items: baseline; padding: 0.7rem 0; border-bottom: 1px solid var(--cream-dark); gap: 1rem; }
        .confirm-row:last-child { border-bottom: none; }
        .c-key { font-family: var(--font-display); font-size: 0.7rem; letter-spacing: 0.15em; color: var(--red-muted); text-transform: uppercase; white-space: nowrap; }
        .c-val { font-family: var(--font-body); font-size: 0.88rem; color: var(--text); text-align: right; }
        .price-display { font-family: var(--font-display); font-size: clamp(2rem, 7vw, 3.5rem); color: var(--red); text-align: center; margin: 1.5rem 0 0.4rem; letter-spacing: 0.05em; }
        .price-note { text-align: center; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-display); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; }
        .success-wrap { text-align: center; animation: fadeUp 0.4s ease; }
        .success-detail { font-family: var(--font-body); font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; margin-top: 1rem; }
        .email-note { margin-top: 1.2rem; padding: 1rem 1.25rem; background: rgba(240,58,43,0.07); border-radius: 12px; font-family: var(--font-body); font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; }
        .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; padding: 0.5rem 1.5rem 1.25rem; background: linear-gradient(to top, var(--cream) 70%, transparent); z-index: 100; }
        .step-counter { font-family: var(--font-display); font-size: 0.72rem; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 0.5rem; }
        .next-btn { border: none; border-radius: 50px; padding: 0.85rem 2rem; font-family: var(--font-display); font-size: 1rem; letter-spacing: 0.15em; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .next-btn.enabled { background: var(--red); color: white; }
        .next-btn.enabled:hover { background: #c52e1e; transform: translateY(-1px); }
        .next-btn.disabled { background: var(--cream-dark); color: var(--red-muted); cursor: not-allowed; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: 0.6; }
        .back-btn { background: none; border: none; font-family: var(--font-display); font-size: 0.78rem; letter-spacing: 0.15em; color: var(--text-muted); cursor: pointer; text-transform: uppercase; margin-top: 0.4rem; transition: color 0.2s; }
        .back-btn:hover { color: var(--red); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="booking-root">
        {/* Top bar */}
        <div className="top-bar">
          <button className="close-btn" onClick={() => router.push("/")} aria-label="Close">
            <span className="close-x" />
          </button>
        </div>

        <main className="booking-main">
          <h1 className="page-title" key={step}>
            {titleLines.map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
          </h1>

          {/* Step 1 */}
          {step === 1 && (
            <div className="content-panel">
              <div className="pill-select-wrap">
                <button className={`pill-select-btn ${serviceOpen ? "open" : ""}`} onClick={() => setServiceOpen(o => !o)}>
                  <span>{selectedService ? selectedService.label.toUpperCase() : "SELECT OPTION"}</span>
                  <span className="chevron">:</span>
                </button>
                {serviceOpen && (
                  <div className="pill-dropdown">
                    {SERVICES.map(s => (
                      <button key={s.id} className={`pill-option ${service === s.id ? "active" : ""}`} onClick={() => { setService(s.id); setServiceOpen(false); }}>
                        <span>{s.label.toUpperCase()}</span>
                        <span className="pill-option-price">{s.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="content-panel">
              <MiniCalendar selected={date} onSelect={d => { setDate(d); setTimeSlot(""); }} />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="content-panel">
              <p className="selected-date-note">
                Selected date<br />
                <strong>{formatDate(date)}</strong>
              </p>
              <div className="section-head">Time Slot</div>
              <div className="time-slots">
                {(service === "overnight" ? ["Flexible Check-in"] : ["Flexible Check-in"]).map(ts => (
                  <button key={ts} className={`time-slot-btn ${timeSlot === ts ? "sel" : ""}`} onClick={() => setTimeSlot(ts)}>
                    {ts.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="content-panel">
              <div className="form-stack">
                <div className="field-group"><label className="field-label">Pet&apos;s Name *</label><input className="field-input" type="text" placeholder="e.g. Mochi" value={pet.petName} onChange={e => handlePetChange("petName", e.target.value)} /></div>
                <div className="field-group">
                  <label className="field-label">Pet Type *</label>
                  <div className="pet-type-row">
                    {[{ val: "dog", label: "Dog"}, { val: "cat", label: "Cat"}].map(pt => (
                      <button key={pt.val} className={`pet-type-btn ${pet.petType === pt.val ? "sel" : ""}`} onClick={() => handlePetChange("petType", pt.val)}>
                        <span>{pt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field-group"><label className="field-label">Breed *</label><input className="field-input" type="text" placeholder="e.g. Shih Tzu, Aspin" value={pet.breed} onChange={e => handlePetChange("breed", e.target.value)} /></div>
                <div className="field-group"><label className="field-label">Age *</label><input className="field-input" type="text" placeholder="e.g. 2 years old" value={pet.age} onChange={e => handlePetChange("age", e.target.value)} /></div>
                <div className="field-group"><label className="field-label">Special Notes</label><textarea className="field-input" placeholder="Allergies, medications, feeding schedule..." value={pet.notes} onChange={e => handlePetChange("notes", e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="content-panel">
              <div className="form-stack">
                <div className="field-group"><label className="field-label">Full Name *</label><input className="field-input" type="text" placeholder="e.g. Maria Santos" value={pet.ownerName} onChange={e => handlePetChange("ownerName", e.target.value)} /></div>
                <div className="field-group"><label className="field-label">Email Address *</label><input className="field-input" type="email" placeholder="maria@email.com" value={pet.email} onChange={e => handlePetChange("email", e.target.value)} /></div>
                <div className="field-group"><label className="field-label">Phone Number *</label><input className="field-input" type="tel" placeholder="+63 9XX XXX XXXX" value={pet.phone} onChange={e => handlePetChange("phone", e.target.value)} /></div>
              </div>
            </div>
          )}

          {/* Step 6 */}
          {step === 6 && (
            <div className="content-panel">
              <div className="confirm-rows">
                <div className="confirm-row"><span className="c-key">Service</span><span className="c-val">{selectedService?.label}</span></div>
                <div className="confirm-row"><span className="c-key">Date</span><span className="c-val">{formatDate(date)}</span></div>
                <div className="confirm-row"><span className="c-key">Time</span><span className="c-val">{timeSlot}</span></div>
                <div className="confirm-row"><span className="c-key">Owner</span><span className="c-val">{pet.ownerName}</span></div>
                <div className="confirm-row"><span className="c-key">Contact</span><span className="c-val">{pet.email}<br />{pet.phone}</span></div>
                <div className="confirm-row"><span className="c-key">Pet</span><span className="c-val">{pet.petName} · {pet.breed} · {pet.age}</span></div>
                {pet.notes && <div className="confirm-row"><span className="c-key">Notes</span><span className="c-val" style={{ fontStyle: "italic" }}>{pet.notes}</span></div>}
              </div>
              <div className="price-display">{selectedService?.price}</div>
              <div className="price-note">Payment collected upon arrival</div>
            </div>
          )}

          {/* Step 7 - confirmed, no reference number */}
          {step === 7 && (
            <div className="content-panel success-wrap">
              <p className="success-detail">
                Thank you, <strong>{pet.ownerName}</strong>!<br />
                Your booking for <strong>{pet.petName}</strong> has been submitted.<br /><br />
                We&apos;ll follow up at <strong>{pet.phone}</strong> to confirm your booking.
              </p>
              <div className="email-note">
                📧 Thank you for trusting us.
              </div>
            </div>
          )}
        </main>

        {/* Bottom bar */}
        <div className="bottom-bar">
          {step < 6 && (
            <>
              <span className="step-counter">{step} of 6</span>
              <button
                className={`next-btn ${canProceed[step] ? "enabled" : "disabled"}`}
                disabled={!canProceed[step]}
                onClick={() => { if (canProceed[step]) setStep(s => (s + 1) as Step); }}
              >
                NEXT <span className="dot" />
              </button>
              {step > 1 && <button className="back-btn" onClick={() => setStep(s => (s - 1) as Step)}>← Back</button>}
            </>
          )}
          {step === 6 && (
            <>
              <span className="step-counter">6 of 6</span>
              <button
                className={`next-btn ${isSending ? "disabled" : "enabled"}`}
                disabled={isSending}
                onClick={sendBooking}
              >
                {isSending ? "SAVING..." : "CONFIRM BOOKING"} <span className="dot" />
              </button>
              <button className="back-btn" onClick={() => setStep(5)}>← Back</button>
            </>
          )}
          {step === 7 && (
            <button
              className="next-btn enabled"
              onClick={() => {
                setStep(1); setService(null); setDate(""); setTimeSlot("");
                setPet({ ownerName: "", email: "", phone: "", petName: "", petType: "", breed: "", age: "", notes: "" });
              }}
            >
              BOOK AGAIN <span className="dot" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
