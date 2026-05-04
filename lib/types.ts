export interface Activity{
  id: string;
  message: string;
  timestamp: string;
};

export interface AdminData {
  projects: Project[];
  blogs: Blog[];
  activities: Activity[];
  loading: boolean;
};

export interface Project {
  id: string;
  title: string;
  summary?: string;
  description: string;
  images?: string[];
  code_url?: string;
  demo_url?: string;
  /** Free-form tags for filtering, e.g. ["React", "TypeScript"] */
  tags?: string[];
  created_at?: string;
};

export interface Blog {
  id: string;
  title: string;
  content: string;
  cover_url?: string | null;
  created_at: string;
  /** Free-form tags for filtering, e.g. ["Tutorial", "React"] */
  tags?: string[];
};

export interface TileProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color?: string;
  href?: string;
};