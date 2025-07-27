"use client";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-8xl font-bold text-gray-500 mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-6">Oops! The page you’re looking for doesn't exist.</p>
            <a href="/">
                <span className="text-gray-500 underline hover:text-gray-800 transition">Go back home</span>
            </a>
        </div>
    );
}
