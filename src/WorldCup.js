import React, { useState, useEffect } from "react";
// index.js에서 export한 allResults를 가져옵니다.
import { worldCupChamps } from "./data/worldcuplist";

const WorldCup = ({ onBack }) => {
  const [gameList, setGameList] = useState([]);
  const [nextRound, setNextRound] = useState([]);
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // 2. MBTI 데이터를 합칠 필요 없이 바로 worldCupChamps 사용
    // 공식 스펠링 기반 128강 설정
    const shuffled = [...worldCupChamps]
      .sort(() => 0.5 - Math.random())
      .slice(0, 128);

    setGameList(shuffled);
    setRound(shuffled.length);
  }, []);
  // 3. 이미지 로딩 실패 시 확장자 교체 로직
  const handleImgError = (e) => {
    const src = e.target.src;
    if (src.endsWith(".avif")) {
      // .avif 실패 시 .jpg로 시도
      e.target.src = src.replace(".avif", ".jpg");
    } else if (src.endsWith(".jpg")) {
      // .jpg도 실패 시 기본 로고로 교체
      e.target.src = "/logo.png";
    }
  };

  const handleSelect = (selected) => {
    if (round === 1) return;

    const newNextRound = [...nextRound, selected];

    if (gameList.length <= 2) {
      if (round === 2) {
        setWinner(selected);
        setRound(1);
      } else {
        setGameList(newNextRound);
        setNextRound([]);
        setRound(round / 2);
      }
    } else {
      setGameList(gameList.slice(2));
      setNextRound(newNextRound);
    }
  };

  if (winner) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>🏆 최종 우승 🏆</h1>
        <div style={styles.winnerCard}>
          <img
            src={`/images/${winner.nameEn}.avif`}
            alt={winner.chimp}
            style={styles.winnerImg}
            onError={handleImgError}
          />
          <h2 style={styles.winnerName}>{winner.chimp}</h2>
        </div>
        <button onClick={onBack} style={styles.backBtn}>
          메인으로
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.roundText}>
          {round === 2 ? "결승전" : `${round}강`}
        </h2>
        <p style={styles.subText}>더 마음에 드는 챔피언을 선택하세요!</p>
      </header>

      <div style={styles.vsContainer}>
        {gameList.length >= 2 && (
          <>
            <div style={styles.card} onClick={() => handleSelect(gameList[0])}>
              <div style={styles.imgWrapper}>
                <img
                  src={`/images/${gameList[0].nameEn}.avif`}
                  alt="left"
                  style={styles.img}
                  onError={handleImgError}
                />
              </div>
              <div style={styles.nameTag}>{gameList[0].chimp}</div>
            </div>

            <div style={styles.vsCircle}>VS</div>

            <div style={styles.card} onClick={() => handleSelect(gameList[1])}>
              <div style={styles.imgWrapper}>
                <img
                  src={`/images/${gameList[1].nameEn}.avif`}
                  alt="right"
                  style={styles.img}
                  onError={handleImgError}
                />
              </div>
              <div style={styles.nameTag}>{gameList[1].chimp}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center",
  },
  header: { marginBottom: "40px" },
  roundText: { fontSize: "2.5rem", color: "#38bdf8", fontWeight: "800" },
  subText: { color: "#94a3b8", marginTop: "10px" },
  vsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    width: "45%",
    minWidth: "150px",
    maxWidth: "400px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  imgWrapper: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: "15px",
    overflow: "hidden",
    border: "4px solid #1e293b",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  nameTag: {
    marginTop: "15px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#f8fafc",
  },
  vsCircle: {
    backgroundColor: "#ef4444",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "1.2rem",
    boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
    zIndex: 10,
  },
  winnerCard: { margin: "40px auto", maxWidth: "600px" },
  winnerImg: {
    width: "100%",
    borderRadius: "20px",
    border: "5px solid #fbbf24",
    boxShadow: "0 0 25px rgba(251, 191, 36, 0.4)",
  },
  winnerName: {
    fontSize: "3rem",
    color: "#fbbf24",
    marginTop: "20px",
    fontWeight: "900",
  },
  backBtn: {
    marginTop: "20px",
    padding: "15px 40px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#38bdf8",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(56, 189, 248, 0.3)",
  },
};

export default WorldCup;
