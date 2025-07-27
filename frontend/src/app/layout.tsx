import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    title: "PresenceCV",
    description:
        "Build a polished resume instantly from your Socials. Perfect for students, bootcamp grads, and self-taught devs with projects — but no work experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${poppins.variable} font-sans antialiased`}>
            <body> {children} </body>
        </html>
    );
}
