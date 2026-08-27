import { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGES = [
  {
    id: "msg-1",
    sender: "bot",
    text: "Hello! I am your 24/7 AI Career Assistant. Ask me anything about resume optimization, interview prep, cover letters, or career growth strategies!",
  },
];

const QUICK_PROMPTS = [
  "How can I improve my resume match score above 80%?",
  "What are top interview questions for a Full-Stack AI Engineer?",
  "How do I beat ATS keyword filters?",
  "What skills should I highlight for Remote Developer jobs?",
];

function CareerChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "That's a great question! ";
      const qLower = query.toLowerCase();

      if (qLower.includes("match score") || qLower.includes("score")) {
        botResponse +=
          "To boost your match score above 80%:\n1. Quantify achievements (e.g. 'Improved speed by 35%').\n2. Include exact keywords from the job description in your Skills & Experience sections.\n3. Ensure your resume format is standard PDF without tables or embedded graphics.";
      } else if (qLower.includes("interview") || qLower.includes("questions")) {
        botResponse +=
          "Top Interview Preparation Tips:\n1. Prepare STAR format stories (Situation, Task, Action, Result) for behavioral questions.\n2. Be ready to explain system architecture decisions (FastAPI vs Flask, React state management).\n3. Practice technical problem solving out loud.";
      } else if (qLower.includes("ats") || qLower.includes("filters")) {
        botResponse +=
          "To beat ATS filters:\n1. Use standard section headers ('Work Experience', 'Technical Skills', 'Education').\n2. Match job description terminology (e.g. use 'React.js' if specified).\n3. Avoid putting critical skills inside header/footer text frames.";
      } else if (qLower.includes("remote") || qLower.includes("skills")) {
        botResponse +=
          "For Remote Roles, highlight:\n1. Self-management and asynchronous communication skills.\n2. Version control (GitHub, PR reviews, CI/CD).\n3. Documentation hygiene (READMEs, Swagger API docs).";
      } else {
        botResponse +=
          "CareerPilot AI recommends tailoring your resume for every application. Use our 'AI Resume Matcher' tab to isolate missing skill gaps and generate a customized Cover Letter!";
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="chatbot-widget-container">
      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`chatbot-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="24/7 AI Career Guidance Chatbot"
      >
        {isOpen ? (
          "×"
        ) : (
          <>
            <span className="bot-pulse"></span>
            🤖 <span className="chatbot-btn-text">AI Career Chat</span>
          </>
        )}
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="bot-info">
              <div className="bot-avatar">🤖</div>
              <div>
                <strong>CareerBot AI</strong>
                <span className="bot-status-text">● Online • 24/7 Assistant</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
              >
                {msg.sender === "bot" && <span className="msg-avatar">🤖</span>}
                <div className={`chat-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row bot-row">
                <span className="msg-avatar">🤖</span>
                <div className="chat-bubble bot typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-bar">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                className="prompt-chip"
                onClick={() => handleSend(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="chatbot-input-bar">
            <input
              type="text"
              placeholder="Ask career or resume question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerChatbot;
