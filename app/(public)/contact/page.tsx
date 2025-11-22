"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full mt-20 px-4 sm:px-8 md:px-16 lg:px-60 py-16  text-white bg-[#1c1c1c]">
      <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className=" mb-5">
        <h2 className="text-4xl font-bold tracking-wide mb-4 mt-10">
          ABOUT ME
        </h2>

        <p className="mb-4 text-md text-gray opacity-70">
          If you’ve looked through my work and something stood out to you, I’m always open to conversations. I enjoy hearing from people who build things, people who hire builders, and anyone who has thoughts to share about the kind of problems I work on.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          Whether it’s a potential project, feedback on my work, a technical question, or just a quick hello, feel free to reach out. I read every message and reply when I can.
        </p>

        <p className="text-md text-gray opacity-70">
          Use the form below or send me an email directly. Whatever works for you.
        </p>

      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-transparent  space-y-6"
      >
        <div className="grid gap-2 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-500 transition disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {/* Status messages */}
        {status === "success" && (
          <p className="text-green-400 mt-2 text-center">
            ✅ Message sent successfully! I’ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 mt-2 text-center">
            ❌ Something went wrong. Please try again later.
          </p>
        )}
      </form>

      {/* Extra content after form */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>
          Prefer direct contact? You can also reach me at{" "}
          <a
            href="mailto:kedogosospeter36@email.com"
            className="text-gray-600 hover:underline"
          >
            kedogosospeter36@email.com
          </a>
        </p>
      </div>
      </div>
    </section>
  );
}
