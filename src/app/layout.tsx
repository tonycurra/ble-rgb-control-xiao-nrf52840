import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "XIAO nRF52840 RGB BLE Controller",
  description: "Control your XIAO nRF52840 RGB LED via Bluetooth Low Energy",
  keywords: ["xiao", "nrf52840", "ble", "bluetooth", "rgb", "led", "arduino"],
  authors: [{ name: "XIAO RGB Controller" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
