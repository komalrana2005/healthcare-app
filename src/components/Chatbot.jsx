import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Predefined questions + answers
  const faq = [
     { question: "How to volunteer?", answer: "Anyone above 18 can register as volunteer. Visit our Volunteer Form to sign up." },
    { question: "Emergency help?", answer: "Call 108 immediately for emergencies." },
    { question: "Support timings?", answer: "Support is available Monday to Friday, 9 AM - 6 PM." },
    { question: "Contact info?", answer: "You can reach us at contact@healthcare.org or call 123-456-7890." },
    { question: "Patient registration?", answer: "You can register as a patient using the Patient Support Form on our website." },
    { question: "Donation process?", answer: "Donations can be made online through our Donation page or via bank transfer." },
    { question: "Covid guidelines?", answer: "Please follow mask and social distancing guidelines. Visit our Covid Info page for updates." },
    { question: "Services offered?", answer: "We provide medical support, volunteer programs, and emergency assistance." },
    { question: "Feedback submission?", answer: "You can submit your feedback using the Support Form on our website." },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message from input field
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };

    // Try to match user input with predefined FAQ
    const faqMatch = faq.find(f =>
      input.toLowerCase().includes(f.question.toLowerCase().split(" ")[0])
    );

    const botMsg = {
      from: "bot",
      text: faqMatch ? faqMatch.answer : " You can contact using this number +91 98765 43210 for further assistance."
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle clicking a suggested question
  const handleSuggestionClick = (q) => {
    setMessages(prev => [
      ...prev,
      { from: "user", text: q.question },
      { from: "bot", text: q.answer }
    ]);
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "50px auto",
      display: "flex",
      flexDirection: "column",
      height: "550px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "10px",
      backgroundColor: "#f9f9f9"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Healthcare ChatBot</h2>

      {/* Scrollable chat messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#fff"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            textAlign: m.from === "user" ? "right" : "left",
            color: m.from === "user" ? "blue" : "green",
            margin: "5px 0",
            wordBreak: "break-word"
          }}>
            {m.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Suggested questions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
        {faq.map((f, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(f)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
              cursor: "pointer",
              flex: "1 0 48%"
            }}
          >
            {f.question}
          </button>
        ))}
      </div>

      {/* Input field + Send button */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          style={{
            flex: 1,
            height: "50px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            resize: "none",
            outline: "none",
            overflowY: "auto",
            backgroundColor: "white"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            height: "50px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
