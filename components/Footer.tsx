import { FiMail } from "react-icons/fi";       // Email
import { FaGithub, FaLinkedin, FaCodepen } from "react-icons/fa"; // GitHub, LinkedIn, CodePen


export default function Footer() {
    return (
        <footer className="w-full bg-[#1c1c1c] text-gray-400 text-sm py-10 flex flex-col items-center">
            {/* Social Icons */}
            <div className="flex gap-6 mb-6">
              <a href="#" aria-label="Email" className="text-2xl hover:text-white transition-colors">
                <FiMail />
              </a>
              <a href="#" aria-label="Twitter" className="text-2xl hover:text-white transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Behance" className="text-2xl hover:text-white transition-colors">
                <FaCodepen />
              </a>
              <a href="#" aria-label="Instagram" className="text-2xl hover:text-white transition-colors">
                <FaGithub />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs tracking-wide">
              © {new Date().getFullYear()} – Sospeter Kedogo
            </p>
          </footer>
    );
}