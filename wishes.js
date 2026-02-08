import { db } from "./firebase.js";
import {
  addDoc, collection, serverTimestamp, query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const form = document.getElementById("wishForm");
const nameEl = document.getElementById("name");
const msgEl = document.getElementById("message");
const wall = document.getElementById("wall");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

const wishesCol = collection(db, "wishes");

function escapeHtml(s){
  return s.replace(/[&<>"']/g, (c) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}

function renderItem(d){
  const name = escapeHtml(d.name || "Guest");
  const message = escapeHtml(d.message || "");
  return `
    <div class="wishCard">
      <div class="wishHeader">
        <div class="wishNameWall">${name}</div>
      </div>
      <div class="wishMsgWall">${message}</div>
    </div>
  `;
}

// Live wall
const q = query(wishesCol, orderBy("createdAt", "desc"));
onSnapshot(q, (snap) => {
  const items = [];
  snap.forEach(doc => items.push(doc.data()));
  wall.innerHTML = items.map(renderItem).join("") || `<div class="muted">No wishes yet. Be the first 💛</div>`;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  statusEl.textContent = "Posting…";

  try {
    const name = nameEl.value.trim();
    const message = msgEl.value.trim();

    await addDoc(wishesCol, {
      name,
      message,
      createdAt: serverTimestamp()
    });

    form.reset();
    statusEl.textContent = "✅ Posted!";
  } catch (err) {
    statusEl.textContent = `❌ ${err.message || "Failed"}`;
  } finally {
    submitBtn.disabled = false;
    setTimeout(() => (statusEl.textContent = ""), 4000);
  }
});
