import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    availability: [],
    skills: "",
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "availability") {
      let newAvail = [...formData.availability];
      if (checked) {
        newAvail.push(value);
      } else {
        newAvail = newAvail.filter(v => v !== value);
      }
      setFormData(prev => ({ ...prev, availability: newAvail }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const submit = async () => {
    if (!formData.fullName || !formData.contact || !formData.consent) {
      alert("Please fill required fields and accept consent.");
      return;
    }

    try {
      await addDoc(collection(db, "volunteers"), {
        ...formData,
        timestamp: new Date()
      });
      alert("Volunteer data saved successfully!");
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        availability: [],
        skills: "",
        consent: false
      });
    } catch (err) {
      console.error("Error saving volunteer data:", err);
      alert("Error saving data. Try again.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px #ccc", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Volunteer Registration</h2>

      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name *"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
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

    

      <textarea
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="Your skills / expertise"
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
        I agree to volunteer and share my information *
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
