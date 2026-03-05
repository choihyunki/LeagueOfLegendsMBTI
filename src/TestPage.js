import React, { useState } from "react";
import { allQuestions } from "./data"; // 쪼개진 데이터 구조에 맞춰 allQuestions로 변경

const TestPage = ({ onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { 질문ID: "a" } 형태로 저장하여 수정 가능케 함

  const question = allQuestions[currentIdx];
  const totalQuestions = allQuestions.length;

  // 답변을 선택만 하는 함수 (아직 페이지 안 넘어감)
  const handleSelect = (choice) => {
    setAnswers({
      ...answers,
      [question.id]: choice,
    });
  };

  // 다음 버튼 클릭 시 실행
  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // 마지막 38번 질문까지 완료 후 결과 페이지로 이동
      onFinish(answers);
    }
  };

  // 이전 버튼 클릭 시 실행
  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // 진행률 계산
  const progress = ((currentIdx + 1) / totalQuestions) * 100;

  return (
    <div style={styles.container}>
      {/* 프로그레스 바 */}
      <div style={styles.progressWrapper}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>

      {/* 애니메이션 적용을 위해 key값에 currentIdx 부여 */}
      <div key={currentIdx} style={styles.questionBox}>
        <span style={styles.count}>
          질문 {currentIdx + 1} / {totalQuestions}
        </span>
        <h2 style={styles.questionText}>{question.content}</h2>

        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.optionButton,
              ...(answers[question.id] === "a" ? styles.selectedOption : {}),
            }}
            onClick={() => handleSelect("a")}
          >
            {question.a}
          </button>
          <button
            style={{
              ...styles.optionButton,
              ...(answers[question.id] === "b" ? styles.selectedOption : {}),
            }}
            onClick={() => handleSelect("b")}
          >
            {question.b}
          </button>
          {/* 포지션/스타일 질문(37, 38)에 c가 있을 경우 대비 */}
          {question.c && (
            <button
              style={{
                ...styles.optionButton,
                ...(answers[question.id] === "c" ? styles.selectedOption : {}),
              }}
              onClick={() => handleSelect("c")}
            >
              {question.c}
            </button>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 버튼 (이전/다음) */}
      <div style={styles.navButtonGroup}>
        {currentIdx > 0 && (
          <button style={styles.navButton} onClick={handlePrev}>
            이전 질문
          </button>
        )}
        <button
          style={{
            ...styles.navButton,
            ...styles.nextButton,
            opacity: answers[question.id] ? 1 : 0.5, // 선택 안하면 불투명하게
          }}
          onClick={handleNext}
          disabled={!answers[question.id]} // 선택해야만 클릭 가능
        >
          {currentIdx + 1 === totalQuestions ? "🔥 결과 보기" : "다음 질문"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    padding: "40px 20px",
  },
  progressWrapper: {
    width: "100%",
    maxWidth: "500px",
    height: "10px",
    backgroundColor: "#1e293b",
    borderRadius: "10px",
    marginBottom: "50px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#38bdf8",
    transition: "width 0.3s ease-in-out",
    boxShadow: "0 0 10px #38bdf8",
  },
  questionBox: {
    textAlign: "center",
    width: "100%",
    maxWidth: "600px",
    animation: "fadeIn 0.5s ease-out", // 애니메이션 추가
  },
  count: { color: "#38bdf8", fontSize: "1rem", fontWeight: "bold" },
  questionText: {
    color: "#f8fafc",
    fontSize: "1.8rem",
    margin: "20px 0 40px",
    wordBreak: "keep-all",
    lineHeight: "1.4",
  },
  buttonGroup: { display: "flex", flexDirection: "column", gap: "15px" },
  optionButton: {
    padding: "20px",
    fontSize: "1.1rem",
    backgroundColor: "#1e293b",
    color: "#f8fafc",
    border: "1px solid #334155",
    borderRadius: "15px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
  },
  selectedOption: {
    backgroundColor: "#38bdf8",
    borderColor: "#38bdf8",
    color: "#ffffff",
    fontWeight: "bold",
    transform: "scale(1.02)",
  },
  navButtonGroup: {
    display: "flex",
    width: "100%",
    maxWidth: "500px",
    gap: "15px",
    marginTop: "auto", // 하단 고정 효과
    paddingTop: "40px",
  },
  navButton: {
    flex: 1,
    padding: "15px",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#334155",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#38bdf8",
  },
};

// 애니메이션을 위한 글로벌 스타일 주입
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

export default TestPage;
