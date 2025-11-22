// hooks/useAdminData.ts
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Project, Blog, Activity, AdminData } from "@/lib/types";

// Define a specific return type that includes error and refetching capabilities
interface UseAdminDataReturn extends AdminData {
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAdminData(): UseAdminDataReturn {
  const [data, setData] = useState<AdminData>({
    projects: [],
    blogs: [],
    activities: [],
    loading: true,
  });
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setData((prev) => ({ ...prev, loading: true }));

      // Parallel execution is the only smart thing you did in the original code.
      // Keep it, but type the responses strictly.
      const [projectsRes, blogsRes, activitiesRes] = await Promise.all([
        supabase.from("projects").select("*").returns<Project[]>(),
        supabase.from("blogs").select("*").returns<Blog[]>(),
        supabase
          .from("activity_log")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(50)
          .returns<Activity[]>(),
      ]);

      if (projectsRes.error) throw new Error(projectsRes.error.message);
      if (blogsRes.error) throw new Error(blogsRes.error.message);
      if (activitiesRes.error) throw new Error(activitiesRes.error.message);

      setData({
        projects: projectsRes.data ?? [],
        blogs: blogsRes.data ?? [],
        activities: activitiesRes.data ?? [],
        loading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      setData((prev) => ({ ...prev, loading: false }));
    }
  }, [supabase]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, error, refresh: fetchData };
}