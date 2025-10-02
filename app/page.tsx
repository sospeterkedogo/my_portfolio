"use client";

import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-700 flex flex-col items-center justify-center px-4 py-12">
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <TypeAnimation
        sequence={[
          "HI, I'M PETER", 2000,
          'WEB DEVELOPER', 2000,
          'NEXT.JS SPECIALIST', 2000,
          'CLEAN CODE MANIAC', 2000,
          
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        className="text-3xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-lg"
      />
    </section>

      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-12">
  <h2 className="text-3xl font-bold mb-3 text-blue-400 uppercase tracking-wide">
    FEATURED PROJECTS
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {[1,2,3,4,5,6,7,8,9,10].map(num => (
      <a
        key={num}
        href="#"
        className="block bg-gray-900 overflow-hidden shadow-lg hover:scale-105 transition transform duration-300"
      >
        <div className="aspect-square w-full bg-gray-700"></div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">Project Title {num}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            Description of a really cool project you did goes here. Mention the tech stack and outcome.
          </p>
        </div>
      </a>
    ))}
  </div>
</section>


      {/* Skills & Tech Stack */}
      <section id="skills" className="w-full max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">SKILLS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded-sm p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-white">Backend Development</h3>
            <p className="text-white">
              Node.js, Express.js, JavaScript, TypeScript, Laravel, PHP, Python, Fast API
            </p>
          </div>
          <div className="border border-gray-300 rounded-sm p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-white">Frontend Development</h3>
            <p className="text-white">
              React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap
            </p>
          </div>
          <div className="border border-gray-300 rounded-sm p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-white">Desktop Application Development</h3>
            <p className="text-white">C#, WPF, WinForms</p>
          </div>
          <div className="border border-gray-300 rounded-sm p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-white">Mobile Application Development</h3>
            <p className="text-white">Android, Flutter</p>
          </div>
          <div className="border border-gray-300 rounded-sm p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-white">Database Development</h3>
            <p className="text-white">MySQL, SQL, PostgreSQL</p>
          </div>
          <div className="border border-gray-300 rounded-sm p-10 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-white">CMS Development</h3>
            <p className="text-white">WordPress, Joomla</p>
          </div>
        </div>
      </section>


      {/* Blog/Insights */}
      <section id="blog" className="w-full max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">LATEST BLOG POSTS</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[1,2].map(num => (
            <a key={num} href="#" className="block bg-gray-900 rounded-xl p-6 shadow-xl hover:scale-105 transition">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Blog Post Title {num}</h3>
                <span className="text-blue-300 text-xs">2025-0{num}-01</span>
              </div>
              <p className="text-gray-300">Short summary teaser/synopsis for your insightful technical blog post.</p>
              <span className="mt-2 text-blue-400 block font-semibold">Read more →</span>
            </a>
          ))}
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center px-6">
        <Image src="/random-profile.jpg" alt="Profile" width={200} height={200} className="rounded-full object-cover shadow-lg"/>
        <div>
          <h2 className="text-3xl font-bold mb-3 text-blue-400">ABOUT ME</h2>
          <p className="text-lg text-gray-200">
            Passionate about building stunning, functional websites. I focus on performance, accessibility, and creative solutions. Let's build something great together!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex flex-col items-center w-full bg-gradient-to-r from-blue-900 via-gray-900 to-blue-950 py-16 px-6 mt-16 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-blue-300">LET'S CONNECT</h2>
        <p className="text-xl text-white mb-8 text-center max-w-xl">Ready to discuss your idea or project? Reach out now!</p>
        <a href="mailto:email@example.com" className="px-8 py-4 bg-blue-400 text-gray-900 font-semibold rounded-xl shadow hover:bg-blue-300 transition">
          Email Me
        </a>
        <div className="flex gap-6 mt-8">
          <a href="#" className="text-2xl hover:text-blue-200 transition">🐱</a>
          <a href="#" className="text-2xl hover:text-blue-200 transition">💼</a>
          <a href="#" className="text-2xl hover:text-blue-200 transition">🐦</a>
        </div>
      </section>
      
    </main>
  );
}
