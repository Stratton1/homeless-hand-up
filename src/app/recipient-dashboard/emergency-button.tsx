"use client";

import { useState } from "react";

export default function EmergencyButton() {
  const [isPressed, setIsPressed] = useState(false);

  const handleEmergencyContact = () => {
    setIsPressed(true);
    alert(
      "Your support worker Dave has been notified. They will contact you within 24 hours."
    );
    // Reset after showing alert
    setTimeout(() => setIsPressed(false), 500);
  };

  return (
    <button
      onClick={handleEmergencyContact}
      disabled={isPressed}
      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
        isPressed
          ? "bg-brand-warm/50 text-white cursor-default"
          : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:from-red-600 hover:to-orange-600 active:scale-95"
      }`}
    >
      <span className="inline-block mr-2">🆘</span>
      Request Support Worker Contact
    </button>
  );
}
