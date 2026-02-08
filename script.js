document.addEventListener("DOMContentLoaded", () => {
  const VENUE_NAME = "St. Mary's Kadheeshtha Orthodox Church, Thumpamon North, Kerala";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_NAME)}`;

  // ✅ Fix Maps button (prevents # jump on mobile)
  const mapsLink = document.getElementById("mapsLink");
  if (mapsLink) mapsLink.href = mapsUrl;

  // ✅ QR image that works on all mobiles (no library)
  const qrImg = document.getElementById("qrImg");
  if (qrImg) {
    // Uses a public QR image generator
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mapsUrl)}`;
  }

  // ===== Countdown =====
  const dd = document.getElementById("dd");
  const hh = document.getElementById("hh");
  const mm = document.getElementById("mm");
  const ss = document.getElementById("ss");
  const note = document.getElementById("countNote");

  // 25 May 2026 11:30 IST = 06:00 UTC
  const weddingUTC = Date.UTC(2026, 4, 25, 6, 0, 0);

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = weddingUTC - Date.now();
    if (!dd || !hh || !mm || !ss) return;

    if (diff <= 0) {
      dd.textContent = hh.textContent = mm.textContent = ss.textContent = "00";
      if (note) note.textContent = "🎊 It’s wedding time! May God bless the couple.";
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
    if (note) note.textContent = "⛪ Ceremony begins at 11:30 AM IST";
  }

  tick();
  setInterval(tick, 1000);
});
