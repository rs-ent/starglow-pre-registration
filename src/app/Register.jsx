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
  const [isHidden, setIsHidden] = useState(false);

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

  useEffect(() => {
    // 2초 후 로딩 화면 숨김
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 2000); // 애니메이션 시간과 동일하게 설정

    return () => clearTimeout(timer);
  }, [isInitialLoading]);
  
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
      const link = generateInviteLink(inviteCode);
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
          const photoUrl = 'https://firebasestorage.googleapis.com/v0/b/redslippers.appspot.com/o/uploads%2F5d398c1a-d2b0-40c7-ac1b-4f94fe08134d_2024-12-05%2019.10.08.jpg?alt=media&token=548ade94-b518-43ce-ab8b-a7cb9407f182';
          await sendMessageToUser(
            user.id,
            `🌟 Welcome to **Starglow Protocol**! 🌟
            
Thank you for pre-registering, ${user?.first_name || "Pioneer"}! 🙌

🚀 *LET THEM GLOW!* 🚀

✨ Stay tuned for more updates from the Starglow Team!

Follow us for the latest news and let the glow shine brighter!

🔗 INVITE LINK : ${link.replace(/_/g, "\\_")}
`
          , photoUrl);
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

  return (
    <>
      {/* Loading 화면 */}
      <div className={`loading-overlay ${isHidden ? "hidden" : ""}`}>
        <Loading isInitialLoading={isInitialLoading} />
      </div>
  
      {/* 조건부 렌더링 */}
      {registeredData !== null ? (
        <div className="frame-2641">
          <ThankYou registrationData={registeredData} />
        </div>
      ) : (
        <>
          {/* Telegram Web App SDK 로드 */}
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="lazyOnload"
            onLoad={async () => {
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
            <div
              style={{
                position: "fixed",
                width: "20%",
                height: "auto",
                top: 16,
                left: 16,
                zIndex: 1000,
              }}
            >
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
  
            {/* 콘텐츠 */}
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
              <br />
              GET EXCLUSIVE REWARD
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <div className="input-container">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input-field"
                  required
                />
                {message && <p className="message">{message}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="register-button"
                >
                  {loading ? "Submitting..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Register;