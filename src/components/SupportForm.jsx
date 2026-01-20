import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    subject: "",
    message: "",
    priority: "Low",
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const submit = async () => {
    if (!formData.fullName || !formData.contact || !formData.message || !formData.consent) {
      alert("Please fill required fields and accept consent.");
      return;
    }

    try {
      await addDoc(collection(db, "support_requests"), {
        ...formData,
        timestamp: new Date()
      });
      alert("Support request submitted successfully!");
      setFormData({
        fullName: "",
        contact: "",
        email: "",
        subject: "",
        message: "",
        priority: "Low",
        consent: false
      });
    } catch (err) {
      console.error("Error submitting support request:", err);
      alert("Error submitting request. Try again.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px #ccc", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Support Request Form</h2>

      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name *"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        name="contact"
        type="tel"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact Number *"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message *"
        style={{ width: "100%", marginBottom: "10px", padding: "8px", minHeight: "60px" }}
      />
     
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          name="consent"
          type="checkbox"
          checked={formData.consent}
          onChange={handleChange}
          style={{ marginRight: "5px" }}
        />
        I agree to share my information for support purposes *
      </label>

      <button
        onClick={submit}
        style={{ width: "100%", padding: "10px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Submit
      </button>
    </div>
  );
}

