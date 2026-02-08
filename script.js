document.addEventListener("DOMContentLoaded", function () {

  // ===== Countdown =====
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
    const diff = weddingUTC - Date.now();

    if (diff <= 0) {
      dd.textContent = "00";
      hh.textContent = "00";
      mm.textContent = "00";
      ss.textContent = "00";
      if (note) note.textContent = "🎊 It’s wedding time!";
      return;
    }

    const total = Math.floor(diff / 1000);

    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    dd.textContent = pad(days);
    hh.textContent = pad(hours);
    mm.textContent = pad(minutes);
    ss.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);

});
