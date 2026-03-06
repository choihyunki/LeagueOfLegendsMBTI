import React from "react";
import { allResults } from "./data/index";

const ResultPage = ({ mbti, onShareKakao, onCopyLink }) => {
  const mbtiGroup = allResults[mbti];

  if (!mbtiGroup) {
    return (
      <div style={styles.container}>
        <div style={{ color: "#fff", marginTop: "100px" }}>
          데이터를 불러오는 중 오류가 발생했습니다. (MBTI: {mbti})
        </div>
      </div>
    );
  }

  const result = mbtiGroup[0];
  const characterImage = `/images/${result.nameEn}.avif`;

  const goHome = () => window.location.reload();
  const goStory = () =>
    result.storyUrl && window.open(result.storyUrl, "_blank");

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <p style={styles.topText}>당신의 성격과 가장 닮은 챔피언</p>
        <h1 style={styles.chimpName}>{result.chimp}</h1>

        <div style={styles.imageContainer}>
          <img
            src={characterImage}
            alt={result.chimp}
            style={styles.image}
            onError={(e) => {
              const src = e.target.src;
              if (src.endsWith(".avif")) {
                e.target.src = src.replace(".avif", ".jpg");
              } else if (src.endsWith(".jpg")) {
                e.target.src = "/logo.png";
              }
            }}
          />
        </div>

        <div style={styles.mbtiBadge}>
          {mbti} | {result.pos}
        </div>
      </header>

      <section style={styles.contentSection}>
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>🔍 성격 분석</h3>
          <p style={styles.cardText}>{result.analysis}</p>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>📜 배경 스토리</h3>
          <p style={styles.cardText}>{result.lore}</p>
        </div>

        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>🎮 플레이 가이드</h3>
          <p style={styles.cardText}>
            <strong>스타일:</strong> {result.playstyle}
          </p>
          <p style={{ ...styles.cardText, marginTop: "10px" }}>
            <strong>찰떡궁합:</strong> {result.bestCombo}
          </p>
        </div>
      </section>

      <div style={styles.actionArea}>
        <button onClick={goStory} style={styles.storyBtn}>
          📖 {result.chimp} 세계관 더 깊이 알아보기
        </button>

        <div style={styles.btnGroup}>
          <button
            onClick={onShareKakao}
            style={{ ...styles.miniBtn, backgroundColor: "#FEE500" }}
          >
            카톡 공유
          </button>
          <button
            onClick={onCopyLink}
            style={{ ...styles.miniBtn, backgroundColor: "#38bdf8" }}
          >
            링크 복사
          </button>
          <button
            onClick={goHome}
            style={{
              ...styles.miniBtn,
              backgroundColor: "#334155",
              color: "#fff",
            }}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#f8fafc",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    width: "100%",
    maxWidth: "500px",
  },
  topText: { color: "#94a3b8", fontSize: "1rem", marginBottom: "5px" },
  chimpName: {
    fontSize: "3rem",
    color: "#38bdf8",
    fontWeight: "800",
    marginBottom: "15px",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: "15px",
    overflow: "hidden",
    border: "3px solid #38bdf8",
    boxShadow: "0 0 15px rgba(56, 189, 248, 0.4)",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPositon: "center",
    display: "block",
  },
  mbtiBadge: {
    display: "inline-block",
    padding: "5px 15px",
    borderRadius: "20px",
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    fontWeight: "bold",
  },
  contentSection: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "40px",
  },
  infoCard: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    color: "#38bdf8",
    fontSize: "1.1rem",
    marginBottom: "10px",
    borderBottom: "1px solid #334155",
    paddingBottom: "5px",
  },
  cardText: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#cbd5e1",
    wordBreak: "keep-all",
    textAlign: "left",
  },
  actionArea: { width: "100%", maxWidth: "500px", textAlign: "center" },
  storyBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #475569",
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
  },
  btnGroup: { display: "flex", gap: "8px" },
  miniBtn: {
    flex: 1,
    padding: "12px 0",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#000",
  },
};

export default ResultPage;
