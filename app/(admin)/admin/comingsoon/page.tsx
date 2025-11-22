"use client";

import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <main className="mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">To do</h1>
      </div>

      

      <div className="flex flex-col items-center justify-center mt-20 gap-6">
        <p>Coming soon</p>
        <button className="text-blue-500 underline">
            <span onClick={() => router.push("/admin")}>Go Back</span>
        </button>
      </div>
    </main>
  );
}
