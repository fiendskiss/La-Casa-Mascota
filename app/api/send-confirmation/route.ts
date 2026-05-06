import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ownerName, email, phone,
      petName, petType, breed, age, notes,
      service, servicePrice, bookingDate, timeSlot,
    } = body;

    // ── Email to CUSTOMER ──
    await resend.emails.send({
      from: "La Casa Mascota <onboarding@resend.dev>",
      to: email,
      subject: `Booking Confirmed – ${petName} 🐾`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#e9e7df;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#e9e7df;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:20px;overflow:hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#f03a2b;padding:36px 40px;text-align:center;">
                      <h1 style="margin:0;color:#fff;font-size:2rem;font-weight:900;letter-spacing:-0.04em;text-transform:uppercase;line-height:1;">
                        La Casa<br/>Mascota
                      </h1>
                      <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;">
                        Booking Received
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 8px;font-size:1rem;color:#1a1210;">
                        Hi <strong>${ownerName}</strong> 👋
                      </p>
                      <p style="margin:0 0 28px;font-size:0.9rem;color:#7a6a62;line-height:1.6;">
                        We've received your booking request for <strong>${petName}</strong>. 
                        Our team will confirm your reservation shortly!
                      </p>

                      <!-- Booking Details Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f1;border-radius:14px;overflow:hidden;margin-bottom:24px;">
                        <tr><td style="padding:20px 24px;">
                          <p style="margin:0 0 16px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:#c07060;font-weight:600;">Booking Details</p>
                          
                          ${row("Service", service)}
                          ${row("Price", servicePrice)}
                          ${row("Date", new Date(bookingDate + "T00:00:00").toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
                          ${row("Time", timeSlot)}
                        </td></tr>
                      </table>

                      <!-- Pet Details Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f1;border-radius:14px;overflow:hidden;margin-bottom:28px;">
                        <tr><td style="padding:20px 24px;">
                          <p style="margin:0 0 16px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:#c07060;font-weight:600;">Pet Details</p>
                          
                          ${row("Pet Name", petName)}
                          ${row("Type", petType)}
                          ${row("Breed", breed)}
                          ${row("Age", age)}
                          ${notes ? row("Notes", notes) : ""}
                        </td></tr>
                      </table>

                      <p style="margin:0 0 6px;font-size:0.85rem;color:#1a1210;">
                        Questions? Reach us at:
                      </p>
                      <p style="margin:0;font-size:0.85rem;color:#f03a2b;font-weight:600;">
                        0939-232-7922 · LATIFAKH@GMAIL.COM
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f7f5f1;padding:20px 40px;text-align:center;">
                      <p style="margin:0;font-size:0.75rem;color:#bfb8b1;">
                        © 2026 La Casa Mascota · Payment collected upon arrival
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── Email to ADMIN (you) ──
    await resend.emails.send({
      from: "La Casa Mascota Bookings <onboarding@resend.dev>",
      to: "LATIFAKH@GMAIL.COM",
      subject: `🐾 New Booking: ${petName} (${service})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">
          <h2 style="color:#f03a2b;margin:0 0 20px;">New Booking Received</h2>
          
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
            ${adminRow("Owner", ownerName)}
            ${adminRow("Email", email)}
            ${adminRow("Phone", phone)}
            ${adminRow("Service", `${service} — ${servicePrice}`)}
            ${adminRow("Date", bookingDate)}
            ${adminRow("Time", timeSlot)}
            ${adminRow("Pet Name", petName)}
            ${adminRow("Pet Type", petType)}
            ${adminRow("Breed", breed)}
            ${adminRow("Age", age)}
            ${notes ? adminRow("Notes", notes) : ""}
          </table>

          <p style="margin-top:20px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin" 
               style="background:#f03a2b;color:white;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:bold;display:inline-block;">
              View in Dashboard →
            </a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

// Helper: customer email row
function row(label: string, value: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:#c07060;width:35%;vertical-align:top;padding-top:2px;">${label}</td>
        <td style="font-size:0.88rem;color:#1a1210;font-weight:500;">${value}</td>
      </tr>
    </table>
  `;
}

// Helper: admin email row
function adminRow(label: string, value: string) {
  return `
    <tr style="border-bottom:1px solid #eee;">
      <td style="font-weight:bold;color:#555;font-size:0.85rem;width:35%;">${label}</td>
      <td style="color:#1a1210;font-size:0.85rem;">${value}</td>
    </tr>
  `;
}