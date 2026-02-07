// ===============================
// ✅ EDIT THESE
// ===============================
const RSVP_PHONE = "+91XXXXXXXXXX"; // change to your number (include country code)
const VENUE_NAME = "St. Mary's Kadheeshtha Orthodox Church, Thumpamon North, Kerala";
const RECEPTION_NAME = "Church Auditorium";

// ===============================
// Maps + QR
// ===============================
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_NAME)}`;
document.getElementById("mapsLink").href = mapsUrl;

new QRCode(document.getElementById("qr"), {
  text: mapsUrl,
  width: 180,
  height: 180
});

// RSVP buttons
document.getElementById("whatsAppBtn").href =
  `https://wa.me/${RSVP_PHONE.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi! I’d like to RSVP for the wedding of Jerin John & Ann Taniya Peirera."
  )}`;
document.getElementById("callBtn").href = `tel:${RSVP_PHONE}`;

// ===============================
// Google Calendar (IST)
// Date: 25/05/2026 11:30 AM IST
// ===============================
const title = "Wedding | Jerin John & Ann Taniya Peirera";
const details = `Wedding Ceremony at ${VENUE_NAME}. Reception: ${RECEPTION_NAME}.`;
const location = `${VENUE_NAME} | Reception: ${RECEPTION_NAME}`;
const ctz = "Asia/Kolkata";
const start = "20260525T113000";
const end   = "20260525T140000";

const gcalUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(title)}` +
  `&details=${encodeURIComponent(details)}` +
  `&location=${encodeURIComponent(location)}` +
  `&dates=${start}/${end}` +
  `&ctz=${encodeURIComponent(ctz)}`;

document.getElementById("calendarBtn").href = gcalUrl;

// ===============================
// ✅ Countdown to 25 May 2026, 11:30 AM IST
// We calculate time left based on IST (UTC+5:30)
// ===============================
const dd = document.getElementById("dd");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const note = document.getElementById("countNote");

// Wedding datetime in IST: 2026-05-25 11:30:00 IST
// Convert IST to UTC by subtracting 5 hours 30 mins
const weddingUTC = Date.UTC(2026, 4, 25, 6, 0, 0); // May=4, 11:30 IST -> 06:00 UTC

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = Date.now();
  let diff = weddingUTC - now;

  if(diff <= 0){
    dd.textContent = "00";
    hh.textContent = "00";
    mm.textContent = "00";
    ss.textContent = "00";
    note.textContent = "🎊 It’s wedding time! May God bless the couple.";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  dd.textContent = pad(days);
  hh.textContent = pad(hours);
  mm.textContent = pad(minutes);
  ss.textContent = pad(seconds);

  note.textContent = "⛪ Ceremony begins at 11:30 AM IST";
}

tick();
setInterval(tick, 1000);
