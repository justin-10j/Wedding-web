const RSVP_PHONE = "+91XXXXXXXXXX"; // change
const VENUE_NAME = "St. Mary's Kadheeshtha Orthodox Church, Thumpamon North, Kerala";
const RECEPTION_NAME = "Church Auditorium";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_NAME)}`;
document.getElementById("mapsLink").href = mapsUrl;

new QRCode(document.getElementById("qr"), { text: mapsUrl, width: 180, height: 180 });

document.getElementById("whatsAppBtn").href =
  `https://wa.me/${RSVP_PHONE.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi! I’d like to RSVP for the wedding of Jerin John & Ann Taniya Peirera."
  )}`;
document.getElementById("callBtn").href = `tel:${RSVP_PHONE}`;

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

// Countdown (11:30 IST = 06:00 UTC)
const weddingUTC = Date.UTC(2026, 4, 25, 6, 0, 0);
const dd = document.getElementById("dd");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");
const note = document.getElementById("countNote");

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const diff = weddingUTC - Date.now();
  if(diff <= 0){
    dd.textContent = hh.textContent = mm.textContent = ss.textContent = "00";
    note.textContent = "🎊 It’s wedding time! May God bless the couple.";
    return;
  }
  const t = Math.floor(diff / 1000);
  const days = Math.floor(t / 86400);
  const hours = Math.floor((t % 86400) / 3600);
  const mins = Math.floor((t % 3600) / 60);
  const secs = t % 60;

  dd.textContent = pad(days);
  hh.textContent = pad(hours);
  mm.textContent = pad(mins);
  ss.textContent = pad(secs);
  note.textContent = "⛪ Ceremony begins at 11:30 AM IST";
}
tick();
setInterval(tick, 1000);
