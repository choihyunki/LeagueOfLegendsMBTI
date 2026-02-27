import React, { useState } from "react";
import { questions } from "./data";

const TestPage = ({ onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (choice) => {
    const newAnswers = [
      ...answers,
      { type: questions[currentIdx].type, choice },
    ];
    setAnswers(newAnswers);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onFinish(newAnswers); // 모든 질문 완료 시 결과 계산 함수로 전달
    }
  };

  // 진행률 계산
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div style={styles.container}>
      {/* 프로그레스 바 */}
      <div style={styles.progressWrapper}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>

      <div style={styles.questionBox}>
        <span style={styles.count}>
          질문 {currentIdx + 1} / {questions.length}
        </span>
        <h2 style={styles.questionText}>{questions[currentIdx].content}</h2>

        <div style={styles.buttonGroup}>
          <button style={styles.optionButton} onClick={() => handleAnswer("a")}>
            {questions[currentIdx].a}
          </button>
          <button style={styles.optionButton} onClick={() => handleAnswer("b")}>
            {questions[currentIdx].b}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0f172a",
    padding: "0 20px",
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
    maxWidth: "600px",
  },
  count: {
    color: "#38bdf8",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  questionText: {
    color: "#f8fafc",
    fontSize: "1.8rem",
    margin: "20px 0 40px",
    wordBreak: "keep-all",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
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
    lineHeight: "1.4",
    ":hover": { backgroundColor: "#334155" }, // 실제 구현시 훅이나 클래스로 처리
  },
};

export default TestPage;
