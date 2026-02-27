import React, { useState, useEffect } from "react";
import MainHome from "./MainHome";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";
import PolicyPage from "./PolicyPage";
import ContactPage from "./ContactPage";
import { results } from "./data";

function App() {
  const [page, setPage] = useState("home");
  const [mbti, setMbti] = useState("");

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_KAKAO_JS_KEY");
    }
  }, []);

  const handleFinish = (answers) => {
    const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    answers.forEach((ans) => {
      const char = ans.choice === "a" ? ans.type[0] : ans.type[1];
      score[char]++;
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
    const result = results[mbti];
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `나의 롤 캐릭터는: ${result.chimp}`,
        description: `내 MBTI 성격과 딱 맞는 챔피언은 무엇일까? 지금 확인해보세요!`,
        imageUrl: "https://your-site-url.com/logo.png",
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
        {page === "home" && <MainHome onStart={() => setPage("test")} />}
        {page === "test" && <TestPage onFinish={handleFinish} />}
        {page === "result" && (
          <ResultPage
            mbti={mbti}
            onShareKakao={shareKakao}
            onCopyLink={copyLink}
          />
        )}
        {/* Policy와 Contact 페이지에서 홈으로 가는 onBack 연결 */}
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
          {/* 요청하신 대로 '홈으로' 링크 제거 */}
        </div>
        <p style={appStyles.disclaimer}>
          본 서비스는 라이엇 게임즈의 공식 서비스가 아니며, 사용된 모든 캐릭터
          저작권은 라이엇 게임즈에 있습니다.
        </p>
      </footer>
    </div>
  );
}

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
  disclaimer: {
    fontSize: "0.75rem",
    opacity: 0.6,
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.4",
  },
};

export default App;
