// components/Loading.tsx
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1c1c] bg-opacity-95 backdrop-blur-sm animate-slide-in">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-cyan-400 border-b-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-semibold tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
