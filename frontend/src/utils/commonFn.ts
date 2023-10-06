function dateConverse(dateTime: string) {
  try {
    const tanggal = new Date(dateTime);
    const dd = String(tanggal.getDate()).padStart(2, "0");
    const mm = String(tanggal.getMonth() + 1).padStart(2, "0"); // Perhatikan bahwa bulan dimulai dari 0
    const yyyy = tanggal.getFullYear();
    const HH = String(tanggal.getHours()).padStart(2, "0");
    const mmTanggal = String(tanggal.getMinutes()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy} ${HH}:${mmTanggal}`;
  } catch (error) {
    return;
  }
}

export { dateConverse };
