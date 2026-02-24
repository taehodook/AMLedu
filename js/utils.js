// ════════════════════════════════════════════
// Shared Utilities
// ════════════════════════════════════════════

export function showToast(msg, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fadeout');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

export function fmtTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

export function fmtDate(isoOrDate) {
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  return `${d.getFullYear()}년 ${String(d.getMonth()+1).padStart(2,'0')}월 ${String(d.getDate()).padStart(2,'0')}일`;
}

export function fmtDateTime(isoOrDate) {
  const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  return `${fmtDate(d)} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export function requireAuth() {
  const s = sessionStorage.getItem('kasg_user');
  if (!s) { window.location.href = 'index.html'; return null; }
  return JSON.parse(s);
}

export function requireAdmin() {
  const s = sessionStorage.getItem('kasg_admin');
  if (!s) { window.location.href = 'admin-login.html'; return null; }
  return JSON.parse(s);
}

export function generateCertNo() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth()+1).padStart(2,'0');
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `${yy}${mm}-${seq}`;
}

export function pct(value, total) {
  if (!total) return 0;
  return Math.round(value / total * 100);
}

export function confirm2(msg) {
  return window.confirm(msg);
}
