import React, { useState, useEffect } from "react";
import { allResults } from "./data"; // 기존 챔피언 데이터 활용

const WorldCup = ({ onBack }) => {
  const [candidates, setCandidates] = useState([]); // 전체 후보
  const [gameList, setGameList] = useState([]); // 현재 라운드 대결 리스트
  const [nextRound, setNextRound] = useState([]); // 승리자 명단
  const [round, setRound] = useState(0); // 16, 8, 4, 2 (결승)
  const [winner, setWinner] = useState(null); // 최종 우승자

  // 1. 데이터 초기화: 172개 중 랜덤 16개 추출
  useEffect(() => {
    const allChamps = Object.values(allResults).flat();
    // 중복 제거 및 셔플
    const uniqueChamps = Array.from(
      new Set(allChamps.map((c) => c.nameEn)),
    ).map((name) => allChamps.find((c) => c.nameEn === name));

    const shuffled = uniqueChamps.sort(() => 0.5 - Math.random()).slice(0, 16);
    setCandidates(shuffled);
    setGameList(shuffled);
    setRound(16);
  }, []);

  // 2. 선택 핸들러
  const handleSelect = (selected) => {
    if (round === 1) return;

    const newNextRound = [...nextRound, selected];

    // 현재 라운드의 한 판(2명)이 끝났을 때
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
      // 다음 대결로 진행 (앞의 2명 제거)
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
          />
          <h2 style={styles.winnerName}>{winner.chimp}</h2>
        </div>
        <button onClick={onBack} style={styles.backBtn}>
          메인으로 돌아가기
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
    padding: "20px",
    textAlign: "center",
  },
  header: { marginBottom: "40px" },
  roundText: { fontSize: "2.5rem", color: "#38bdf8" },
  vsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    width: "45%",
    maxWidth: "400px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  imgWrapper: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: "15px",
    overflow: "hidden",
    border: "4px solid #1e293b",
  },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  nameTag: { marginTop: "15px", fontSize: "1.5rem", fontWeight: "bold" },
  vsCircle: {
    backgroundColor: "#ef4444",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.2rem",
    zIndex: 10,
  },
  winnerCard: { margin: "40px auto", maxWidth: "500px" },
  winnerImg: {
    width: "100%",
    borderRadius: "20px",
    border: "5px solid #fbbf24",
  },
  winnerName: { fontSize: "3rem", color: "#fbbf24", marginTop: "20px" },
  backBtn: {
    padding: "15px 30px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#38bdf8",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
};

export default WorldCup;
