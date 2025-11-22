// app/admin/page.tsx
import { fetchAdminDashboardData } from "@/lib/admin/data"; // Import the function, not a hook
import AdminTile from "../components/AdminTile";
import ActivityList from "../components/ActivityList";

export default async function AdminDashboardPage() {
  // This runs on the server. No loading spinners. No flickering.
  const data = await fetchAdminDashboardData();

  const {
    projectsCount,
    blogsCount,
    messagesCount,
    testimonialsCount,
    skillsCount,
    certCount,
    activities,
  } = data;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-white">Portfolio Admin</h1>

      {/* Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AdminTile 
          title="Projects" 
          count={projectsCount} 
          icon="📁" 
          color="bg-blue-500" 
          href="/admin/projects" 
        />
        <AdminTile 
          title="Blogs" 
          count={blogsCount} 
          icon="📝" 
          color="bg-green-500" 
          href="/admin/blog" 
        />
        <AdminTile 
          title="Messages" 
          count={messagesCount} 
          icon="📨" 
          color="bg-purple-500" 
          href="/admin/comingsoon" 
        />
        <AdminTile 
          title="Testimonials" 
          count={testimonialsCount} 
          icon="💬" 
          color="bg-yellow-500" 
          href="/admin/comingsoon" 
        />
        <AdminTile 
          title="Skills" 
          count={skillsCount} 
          icon="🛠️" 
          color="bg-pink-500" 
          href="/admin/comingsoon" 
        />
        <AdminTile 
          title="Certificates" 
          count={certCount} 
          icon="🎓" 
          color="bg-red-500" 
          href="/admin/comingsoon" 
        />
      </div>

      {/* Activity List - This is likely a Client Component, which is fine */}
      <ActivityList activities={activities} />
    </div>
  );
}