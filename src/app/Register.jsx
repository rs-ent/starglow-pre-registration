'use client';

import React, { useState, useEffect } from "react";
import { sendMessageToUser } from "./utils/sendMessage";
import { saveData } from "./firebase/fetch";
import Script from 'next/script';
import ThankYou from "./ThankYou";
import './Register.css';

const Register = ({inviteCode}) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); // Manage email input
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state
  const [referrer, setReferrer] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // State to show ThankYou page

  // Registration handler
  const handleRegister = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
  
    try {
      setLoading(true);
      const registrationData = {
        email,
        telegramUser: user,
        inviteCode: inviteCode,
        referrer: referrer,
        createdAt: new Date().toISOString(),
      };
  
      const docId = await saveData("StarglowPreRegistration", registrationData, email);
      console.log("Document ID:", docId);
  
      if (user?.id) {
        try {
          await sendMessageToUser(
            user.id,
            `🌟 Welcome to **Starglow Protocol**! 🌟
            
Thank you for pre-registering, ${user?.first_name || "Pioneer"}! 🙌

🚀 *LET THEM GLOW!* 🚀

✨ Stay tuned for more updates from the Starglow Team!

🔗 Follow us for the latest news and let the glow shine brighter!`
          );
          console.log("Message sent to user.");
        } catch (error) {
          console.error("Error sending message to user:", error);
        }
      } else {
        console.warn("No Telegram user information available.");
      }
  
      setIsRegistered(true);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  }  

  return isRegistered ? (
    <div className="frame-2641">
      <ThankYou user={user} inviteCode={inviteCode} referrer={referrer}/>
    </div>
  ) : (
    <>
      {/* Telegram Web App SDK 로드 */}
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="lazyOnload"
        onLoad={() => {
          const urlParams = new URLSearchParams(window.location.search);
          const referrerValue = urlParams.get("startapp");
          setReferrer(referrerValue);
          console.log("Referrer: ", referrerValue);

          if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            setUser(tg.initDataUnsafe?.user);
            console.log("User: ", tg.initDataUnsafe.user);
          } else {
            console.error("Couldn't find Telegram.WebApp");
          }
        }}
      />
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
          <br />GET EXCLUSIVE REWARD
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
    </>
  );
};

export default Register;