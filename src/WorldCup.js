import React, { useState, useEffect } from "react";
// index.js에서 export한 allResults를 가져옵니다.
import { allResults } from "./data/index";

const WorldCup = ({ onBack }) => {
  const [gameList, setGameList] = useState([]);
  const [nextRound, setNextRound] = useState([]);
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState(null);

  // 1. 데이터 초기화: 172개 급 데이터에서 랜덤 16개 추출
  useEffect(() => {
    // 모든 MBTI 배열을 하나로 합침
    const allChamps = Object.values(allResults).flat();

    // 중복 제거 (nameEn 기준)
    const uniqueChamps = [];
    const seen = new Set();

    allChamps.forEach((champ) => {
      if (!seen.has(champ.nameEn)) {
        seen.add(champ.nameEn);
        uniqueChamps.push(champ);
      }
    });

    // 랜덤 셔플 후 16개 선택
    const shuffled = uniqueChamps.sort(() => 0.5 - Math.random()).slice(0, 16);

    setGameList(shuffled);
    setRound(16);
  }, []);

  // 2. 선택 핸들러
  const handleSelect = (selected) => {
    if (round === 1) return;

    const newNextRound = [...nextRound, selected];

    // 현재 대결이 라운드의 마지막 대결일 때
    if (gameList.length <= 2) {
      if (round === 2) {
        // 결승전 종료
        setWinner(selected);
        setRound(1);
      } else {
        // 다음 라운드(8강, 4강 등)로 진출
        setGameList(newNextRound);
        setNextRound([]);
        setRound(round / 2);
      }
    } else {
      // 다음 대진으로 이동 (현재 대결한 2명 제외)
      setGameList(gameList.slice(2));
      setNextRound(newNextRound);
    }
  };

  // 우승자 화면
  if (winner) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>🏆 최종 우승 🏆</h1>
        <div style={styles.winnerCard}>
          <img
            src={`/images/${winner.nameEn}.avif`}
            alt={winner.chimp}
            style={styles.winnerImg}
            onError={(e) => (e.target.src = "/logo.png")}
          />
          <h2 style={styles.winnerName}>{winner.chimp}</h2>
        </div>
        <button onClick={onBack} style={styles.backBtn}>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  // 게임 진행 화면
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
            {/* 왼쪽 카드 */}
            <div style={styles.card} onClick={() => handleSelect(gameList[0])}>
              <div style={styles.imgWrapper}>
                <img
                  src={`/images/${gameList[0].nameEn}.avif`}
                  alt="left"
                  style={styles.img}
                  onError={(e) => (e.target.src = "/logo.png")}
                />
              </div>
              <div style={styles.nameTag}>{gameList[0].chimp}</div>
            </div>

            <div style={styles.vsCircle}>VS</div>

            {/* 오른쪽 카드 */}
            <div style={styles.card} onClick={() => handleSelect(gameList[1])}>
              <div style={styles.imgWrapper}>
                <img
                  src={`/images/${gameList[1].nameEn}.avif`}
                  alt="right"
                  style={styles.img}
                  onError={(e) => (e.target.src = "/logo.png")}
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
