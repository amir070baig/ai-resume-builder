import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.json();
    const { name, email, phone, linkedin, github, summary, skills, experience, education } = form;

    // Create a fake but realistic resume in demo mode
    const resume = `
Demo Mode: AI has been replaced with a sample generator for this public version.

# ${name || "John Doe"}
📧 ${email || "john.doe@email.com"} | 📱 ${phone || "123-456-7890"}
${linkedin ? `🔗 LinkedIn: ${linkedin}` : ""}
${github ? `💻 GitHub: ${github}` : ""}

## Professional Summary
${summary || "Passionate software developer with a knack for solving complex problems and building efficient solutions."}

## Skills
${skills || "JavaScript, React, Node.js, Tailwind CSS"}

## Experience
${experience || "2"} years of experience in software development.
- Developed responsive web applications
- Collaborated with cross-functional teams
- Delivered high-quality solutions on time

## Education
${education || "B.S. in Computer Science - Your University"}
`;

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Error generating resume:", error);
    return NextResponse.json({ error: "Error generating resume" }, { status: 500 });
  }
}
