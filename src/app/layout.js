
import "./globals.css";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LatestTicker from "../components/LatestTicker";
import { berita } from "../data/berita";

export const metadata = {
  title: "MAN 2 Kudus | Madrasah Akademik Berbasis Riset",
  description:
    "Profil, berita, prestasi, guru dan tenaga kependidikan, ekstrakurikuler, serta layanan digital MAN 2 Kudus.",

  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  const beritaTicker = berita
    .filter((item) => item.id !== "juara-msq-mtq-xxix")
    .slice(0, 5);

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#fffefa] text-stone-900 antialiased">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <LatestTicker items={beritaTicker} />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
