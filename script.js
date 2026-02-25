document.addEventListener("DOMContentLoaded", () => {
  // ===== EDIT THESE =====
  const VENUE_NAME = "St. Mary's Kadheeshtha Orthodox Church, Thumpamon North, Kerala";
  const RECEPTION_NAME = "Church Auditorium";

  // If you still want to set WA/Call via JS, put your number here.
  // Otherwise keep WA/Call links directly in HTML and ignore this.
  const RSVP_PHONE = "+919747018106";

  // ===== MAPS + QR =====
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_NAME)}`;

  const mapsLink = document.getElementById("mapsLink");
  if (mapsLink) mapsLink.href = mapsUrl;

  const qrImg = document.getElementById("qrImg");
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mapsUrl)}`;
  }

  // ===== GOOGLE CALENDAR =====
  // Wedding: 25 May 2026, 11:30 AM IST
  const title = "Wedding | Jerin John & Ann Taniya Peirera";
  const details = `Wedding Ceremony at ${VENUE_NAME}. Reception: ${RECEPTION_NAME}.`;
  const location = `${VENUE_NAME}`;

  // Google Calendar format: YYYYMMDDTHHMMSS (no timezone if using ctz)
  const ctz = "Asia/Kolkata";
  const start = "20260525T113000";
  const end = "20260525T140000";

  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(location)}` +
    `&dates=${start}/${end}` +
    `&ctz=${encodeURIComponent(ctz)}`;

  // Button "Add to Google Calendar"
  const calendarBtn = document.getElementById("calendarBtn");
  if (calendarBtn) calendarBtn.href = gcalUrl;

  // OPTIONAL: make date/time pills clickable if you add these IDs in HTML:
  // <a class="pillLink" id="datePill" ...>📅 25 May 2026</a>
  // <a class="pillLink" id="timePill" ...>🕰️ 11:30 AM (IST)</a>
  const datePill = document.getElementById("datePill");
  if (datePill) datePill.href = gcalUrl;

  const timePill = document.getElementById("timePill");
  if (timePill) timePill.href = gcalUrl;

  // ===== WHATSAPP + CALL (optional) =====
  // If you already hardcoded WhatsApp + tel: links in HTML, you can remove this block.
  const whatsAppBtn = document.getElementById("whatsAppBtn");
  if (whatsAppBtn) {
    // No auto message (blank chat)
    whatsAppBtn.href = `https://wa.me/${RSVP_PHONE.replace(/[^\d]/g, "")}`;
  }

  const callBtn = document.getElementById("callBtn");
  if (callBtn) callBtn.href = `tel:${RSVP_PHONE}`;

  // ===== COUNTDOWN =====
  const dd = document.getElementById("dd");
  const hh = document.getElementById("hh");
  const mm = document.getElementById("mm");
  const ss = document.getElementById("ss");
  const note = document.getElementById("countNote");

  // 25 May 2026 11:30 IST = 06:00 UTC
  const weddingUTC = Date.UTC(2026, 4, 25, 6, 0, 0);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    if (!dd || !hh || !mm || !ss) return;

    const diff = weddingUTC - Date.now();

    if (diff <= 0) {
      dd.textContent = "00";
      hh.textContent = "00";
      mm.textContent = "00";
      ss.textContent = "00";
      if (note) note.textContent = "🎊 It’s wedding time! May God bless the couple.";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    dd.textContent = pad(days);
    hh.textContent = pad(hours);
    mm.textContent = pad(minutes);
    ss.textContent = pad(seconds);

    if (note) note.textContent = "⛪ Ceremony begins at 11:30 AM IST";
  }

  tick();
  setInterval(tick, 1000);
});
