import type { Metadata } from "next";
// Du kan behålla Geist om du vill använda den för kod eller specialfall, 
// annars kan du radera Geist-importerna helt.
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Konfigurera Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-montserrat', // Denna variabel används i globals.css
});

export const metadata: Metadata = {
  title: "Södra Fågelhundklubben",
  description: "En exklusiv jaktklubb med tradition och gemenskap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      {/* Här lägger vi till montserrat.variable */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}