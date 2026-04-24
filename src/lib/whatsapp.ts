export const ADMIN_WA = "6281234567890";
export const ADMIN_NAME = "Akademi Soft Skills Indonesia";

export const waLink = (message: string) =>
  `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;

export const waPurchaseMessage = (ebookTitle: string, buyerName?: string) =>
  `Halo admin ${ADMIN_NAME}, saya${buyerName ? ` (${buyerName})` : ""} sudah melakukan pembayaran ebook *${ebookTitle}*, berikut bukti transfer saya.`;

export const waInquiryMessage = (ebookTitle: string) =>
  `Halo admin ${ADMIN_NAME}, saya tertarik dengan ebook *${ebookTitle}*. Bisa info lebih lanjut?`;
