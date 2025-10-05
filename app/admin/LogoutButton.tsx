// app/admin/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // your client-side supabase

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    // Redirect to login page after successful logout
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
