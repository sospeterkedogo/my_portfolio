"use client";

import { useState, useTransition } from "react";
import { sendContactMessage } from "@/lib/actions";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await sendContactMessage(formData);
      
      if (result?.error) {
        toast.error("Please check the form inputs.");
      } else {
        toast.success("Message received! I'll get back to you soon.");
        // Optional: Reset form manually if needed by selecting the form element
        (document.getElementById("contact-form") as HTMLFormElement).reset();
      }
    });
  };

  return (
    <section id="contact" className="w-full py-24 px-6 bg-[#111] text-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left: Context */}
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">
              Contact
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">
              Let's build something <span className="text-gray-500">meaningful.</span>
            </h3>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>
              If you’ve looked through my work and something stood out to you, I’m always open to conversations. 
              I enjoy hearing from people who build things and people who hire builders.
            </p>
            <p>
              Whether it’s a potential project, feedback on my work, or just a quick hello, 
              feel free to reach out. I read every message and reply when I can.
            </p>
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-1">Direct Email</p>
              <a href="mailto:kedogosospeter36@email.com" className="text-xl text-white hover:text-blue-400 transition-colors border-b border-blue-500/30 pb-1">
                kedogosospeter36@email.com
              </a>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-[#1c1c1c] p-8 rounded-sm border border-white/5">
          <form id="contact-form" action={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Name"
                />
              </div>
              <div className="space-y-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Message"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}