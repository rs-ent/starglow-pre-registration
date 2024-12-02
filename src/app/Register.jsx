'use client';

import React, { useState, useEffect } from "react";
import { saveData } from "./firebase/fetch";
import { sendMessageToUser } from './api/sendMessage'; 
import ThankYou from "./ThankYou";
import './Register.css';

export default function Register() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); // Manage email input
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state
  const [isRegistered, setIsRegistered] = useState(false); // State to show ThankYou page

  useEffect(() => {
    // Telegram Web App 초기화
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      const userInfo = tg.initDataUnsafe?.user || {};
      setUser(userInfo); // 사용자 정보 저장
    }
  }, []);

  const handleRegister = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const registrationData = {
        email,
        telegramUser: user, // Telegram 사용자 정보
      };
  
      const docId = await saveData("StarglowPreRegistration", registrationData);
      console.log("Document ID:", docId);
      setMessage("Registration successful!");

      setIsRegistered(true);
    } catch (error) {
        console.error("Registration error:", error);
        setMessage("An error occurred. Please try again.");
    } finally {
        setLoading(false); // End loading state
    }
  };

  return isRegistered ? (
    <div className="frame-2641">
      <ThankYou />
    </div>
  ):(
    <div className="frame-2641">
      <div style={{
        position: "fixed", // fixed로 변경하여 화면 상단에 고정
        width: "100%",
        maxWidth: "350px",
        height: "auto",
        top: 16,
        left: 16,
        zIndex: 1000, // 다른 요소 위에 표시되도록 z-index 설정
      }}>
        <object
          type="image/svg+xml"
          data="/Frame 143.svg"
          style={{
            width: "80%",
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></object>
      </div>
      <h1 className="coming-soon">COMING SOON</h1>
      <div className="frame-50811 mt-8">
        <object
      type="image/svg+xml"
      data="/Frame 50811.svg"
      style={{
        width: "100%",
        height: "auto",
        position: "relative",
      }}
    ></object>
      </div>
      <p className="pre-register-and-get-exclusive-reward mt-8">
        PRE-REGISTER AND
        <br/>GET EXCLUSIVE REWARD
      </p>
      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
        />
      </div>
      {message && <p className="message">{message}</p>}
      <button
        onClick={handleRegister}
        disabled={loading}
        className="register-button"
      >
        {loading ? "Submitting..." : "Register"}
      </button>
    </div>
  )
}