// components/ActivityList.tsx
import { Activity } from "@/lib/types";

export default function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-[#272727] p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2 max-h-100 overflow-y-auto">
        {activities?.map((act) => (
          <li key={act.id} className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>{act.message}</span>
            <span className="text-sm text-gray-500">{new Date(act.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
