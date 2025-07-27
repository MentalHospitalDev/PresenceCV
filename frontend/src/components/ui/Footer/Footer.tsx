import { Github } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-20">
            <div className="max-w-screen-xl mx-auto px-8">
                <div className="mt-10 py-8 border-t border-gray-800 items-center justify-between sm:flex">
                    <p className="text-gray-400 text-center font-neulisalt">© 2025 PresenceCV.</p>
                    <div className="flex items-center justify-center gap-x-6 text-gray-500 mt-6 sm:mt-0">
                        <Link
                            href="https://github.com/MentalHospitalDev/PresenceCV"
                            className="font-medium hover:text-mirage-500 duration-300 "
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-6 h-6 hover:text-gray-200 duration-150" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
