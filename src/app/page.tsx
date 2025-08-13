"use client";
import ResumePreview from "@/components/ResumePreview";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const res = await fetch("/api/generate-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();
  setResume(data.resume);

  setLoading(false);
};


  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">AI Resume Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            name="github"
            placeholder="GitHub URL"
            value={form.github}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={form.summary}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
          />
          <textarea
            name="skills"
            placeholder="Skills (comma-separated)"
            value={form.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
          />
          <textarea
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
          />
          <textarea
            name="education"
            placeholder="Education"
            value={form.education}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Generating" : "Generate Resume"}
          </button>
        </form>
      </div>
      <ResumePreview content={resume}/>
    </main>
  );
}
