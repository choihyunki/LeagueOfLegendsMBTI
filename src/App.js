import React, { useState, useEffect } from "react";
import MainHome from "./MainHome";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";
import PolicyPage from "./PolicyPage";
import ContactPage from "./ContactPage";
import WorldCup from "./WorldCup";
// 1. data.js 대신 통합된 데이터 index에서 allResults와 질문 데이터를 가져옵니다.
import { allResults, allQuestions } from "./data/index";

function App() {
  const [page, setPage] = useState("home");
  const [mbti, setMbti] = useState("");

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("3dbf345bea6c1e7494972fd8b79b45aa");
    }
  }, []);

  const handleFinish = (answers) => {
    const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // 2. answers가 객체 { "1": "a", "2": "b" ... } 형태이므로 이에 맞게 순회합니다.
    Object.keys(answers).forEach((id) => {
      const questionId = parseInt(id);
      // 36번 질문까지만 MBTI 점수에 반영 (37, 38은 포지션/스타일)
      if (questionId <= 36) {
        const choice = answers[id];
        const question = allQuestions.find((q) => q.id === questionId);
        if (question) {
          const char = choice === "a" ? question.type[0] : question.type[1];
          score[char]++;
        }
      }
    });

    const finalMbti =
      (score.E >= score.I ? "E" : "I") +
      (score.S >= score.N ? "S" : "N") +
      (score.T >= score.F ? "T" : "F") +
      (score.J >= score.P ? "J" : "P");

    setMbti(finalMbti);
    setPage("result");
    window.scrollTo(0, 0);
  };

  const shareKakao = () => {
    if (!window.Kakao) return;

    // 3. results 대신 allResults를 참조하고, 배열이므로 첫 번째 요소를 선택합니다.
    const resultList = allResults[mbti];
    const result = resultList
      ? resultList[0]
      : { chimp: "챔피언", nameEn: "vayne" };

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `나의 롤 캐릭터는: ${result.chimp}`,
        description: `내 MBTI 성격과 딱 맞는 챔피언은 무엇일까? 지금 확인해보세요!`,
        imageUrl: `https://your-site-url.com/images/${result.nameEn}.avif`, // 실제 서버 주소로 변경 필요
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "결과 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("링크가 복사되었습니다!"))
      .catch(() => alert("링크 복사에 실패했습니다."));
  };

  return (
    <div style={appStyles.container}>
      <main style={appStyles.mainContent}>
        {page === "home" && (
          <MainHome
            onStart={() => setPage("test")}
            onWorldCup={() => setPage("worldcup")}
          />
        )}
        {page === "test" && <TestPage onFinish={handleFinish} />}
        {page === "worldcup" && <WorldCup onBack={() => setPage("home")} />}
        {page === "result" && (
          <ResultPage
            mbti={mbti}
            onShareKakao={shareKakao}
            onCopyLink={copyLink}
          />
        )}
        {page === "policy" && <PolicyPage onBack={() => setPage("home")} />}
        {page === "contact" && <ContactPage onBack={() => setPage("home")} />}
      </main>

      <footer style={appStyles.footer}>
        <p>© 2026 LoL Lore Lab. All rights reserved.</p>
        <div style={appStyles.footerLinks}>
          <span onClick={() => setPage("policy")} style={appStyles.link}>
            개인정보 처리방침
          </span>
          <span style={appStyles.divider}>|</span>
          <span onClick={() => setPage("contact")} style={appStyles.link}>
            문의하기
          </span>
        </div>

        <div style={appStyles.disclaimerBox}>
          <p style={appStyles.disclaimerText}>
            [LoL MBTI Lab] isn't endorsed by Riot Games and doesn't reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing League of Legends. League of Legends and Riot
            Games are trademarks or registered trademarks of Riot Games, Inc.
            League of Legends © Riot Games, Inc.
          </p>
          <p style={appStyles.disclaimerKR}>
            본 서비스는 라이엇 게임즈의 공식 서비스가 아니며, 리그 오브 레전드
            및 라이엇 게임즈는 Riot Games, Inc.의 상표 또는 등록 상표입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

// appStyles 객체는 현기님 기존 코드와 동일 (유지)
const appStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
  },
  mainContent: { flex: 1 },
  footer: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "#0f172a",
    borderTop: "1px solid #1e293b",
    color: "#475569",
    fontSize: "0.85rem",
  },
  footerLinks: { marginTop: "12px", marginBottom: "12px" },
  link: { cursor: "pointer", color: "#94a3b8" },
  divider: { margin: "0 10px", color: "#1e293b" },
  disclaimerBox: {
    marginTop: "20px",
    padding: "15px",
    borderTop: "1px solid #1e293b",
    maxWidth: "800px",
    margin: "20px auto 0",
  },
  disclaimerText: {
    fontSize: "0.7rem",
    color: "#475569",
    lineHeight: "1.4",
    textAlign: "justify",
    marginBottom: "8px",
  },
  disclaimerKR: { fontSize: "0.7rem", color: "#475569", opacity: 0.8 },
};

export default App;
