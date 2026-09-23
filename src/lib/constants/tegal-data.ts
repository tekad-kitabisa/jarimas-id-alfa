export const KOTA_TEGAL_DATA = [
  {
    kecamatan: "Tegal Barat",
    kelurahan: [
      "Pesurungan Kidul",
      "Debong Lor",
      "Kemandungan",
      "Pekauman",
      "Kraton",
      "Tegalsari",
      "Muarareja",
    ],
  },
  {
    kecamatan: "Tegal Timur",
    kelurahan: [
      "Kejambon",
      "Slerok",
      "Panggung",
      "Mangkukusuman",
      "Mintaragen",
    ],
  },
  {
    kecamatan: "Tegal Selatan",
    kelurahan: [
      "Kalinyamat Wetan",
      "Bandung",
      "Debong Kidul",
      "Tunon",
      "Keturen",
      "Debong Kulon",
      "Debong Tengah",
      "Randugunting",
    ],
  },
  {
    kecamatan: "Margadana",
    kelurahan: [
      "Kaligangsa",
      "Krandon",
      "Cabawan",
      "Kalinyamat Kulon",
      "Margadana",
      "Sumurpanggang",
      "Pesurungan Lor",
    ],
  },
] as const;

// Generate opsi RW dan RT dari '01' hingga '40'
export const RW_RT_OPTIONS = Array.from({ length: 40 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
