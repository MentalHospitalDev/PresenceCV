import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 p-4 z-30">
            <div
                className={`max-w-6xl mx-auto backdrop-blur-xl border-2 border-gray-800/80 rounded-[36px] transition-all duration-300 p-6 ${
                    isScrolled ? "w-[85%] md:w-[75%] scale-90" : "w-[95%] scale-100"
                }`}
            >
                <div className="flex items-center justify-between">
                    <div
                        className={`flex justify-center transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}
                    >
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="PresenceCV Logo"
                                width={168}
                                height={100}
                                className="pointer-events-none select-none"
                                priority
                            />
                        </Link>
                    </div>

                    <Link
                        href="https://github.com/MentalHospitalDev/PresenceCV"
                        className="font-medium hover:text-mirage-500 duration-300 "
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github />
                    </Link>
                </div>
            </div>
        </div>
    );
}
