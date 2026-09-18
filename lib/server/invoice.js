// ─── Invoice id generation (server-side, unique across devices) ──
// Format: INV-YYYYMMDD-NNNNNN-XXXX  (matches the legacy client format)

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I lookalikes

function randAlnum(len) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export function generateInvoiceId(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `INV-${y}${m}${d}-${hh}${mm}${ss}-${randAlnum(4)}`;
}

export const INVOICE_ID_RE = /^INV-\d{8}-\d{6}-[A-Z0-9]{4}$/;

export function isValidInvoiceId(id) {
  return typeof id === 'string' && INVOICE_ID_RE.test(id);
}
