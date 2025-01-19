"use client";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const handleSignInClick = () => {
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8">
          <Image
  src="/assets/logo (1) (1) 1.png"
  alt="GP Logo"
  width={32}
  height={32}
  className="object-contain"
/>

          </div>
          <span className="text-xl italic font-serif">gone phishing</span>
        </div>
        <button
          onClick={handleSignInClick}
          className="px-4 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
        >
          LOGIN
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative px-4">
        {/* Background wave pattern - you'll need to add your SVG here */}
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Add your wave pattern SVG here */}
        </div>

        <div className="z-10 text-center space-y-8 max-w-2xl">
          <h1 className="text-xl mb-8">
            Protect your company from spam phishing emails
          </h1>
          
          <button
            onClick={handleSignInClick}
            className="bg-blue-100 hover:bg-blue-200 px-8 py-3 rounded-md text-black font-medium transition-colors"
          >
            GO PHISH!
          </button>
        </div>
      </div>
    </div>
  );
}