'use client';

import React, { useState, useEffect } from "react";
import { sendMessageToUser } from "./utils/sendMessage";
import { saveData, createUniqueInviteCode, isUniqueUser } from "./firebase/fetch";
import Script from 'next/script';
import ThankYou from "./ThankYou";
import Loading from "./Loading";
import './Register.css';

const BOT_USERNAME = "starglow_redslippers_bot";
const APP_NAME = "SGTPre";

const Register = () => {
  const [tg, setTG] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); // Manage email input
  const [message, setMessage] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Loading state
  const [referrer, setReferrer] = useState(null);
  const [registeredData, setRegisteredData] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const initializeTelegram = async () => {
      if (!tg) {
        console.error("Telegram WebApp is not initialized.");
        setIsInitialLoading(false);
        return;
      }
  
      try {
        tg.ready();
  
        const referrerValue = tg.initDataUnsafe?.start_param || null;
        console.log("Referrer: ", referrerValue);
        setReferrer(referrerValue);
  
        const userData = tg.initDataUnsafe?.user;
        console.log("User: ", userData);
        setUser(userData);
  
        const uniqueUser = await isUniqueUser(userData);
        console.log("Registration Data: ", uniqueUser);
        setRegisteredData(uniqueUser);
  
      } catch (error) {
        console.error("Error initializing Telegram WebApp:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };
  
    initializeTelegram();
  }, [tg]);
  
  const generateInviteLink = (inviteCode) => {
    return `https://t.me/${BOT_USERNAME}/${APP_NAME}?startapp=${inviteCode}`;
  }; 

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
      const inviteCode = await createUniqueInviteCode(email);
      setInviteCode(inviteCode);
      const link = generateInviteLink(inviteCode);
      setInviteLink(link);
      const registrationData = {
        email,
        telegramUser: user,
        inviteCode: inviteCode,
        referrer: referrer,
        inviteLink: link,
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

Follow us for the latest news and let the glow shine brighter!

🔗 INVITE LINK : ${link}
`
          );
          console.log("Message sent to user.");
        } catch (error) {
          console.error("Error sending message to user:", error);
        }
      } else {
        console.warn("No Telegram user information available.");
      }
  
      setRegisteredData(registrationData);

    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  }  

  return registeredData !== null ? (
    <div className="frame-2641">
      <ThankYou registrationData={registeredData}/>
    </div>
  ) : (isInitialLoading ? (<Loading />) : (
    <>
      {/* Telegram Web App SDK 로드 */}
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="lazyOnload"
        onLoad={ async () => {
          if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            setTG(tg);
          } else {
            console.error("Couldn't find Telegram.WebApp");
            setMessage("Couldn't find Telegram.WebApp");
            setIsInitialLoading(false);
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
        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <div className="input-container">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
              required
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </>
  )
  );
};

export default Register;