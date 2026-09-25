export const weddingDetails = {
  bride: "Kavindi",
  groom: "Gamindu",
  dateDay: "19",
  dateMonth: "November",
  dateYear: "2026",
  brideParents: "Mr and Mrs. Gunasekara",
  groomParents: "Mr and Mrs. Jayarathne",
  ceremonyTime: "9:00 AM",
  poruweTime: "10:00 AM",
  gaminduPhone: "0719007944",
  kavindiPhone: "0713643929",
  whatsappPhone: "94713643929",
  venueUrl: "https://maps.app.goo.gl/pwq6y5F8GLBSRUoU9",
  coupleImage: "/images/couple2.png",
  venueImage: "/images/picture1.jpg",
} as const;

export type Locale = "en" | "si";

export const localizedPhone = (phone: string) => `+94 ${phone.slice(1, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
