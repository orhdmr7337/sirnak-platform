import { redirect } from "next/navigation";

// Eski /about adresi, veritabanından beslenen tek "Hakkımızda & Belgeler" sayfasına yönlenir.
export default function AboutPage() {
  redirect("/belgeler");
}
