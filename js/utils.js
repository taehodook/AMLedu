// utils.js

export function showToast(msg, type = 'info', ms = 3200) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('fadeout'); setTimeout(() => t.remove(), 350); }, ms);
}

export function fmtDate(d) {
  if (!d) return '-';
  const dt = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dt)) return '-';
  return `${dt.getFullYear()}년 ${String(dt.getMonth()+1).padStart(2,'0')}월 ${String(dt.getDate()).padStart(2,'0')}일`;
}

export function fmtTime(sec) {
  if (!sec || isNaN(sec)) return '00:00';
  const m = Math.floor(sec/60), s = Math.floor(sec%60);
  return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

export function requireAuth() {
  const s = sessionStorage.getItem('kasg_user');
  if (!s) { window.location.href = 'index.html'; return null; }
  return JSON.parse(s);
}

export function requireAdmin() {
  const s = sessionStorage.getItem('kasg_admin');
  if (!s) { window.location.href = 'admin-login.html'; return null; }
  try { return JSON.parse(s); } catch(e) { window.location.href = 'admin-login.html'; return null; }
}

export function isSuper(session) {
  return session?.role === 'super';
}

export function hasPerm(session, perm) {
  if (isSuper(session)) return true;
  return (session?.permissions || []).includes(perm);
}

export function adminOrg(session) {
  if (isSuper(session)) return null;
  return session?.org || null;
}

export function safeId(name, org) {
  return (name + '__' + org).replace(/[.#$[\]/\s]/g, '_');
}

export function generateCertNo() {
  const now = new Date();
  const yy  = String(now.getFullYear()).slice(2);
  const mm  = String(now.getMonth()+1).padStart(2,'0');
  const seq = String(Math.floor(Math.random()*9000)+1000);
  return `${yy}${mm}-${seq}`;
}

export function toYoutubeEmbed(url) {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (short) return `https://www.youtube.com/embed/${short[1]}?rel=0&modestbranding=1`;
  const full  = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (full)  return `https://www.youtube.com/embed/${full[1]}?rel=0&modestbranding=1`;
  return null;
}
