'use client';

import React from "react";
import "./ThankYou.css";

export default function ThankYou() {
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
        <a href="https://t.me/starglow_redslippers_bot" target="_blank" rel="noopener noreferrer">
        <object
          type="image/svg+xml"
          data="/telegram.svg"
          style={{
            width: "100%",
            height: "auto",
            position: "relative",
            alignItems: "center",
          }}
          aria-label="Telegram SVG"
        ></object>
        </a>
        <a href="https://x.com/StarglowP" target="_blank" rel="noopener noreferrer">
        <object
  type="image/svg+xml"
  data="/x.svg"
  style={{
    width: "100%",
    height: "auto",
    position: "relative",
    alignItems: "center",
  }}
  aria-label="X SVG"
></object>
        </a>
      </div>
    </div>
  );
}