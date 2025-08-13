import {NextResponse} from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request){
  try{
    const {name, role, experience, skills} = await req.json();

    const prompt = `
      Create a professional, concise resume in bullet points for:
      Name: ${name}
      Role: ${role}
      Experience: ${experience}
      Skills: ${skills}
      keep it recruiter-friendly and ATS-optimized.
    `;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{role: "user", content: prompt}],
      temperature: 0.7,
    });

    const resume = completion.choices[0].message?.content || "";

    return NextResponse.json({resume});
  }catch(err){
    console.error(err);
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}