"use client";

import { useState } from "react";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [codeUrl, setCodeUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("description", description);
      formData.append("code_url", codeUrl);
      formData.append("demo_url", demoUrl);
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server returned status ${res.status}`);
      }

      const newProject = await res.json();
      setSuccessMessage(`Project "${newProject.title}" added successfully!`);
      setTitle("");
      setSummary("");
      setDescription("");
      setCodeUrl("");
      setDemoUrl("");
      setImages([]);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>

      {successMessage && (
        <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mb-4 text-red-600 font-medium">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          required
        />
        <input
          type="text"
          placeholder="Project Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          rows={4}
          required
        />
        <input
          type="url"
          placeholder="Code URL (GitHub)"
          value={codeUrl}
          onChange={(e) => setCodeUrl(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />
        <input
          type="url"
          placeholder="Live Demo URL"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />

        <div>
          <label className="block mb-2 font-medium">Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full" />
          {images.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {images.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </main>
  );
}
