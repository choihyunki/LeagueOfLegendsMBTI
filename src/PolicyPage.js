// src/PolicyPage.js
import React from "react";

const PolicyPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>개인정보 처리방침</h1>
      <div style={styles.content}>
        <p>
          <strong>1. 수집하는 개인정보 항목</strong>
          <br />본 사이트는 사용자의 MBTI 테스트 결과를 저장하지 않으며, 별도의
          회원가입 없이 이용 가능합니다.
        </p>

        <p>
          <strong>2. 쿠키(Cookie) 및 광고</strong>
          <br />본 사이트는 구글 애드센스(Google AdSense)를 통해 광고를
          게재합니다. 구글은 사용자의 방문 기록을 바탕으로 맞춤형 광고를
          제공하기 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저 설정에서
          쿠키 사용을 거부할 수 있습니다.
        </p>

        <p>
          <strong>3. 제3자 제공</strong>
          <br />본 사이트는 사용자의 개인정보를 외부에 제공하거나 판매하지
          않습니다.
        </p>

        <p>
          <strong>4. 문의처</strong>
          <br />
          개인정보와 관련한 문의는 문의하기 페이지를 통해 접수해주시기 바랍니다.
        </p>
      </div>
      <button onClick={() => window.history.back()} style={styles.btn}>
        뒤로가기
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
    textAlign: "left",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: { fontSize: "1.8rem", color: "#38bdf8", marginBottom: "30px" },
  content: { lineHeight: "1.8", fontSize: "1rem", color: "#cbd5e1" },
  btn: {
    marginTop: "40px",
    padding: "10px 20px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default PolicyPage;
