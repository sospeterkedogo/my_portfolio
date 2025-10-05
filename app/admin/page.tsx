// app/admin/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // ----------- Server-side auth check -----------
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // ----------- Fetch counts and activities -----------
  const [{ count: projectsCount }, { count: blogsCount }, { count: usersCount }, { data: activities }] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("blogs").select("id", { count: "exact" }),
    supabase.from("users").select("id", { count: "exact" }),
    supabase.from<any, Activity>("activity_log").select("*").order("timestamp" as keyof Activity, { ascending: false }).limit(50),
  ]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AdminTile title="Projects" count={projectsCount || 0} icon="📁" color="bg-blue-500" />
        <AdminTile title="Blogs" count={blogsCount || 0} icon="📝" color="bg-green-500" />
        <AdminTile title="Users" count={usersCount || 0} icon="👤" color="bg-purple-500" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 max-h-[400px] overflow-y-auto">
          {activities?.map((act) => (
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
      </div>
    </div>
  );
}
