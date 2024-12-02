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
        <img
          src="/Frame 143.svg"
          alt="Header SVG"
          style={{
            width: "100%",
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div className="starglow-logo">
        <img src="/Frame 833 2.svg" alt="Starglow Logo" className="logo-image" />
      </div>
      <div className="thankyou-message">
        <div className="frame-50811">
          <img
              src="/Frame 50811.svg"
              alt="Header SVG"
              style={{
                width: "50%",
                height: "auto",
                position: "relative",
                alignItems: "center",
              }}
            />
        </div>
        <h1>THANK YOU!</h1>
        <p>AND STAY TUNED!<br/><br/>DON’T FORGET TO<br/>FOLLOW OUR CHANNEL</p>
      </div>
      <div className="social">
        <a href="https://t.me/starglow_redslippers_bot" target="_blank" rel="noopener noreferrer">
          <img
            src="/telegram.svg"
            alt="Header SVG"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              alignItems: "center",
            }}
          />
        </a>
        <a href="https://x.com/StarglowP" target="_blank" rel="noopener noreferrer">
          <img
            src="/x.svg"
            alt="Header SVG"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              alignItems: "center",
            }}
          />
        </a>
      </div>
    </div>
  );
}