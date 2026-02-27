import React from "react";

const MainHome = ({ onStart }) => {
  return (
    <div style={styles.container}>
      {/* 1. 이미지 제목 (누르면 홈으로 리턴) */}
      <header style={styles.header}>
        <img
          src="/LOLMBTI.png" // 제작하신 로고 이미지 경로
          alt="LoL MBTI 로고"
          style={styles.logoImage}
          onClick={() => window.location.reload()}
        />
      </header>

      <main style={styles.main}>
        {/* 장식용 아이콘이나 간단한 텍스트 요소 */}
        <div style={styles.tag}>#성격유형테스트 #리그오브레전드</div>

        <h1 style={styles.mainTitle}>
          내 플레이 스타일은
          <br />
          <span style={styles.highlight}>어떤 챔피언과 닮았을까?</span>
        </h1>

        <p style={styles.subTitle}>
          36개의 질문을 통해 분석하는
          <br />
          나의 성격 유형과 최적의 포지션 리포트
        </p>

        {/* 2. 버튼 섹션 */}
        <div style={styles.buttonGroup}>
          <button style={styles.startButton} onClick={onStart}>
            지금 바로 검사하기
          </button>

          <button
            style={styles.infoButton}
            onClick={() => alert("준비 중인 기능입니다!")}
          >
            서비스 소개
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
};

export default MainHome;
