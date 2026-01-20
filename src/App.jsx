import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PatientForm from "./components/PatientForm";
import VolunteerForm from "./components/VolunteerForm";
import SupportForm from "./components/SupportForm";
import ChatBot from "./components/Chatbot";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PatientForm />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/support" element={<SupportForm />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </>
  );
}
