import { db, storage } from "./firebase.js";
import {
  addDoc, collection, serverTimestamp, query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  ref, uploadBytesResumable, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const form = document.getElementById("wishForm");
const nameEl = document.getElementById("name");
const msgEl = document.getElementById("message");
const fileEl = document.getElementById("file");
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
  const mediaUrl = d.mediaUrl || "";
  const mediaType = d.mediaType || "";

  let mediaHtml = "";
  if (mediaUrl && mediaType.startsWith("image/")) {
    mediaHtml = `<img class="media" src="${mediaUrl}" alt="uploaded" loading="lazy" />`;
  } else if (mediaUrl && mediaType.startsWith("video/")) {
    mediaHtml = `
      <video class="media" controls playsinline preload="metadata">
        <source src="${mediaUrl}" type="${mediaType}">
      </video>`;
  }

  return `
    <div class="wishCard">
      <div class="wishHeader">
        <div class="wishNameWall">${name}</div>
      </div>
      <div class="wishMsgWall">${message}</div>
      ${mediaHtml}
    </div>
  `;
}

// Live wall (newest first)
const q = query(wishesCol, orderBy("createdAt", "desc"));
onSnapshot(q, (snap) => {
  const items = [];
  snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
  wall.innerHTML = items.map(renderItem).join("") || `<div class="muted">No wishes yet. Be the first 💛</div>`;
});

// Upload helper
function uploadFile(file){
  return new Promise((resolve, reject) => {
    const safeName = `${Date.now()}_${file.name}`.replace(/\s+/g, "_");
    const storageRef = ref(storage, `wishes/${safeName}`);
    const task = uploadBytesResumable(storageRef, file);

    task.on("state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        statusEl.textContent = `Uploading… ${pct}%`;
      },
      (err) => reject(err),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  statusEl.textContent = "Posting…";

  try {
    const name = nameEl.value.trim();
    const message = msgEl.value.trim();
    const file = fileEl.files?.[0];

    let mediaUrl = "";
    let mediaType = "";

    if (file) {
      const maxMB = 20;
      if (file.size > maxMB * 1024 * 1024) {
        throw new Error(`File too large. Max ${maxMB}MB.`);
      }
      mediaType = file.type || "";
      mediaUrl = await uploadFile(file);
    }

    await addDoc(wishesCol, {
      name,
      message,
      mediaUrl,
      mediaType,
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
