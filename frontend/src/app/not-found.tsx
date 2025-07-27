"use client";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-8xl font-bold text-gray-500 mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-6">Oops! The page you’re looking for doesn&#39;t exist.</p>
            <Link href="/">
                <span className="text-gray-200 underline hover:text-gray-500 transition">Go back home</span>
            </Link>
        </div>
    );
}
