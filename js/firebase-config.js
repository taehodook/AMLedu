// ════════════════════════════════════════════
// Firebase Configuration - KASG LMS
// ════════════════════════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, get, update, push, onValue, remove }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL, deleteObject }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  databaseURL: "https://aml-2-5e6d5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "aml-2-5e6d5",
  storageBucket: "aml-2-5e6d5.appspot.com",
  apiKey: "AIzaSyAjE52M5YvodrUONjnJx26njWDRb9CNQYI",
  authDomain: "aml-2-5e6d5.firebaseapp.com",
  messagingSenderId: "329904488876",
  appId: "1:329904488876:web:2485ebc3d83ac44cb7ba09"
};

const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
export const storage = getStorage(app);

// ── DB helpers ──────────────────────────────
export const DB = {
  async get(path) {
    const snap = await get(ref(db, path));
    return snap.exists() ? snap.val() : null;
  },
  async set(path, val) { return set(ref(db, path), val); },
  async update(path, val) { return update(ref(db, path), val); },
  async push(path, val) { return push(ref(db, path), val); },
  listen(path, cb) { onValue(ref(db, path), snap => cb(snap.exists() ? snap.val() : null)); },
  async remove(path) { return remove(ref(db, path)); }
};

// ── Storage helpers ─────────────────────────
export const ST = {
  uploadVideo(file, courseId, onProgress) {
    const storageRef = sRef(storage, `videos/${courseId}/${file.name}`);
    const task = uploadBytesResumable(storageRef, file);
    task.on('state_changed', snap => {
      onProgress && onProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100));
    });
    return task;
  },
  async getURL(path) { return getDownloadURL(sRef(storage, path)); },
  async delete(path) { return deleteObject(sRef(storage, path)); }
};

export { ref, onValue, push };
