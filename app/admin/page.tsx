"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Activity = {
  id: string;
  message: string;
  timestamp: string;
};

type TileProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
  color?: string;
};

function AdminTile({ title, count, icon, color = "bg-blue-500" }: TileProps) {
  return (
    <div className={`p-6 rounded shadow text-white ${color} flex items-center gap-4`}>
      <div className="text-4xl">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold">{count}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();

  // ----------- Hooks MUST be at the top -----------
  const [loading, setLoading] = useState(true);
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [visibleCount, setVisibleCount] = useState(7);

  // ----------- Auth check -----------
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!loggedIn) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // ----------- Data fetching -----------
  useEffect(() => {
    if (!loading) {
      const fetchCounts = async () => {
        const { count: projCount } = await supabase
          .from("projects")
          .select("id", { count: "exact" });
        setProjectsCount(projCount || 0);

        const { count: blogCount } = await supabase
          .from("blogs")
          .select("id", { count: "exact" });
        setBlogsCount(blogCount || 0);

        const { count: userCount } = await supabase
          .from("users")
          .select("id", { count: "exact" });
        setUsersCount(userCount || 0);
      };

      const fetchActivities = async () => {
        const { data, error } = await supabase
          .from("activity_log")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(50);
        if (!error && data) setActivities(data);
      };

      fetchCounts();
      fetchActivities();
    }
  }, [loading]);

  if (loading)
    return <p className="text-white text-center mt-20">Checking authentication...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AdminTile title="Projects" count={projectsCount} icon="📁" color="bg-blue-500" />
        <AdminTile title="Blogs" count={blogsCount} icon="📝" color="bg-green-500" />
        <AdminTile title="Users" count={usersCount} icon="👤" color="bg-purple-500" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 max-h-[400px] overflow-y-auto">
          {activities.slice(0, visibleCount).map((act) => (
            <li
              key={act.id}
              className="flex justify-between text-gray-700 dark:text-gray-300"
            >
              <span>{act.message}</span>
              <span className="text-sm text-gray-500">
                {new Date(act.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        {visibleCount < activities.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 7)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
