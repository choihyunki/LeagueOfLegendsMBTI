import React, { useState } from "react";
import { allQuestions } from "./data/index";

const TestPage = ({ onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = allQuestions[currentIdx];
  const totalQuestions = allQuestions.length;

  const handleSelect = (choice) => {
    setAnswers({
      ...answers,
      [question.id]: choice,
    });
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onFinish(answers);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const progress = ((currentIdx + 1) / totalQuestions) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.progressWrapper}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>

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

      <div style={styles.navButtonGroup}>
        {currentIdx > 0 && (
          <button style={styles.navButton} onClick={handlePrev}>
            이전
          </button>
        )}
        <button
          style={{
            ...styles.navButton,
            ...styles.nextButton,
            opacity: answers[question.id] ? 1 : 0.5,
          }}
          onClick={handleNext}
          disabled={!answers[question.id]}
        >
          {currentIdx + 1 === totalQuestions ? "결과 보기" : "다음"}
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
    padding: "20px",
  },
  progressWrapper: {
    width: "100%",
    maxWidth: "500px",
    height: "8px",
    backgroundColor: "#1e293b",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "40px",
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
    maxWidth: "500px",
    animation: "fadeIn 0.5s ease-out",
  },
  count: { color: "#38bdf8", fontSize: "0.9rem", fontWeight: "bold" },
  questionText: {
    color: "#f8fafc",
    fontSize: "1.5rem",
    margin: "15px 0 30px",
    wordBreak: "keep-all",
    lineHeight: "1.4",
  },
  buttonGroup: { display: "flex", flexDirection: "column", gap: "12px" },
  optionButton: {
    padding: "18px",
    fontSize: "1rem",
    backgroundColor: "#1e293b",
    color: "#f8fafc",
    border: "1px solid #334155",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
  },
  selectedOption: {
    backgroundColor: "#38bdf8",
    borderColor: "#38bdf8",
    color: "#ffffff",
    fontWeight: "bold",
  },
  navButtonGroup: {
    display: "flex",
    width: "100%",
    maxWidth: "500px",
    gap: "10px",
    marginTop: "40px",
    paddingBottom: "40px",
  },
  navButton: {
    flex: 1,
    padding: "15px",
    fontSize: "1rem",
    borderRadius: "10px",
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
