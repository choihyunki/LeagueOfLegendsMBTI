// src/ContactPage.js

import React from "react";

// 괄호 안에 { onBack }을 추가하여 부모로부터 함수를 받아옵니다.
const ContactPage = ({ onBack }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>문의하기 (Contact)</h1>
      <div style={styles.content}>
        <p>
          서비스 이용 중 불편한 점이나 비즈니스 문의가 있으시면 아래 경로로 연락
          부탁드립니다.
        </p>

        <div style={styles.card}>
          <p>
            📧 <strong>Email:</strong> shcoolbus123@gmail.com
          </p>
        </div>

        <p style={{ marginTop: "20px" }}>
          답변은 보통 1~2일 내에 드리고 있습니다.
        </p>
      </div>

      {/* 버튼 클릭 시 onBack 함수가 실행되어 홈으로 돌아갑니다. */}
      <button onClick={onBack} style={styles.btn}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    minHeight: "100vh",
    textAlign: "center",
  },
  title: { fontSize: "1.8rem", color: "#38bdf8", marginBottom: "30px" },
  content: { lineHeight: "1.8", color: "#cbd5e1" },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    display: "inline-block",
    marginTop: "20px",
    textAlign: "left",
  },
  link: { color: "#38bdf8", textDecoration: "none" },
  btn: {
    marginTop: "40px",
    padding: "12px 24px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default ContactPage;
