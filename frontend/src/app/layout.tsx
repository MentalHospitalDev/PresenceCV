import React from "react";
import type { Metadata, Viewport } from "next";
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
        "Build a polished resume instantly from your GitHub. Perfect for no experience students, new  grads, and self-taught devs.",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: dark)",
                url: "/images/icon.png",
            },
            {
                media: "(prefers-color-scheme: light)",
                url: "/images/icon.png",
            },
        ],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${poppins.variable} antialiased`}>
            <body> {children} </body>
        </html>
    );
}
