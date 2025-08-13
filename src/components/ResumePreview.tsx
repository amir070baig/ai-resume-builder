"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ResumePreviewProps {
  content: string;
}

export default function ResumePreview({ content }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!content) return null;

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="mt-6">
      <button
        onClick={downloadPDF}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Download as PDF
      </button>

      <div
        ref={resumeRef}
        className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Resume</h2>
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}
