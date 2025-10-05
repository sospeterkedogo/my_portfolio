import fs from "fs";
import path from "path";
import { createClient } from "@/lib/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient();

interface ProjectImage {
    url: string;
}

interface ProjectFromDB {
    id: number;
    title: string;
    description: string;
    project_images?: ProjectImage[];
}

interface ProjectFormatted {
    id: number;
    title: string;
    description: string;
    images: string[];
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Fetch all projects with their images
        const { data, error }: { data: ProjectFromDB[] | null; error: any } = await supabase
            .from("projects")
            .select("id, title, description, project_images(url)");

        if (error) throw error;

        // Format projects for TS file
        const projectsFormatted: ProjectFormatted[] = (data || []).map((p: ProjectFromDB) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            images: p.project_images?.map((img: ProjectImage) => img.url) || [],
        }));

        const fileContent = `export const projects = ${JSON.stringify(
            projectsFormatted,
            null,
            2
        )};\n`;

        const filePath = path.join(process.cwd(), "data/projects.ts");

        fs.writeFileSync(filePath, fileContent);

        return res.status(200).json({ message: "projects.ts updated successfully" });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
