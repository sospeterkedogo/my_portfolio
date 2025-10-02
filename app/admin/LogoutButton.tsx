// app/admin/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
