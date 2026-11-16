export const CONTACT_PERSON = 'Tiara';
export const CONTACT_PHONE_DISPLAY = '0812-9805-3891';
export const CONTACT_PHONE_E164 = '6281298053891';
export const CONTACT_TEL_HREF = `tel:+${CONTACT_PHONE_E164}`;
export const CONTACT_WHATSAPP_BASE = `https://wa.me/${CONTACT_PHONE_E164}`;

export function getContactWhatsAppHref(message = 'Halo Tiara, saya ingin bertanya mengenai program pelatihan di Pusattraining.') {
  return `${CONTACT_WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}
