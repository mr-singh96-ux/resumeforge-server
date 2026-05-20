import Resume from "../models/Resume.js";
import { model } from "../configs/ai.js";

// ==============================
// Enhance Professional Summary
// ==============================
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { userContent } = req.body;

    if (!userContent || userContent.trim() === "") {
      return res.status(400).json({ message: "Summary cannot be empty" });
    }

    const prompt = `
    You are an expert resume writer.

    Improve the following professional summary:
    - Make it concise (1-2 sentences)
    - Highlight key skills and strengths
    - Make it ATS-friendly
    - Return ONLY the improved summary

    Summary:
    ${userContent}
    `;

    const result = await model.generateContent(prompt);
    const enhancedContent = result.response.text();

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.log("AI ERROR:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// ==============================
// Enhance Job Description
// ==============================
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || userContent.trim() === "") {
      return res.status(400).json({ message: "Description cannot be empty" });
    }

    const prompt = `
    You are an expert resume writer.

    Improve the following job description:
    - Keep it 1-2 sentences
    - Use strong action verbs
    - Highlight achievements
    - Make it ATS-friendly
    - Return ONLY the improved text

    Description:
    ${userContent}
    `;

    const result = await model.generateContent(prompt);
    const enhancedContent = result.response.text();

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    console.log("AI ERROR:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// ==============================
// Upload Resume (AI Extraction)
// ==============================
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing resume text" });
    }

    const prompt = `
    Extract structured data from this resume and return ONLY valid JSON:

    Resume:
    ${resumeText}

    JSON Format:
    {
      "professional_summary": "",
      "skills": [],
      "personal_info": {
        "image": "",
        "full_name": "",
        "profession": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "website": ""
      },
      "experience": [
        {
          "company": "",
          "position": "",
          "start_date": "",
          "end_date": "",
          "description": "",
          "is_current": false
        }
      ],
      "project": [
        {
          "name": "",
          "type": "",
          "description": ""
        }
      ],
      "education": [
        {
          "institution": "",
          "degree": "",
          "field": "",
          "graduation_date": "",
          "gpa": ""
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 🛑 Clean possible markdown (Gemini sometimes adds ```json)
    const cleaned = text.replace(/```json|```/g, "").trim();

    const parsedData = JSON.parse(cleaned);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    res.json({ resumeId: newResume._id });

  } catch (error) {
    console.log("UPLOAD AI ERROR:", error.message);
    return res.status(400).json({ message: error.message });
  }
};