// components/AdminTile.tsx
import Link from "next/link";
import { ReactNode } from "react";

export type TileProps = {
  title: string;
  count: number;
  icon: ReactNode;
  color?: string;
  href?: string;
};

export default function AdminTile({ title, count, icon, color = "bg-blue-500", href }: TileProps) {
  const content = (
    <div className={`p-6 rounded shadow text-white ${color} flex items-center gap-4`}>
      <div className="text-4xl">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold">{count}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
