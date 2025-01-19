"use client";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const handleSignInClick = () => {
    window.location.href = "/auth";
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <title>Employee Ready Email Based Phishing Protection</title>
        <h1 className="text-4xl font-bold">Employee Ready Email Based Phishing Protection</h1>
      </header>
      <main className="text-center">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">How it Works</h2>
          <p className="mt-4 text-lg">
            Our solution provides comprehensive protection against email-based phishing attacks by analyzing incoming emails and identifying potential threats. Employees are trained to recognize phishing attempts and report suspicious emails.
          </p>
        </section>
        <button
          className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </main>
      <footer className="text-center">
        <p>Made for NWHacks 2025! 🚀</p>
      </footer>
    </div>
  );

}