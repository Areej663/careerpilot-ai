import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How does CareerPilot AI calculate the Match Score?",
    answer:
      "CareerPilot AI utilizes Natural Language Processing (NLP) techniques to parse uploaded PDF resumes and job descriptions. It extracts technical skills, tools, and qualifications, then calculates a weighted compatibility score based on matched versus required skill sets."
  },
  {
    question: "Which file formats are supported for upload?",
    answer:
      "You can upload your resume in PDF format (`.pdf`). Job descriptions can be uploaded as PDF files (`.pdf`) or image files (`.jpg`, `.jpeg`, `.png`)."
  },
  {
    question: "Is my resume data stored or shared with third parties?",
    answer:
      "No. Uploaded files are processed strictly for real-time skill extraction and comparison. Your data is not sold or shared with any recruiters or third-party platforms."
  },
  {
    question: "How can I improve my low match score?",
    answer:
      "Review the 'Missing Skill Gaps' card in your analysis report. Focus on acquiring the highest-priority recommended skills first, and highlight relevant practical projects or certifications on your resume."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <span className="faq-kicker">FREQUENTLY ASKED QUESTIONS</span>
        <h3>Everything You Need to Know</h3>
        <p>Learn how CareerPilot AI helps job seekers and recruiters optimize career matching.</p>
      </div>

      <div className="faq-accordion">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h4>{item.question}</h4>
                <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
              </div>
              {isOpen && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQSection;
