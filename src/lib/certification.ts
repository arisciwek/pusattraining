/**
 * Nama sertifikasi tanpa awalan "Sertifikasi", agar komponen dapat menambahkan
 * awalan sendiri tanpa menghasilkan teks ganda ("Sertifikasi SERTIFIKASI ...").
 */
export function certificationName(raw?: string): string {
  return (raw ?? '').replace(/^\s*sertifikasi\s+/i, '').trim();
}

/** Label siap tampil, mis. "Sertifikasi KEMNAKER RI". */
export function certificationLabel(raw?: string): string {
  const name = certificationName(raw);
  return name ? `Sertifikasi ${name}` : '';
}
