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
    <section className="w-full px-4 sm:px-8 md:px-16 lg:px-60 py-16  text-white bg-[#1c1c1c]">
      {/* Header */}
      <div className=" mb-10">
        <h2 className="text-4xl font-bold tracking-wide mb-4 mt-10">
          ABOUT ME
        </h2>

        <p className="mb-4 text-md text-gray opacity-70">
          I’m deeply passionate about crafting websites that are not just visually striking, 
          but also intuitive, fast, and accessible to everyone. My approach blends creativity 
          with precision. I love turning complex ideas into elegant, functional designs that 
          solve real-world problems.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          Every project is an opportunity to explore new technologies, push creative boundaries, 
          and deliver experiences that leave a lasting impression. I focus on performance, 
          accessibility, and user-centered design because I believe that great websites do more 
          than look good, they make lives easier, communicate ideas clearly, and inspire action.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          Beyond the code and visuals, I thrive on collaboration. I enjoy working closely with 
          clients, understanding their vision, and transforming it into something tangible and impactful.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          Let’s create something extraordinary together, something that not only stands out but truly resonates.
        </p>

        <p className="text-md text-gray opacity-70">
          I'm always looking for new opportunities and collaborations. Whether you have a project in mind, or just want to say hello, feel free to reach out using the form below.
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
    </section>
  );
}
