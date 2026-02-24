// ════════════════════════════════════════════
// firebase-config.js  —  KASG LMS
// ════════════════════════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase, ref, set, get, update, push, remove, onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ▼▼▼ Firebase Console → 프로젝트 설정 → 웹 앱에서 복사하세요 ▼▼▼
const firebaseConfig = {
  apiKey:            "AIzaSyAjE52M5YvodrUONjnJx26njWDRb9CNQYI",          // ← 교체 필수
  authDomain:        "aml-2-5e6d5.firebaseapp.com",
  databaseURL:       "https://aml-2-5e6d5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId:         "aml-2-5e6d5",
  storageBucket:     "aml-2-5e6d5.appspot.com",
  messagingSenderId: "329904488876",        // ← 교체 필수
  appId:             "1:329904488876:web:2485ebc3d83ac44cb7ba09"            // ← 교체 필수
};
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

export const DB = {
  async get(path) {
    const snap = await get(ref(db, path));
    return snap.exists() ? snap.val() : null;
  },
  async set(path, val) { return set(ref(db, path), val); },
  async update(path, val) { return update(ref(db, path), val); },
  async push(path, val) {
    const r = await push(ref(db, path), val);
    return r.key;
  },
  async remove(path) { return remove(ref(db, path)); },
  listen(path, cb) {
    onValue(ref(db, path), snap => cb(snap.exists() ? snap.val() : null));
    return () => {}; // detach placeholder
  }
};
