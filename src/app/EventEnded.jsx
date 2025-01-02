'use client';

import React, { useState } from "react";
import "./ThankYou.css";

const ThankYou = () => {

  return (
    <div className="thankyou-container">
      <div style={{
        position: "fixed", // fixed로 변경하여 화면 상단에 고정
        width: "20%",
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
      <div className="frame-50811 mt-4">
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
        <p>NOW DAILY FRESH SONG<br/>IS DELIVERED!<br/><br/>DON’T FORGET TO<br/>FOLLOW OUR CHANNEL</p>
      </div>
      <div className="social">
        <a href="https://t.me/StarglowP_Ann" target="_blank" rel="noopener noreferrer">
          <img
              src="/telegram.png"
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
            src="/x.png"
            alt="X SVG"
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              alignItems: "center",
            }}
          />
        </a>
        <a href="https://medium.com/@starglowP/what-is-starglow-protocol-57537b348313" target="_blank" rel="noopener noreferrer">
          <img
              src="/medium.png"
              alt="MEDIUM SVG"
              style={{
                width: "100%",
                height: "auto",
                position: "relative",
                alignItems: "center",
              }}
          />
        </a>
        </div>

        {/* 메인 앱 링크 */}
        <button
            onClick={() => {
                window.location.href = "http://starglow.pro/start";
            }}
            className="invite-button"
            style={{ marginTop: "20px" }}
        >
            VISIT STARGLOW!
        </button>
    </div>
  );
}

export default ThankYou;