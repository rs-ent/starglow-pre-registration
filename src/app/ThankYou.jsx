'use client';

import React, { useState } from "react";
import "./ThankYou.css";

const ThankYou = ({registrationData}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Telegram 공유 기능 트리거
  const handleShareInvite = () => {
    if (!registrationData.inviteLink) {
      alert("Invite link is not available.");
      return;
    }
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(registrationData.inviteLink)}&text=${encodeURIComponent(
      "Join me on Starglow! 🚀 Click the link below to register:"
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleCopyInviteLink = () => {
    if (!registrationData.telegramUser?.id) {
      alert("User Data is not provided");
      return;
    }
    if (!registrationData.inviteLink) {
      alert("Invite link is not available.");
      return;
    }
    navigator.clipboard.writeText(registrationData.inviteLink)
      .then(() => {
        alert("Invite link copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy invite link.");
      });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="thankyou-container">
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
            width: "100%",
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          aria-label="Header SVG"
        />
      </div>
      <div className="starglow-logo">
      <object
          type="image/svg+xml"
          data="/Frame 833 2.svg"
          className="logo-image"
          aria-label="Starglow Logo"
        ></object>
      </div>
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
      <div className="thankyou-message">
        
        <h1>THANK YOU!</h1>
        <p>AND STAY TUNED!<br/><br/>DON’T FORGET TO<br/>FOLLOW OUR CHANNEL</p>
      </div>
      <div className="social">
        <a href="https://t.me/StarglowP_Ann" target="_blank" rel="noopener noreferrer">
          <img
              src="/telegram.svg"
              alt="TELEGRAM SVG"
              style={{
                width: "100%",
                height: "auto",
                position: "relative",
                alignItems: "center",
              }}
          />
        </a>
        <a href="https://x.com/starglowP" target="_blank" rel="noopener noreferrer">
          <img
            src="/x.svg"
            alt="X SVG"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </a>
      </div>

      {/* 초대 링크 공유 버튼 */}
      {registrationData.telegramUser?.id && (
        <button
          onClick={openPopup}
          className="invite-button"
          style={{ marginTop: "20px" }}
        >
          INVITE YOUR FRIENDS!
        </button>
      )}

      {/* 팝업 */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Share Your Invite</h3>
            <p>Choose how you want to share your invite link</p>
            <button className="popup-button" onClick={handleShareInvite}>Send Message</button>
            <button className="popup-button" onClick={handleCopyInviteLink}>Copy Invite Link</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThankYou;