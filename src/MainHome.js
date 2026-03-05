import React from "react";

const MainHome = ({ onStart, onWorldCup }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img
          src="/LOLMBTI.png"
          alt="LoL MBTI 로고"
          style={styles.logoImage}
          onClick={() => window.location.reload()}
        />
      </header>

      <main style={styles.main}>
        <div style={styles.tag}>#성격유형테스트 #롤이상형월드컵</div>

        <h1 style={styles.mainTitle}>
          내 플레이 스타일은
          <br />
          <span style={styles.highlight}>어떤 챔피언과 닮았을까?</span>
        </h1>

        <p style={styles.subTitle}>
          38개의 질문으로 분석하는 나의 MBTI와
          <br />
          172개 챔피언 중 최고의 원픽을 뽑는 월드컵까지!
        </p>

        <div style={styles.buttonGroup}>
          <button style={styles.startButton} onClick={onStart}>
            지금 바로 검사하기
          </button>

          {/* 1. 서비스 소개 대신 월드컵 버튼으로 변경 */}
          <button style={styles.worldCupButton} onClick={onWorldCup}>
            🏆 챔피언 이상형 월드컵 시작
          </button>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0C1427", // 깊은 다크 블루 (신뢰감)
    color: "#f8fafc",
    textAlign: "center",
  },
  header: {
    marginTop: "40px",
    cursor: "pointer",
    padding: "20px",
  },
  logoImage: {
    maxWidth: "250px",
    height: "auto",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px 60px 20px",
  },
  tag: {
    backgroundColor: "#1e293b",
    color: "#38bdf8",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    lineHeight: "1.3",
    marginBottom: "20px",
    wordBreak: "keep-all",
  },
  highlight: {
    color: "#38bdf8",
    backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8)", // 그라데이션 포인트
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subTitle: {
    fontSize: "1.1rem",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "40px",
    wordBreak: "keep-all",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "320px",
  },
  startButton: {
    padding: "20px",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 15px rgba(56, 189, 248, 0.3)",
  },
  infoButton: {
    padding: "16px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "#94a3b8",
    border: "1px solid #334155",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  footer: {
    padding: "40px 20px",
    color: "#475569",
    fontSize: "0.85rem",
  },
  footerNotice: {
    marginTop: "5px",
    fontSize: "0.75rem",
    opacity: 0.7,
  },
  worldCupButton: {
    padding: "16px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "#fbbf24", // 황금색
    border: "1px solid #fbbf24",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "all 0.2s",
  },
};

export default MainHome;
