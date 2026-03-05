// src/data/index.js
import { questions } from "./questions";
import { istpResults } from "./istp";
import { istjResults } from "./istj";
import { isfpResults } from "./isfp";
import { isfjResults } from "./isfj";
import { infpResults } from "./infp";
import { infjResults } from "./infj";
import { intpResults } from "./intp";
import { intjResults } from "./intj";
import { estpResults } from "./estp";
import { estjResults } from "./estj";
import { esfpResults } from "./esfp";
import { esfjResults } from "./esfj";
import { enfpResults } from "./enfp";
import { enfjResults } from "./enfj";
import { entpResults } from "./entp";
export const allQuestions = questions;

// 1. 모든 MBTI 결과를 하나의 객체로 관리
export const allResults = {
  ISTP: istpResults,
  ISTJ: istjResults,
  ISFP: isfpResults,
  ISFJ: isfjResults,
  INFP: infpResults,
  INFJ: infjResults,
  INTP: intpResults,
  INTJ: intjResults,
  ESTP: estpResults,
  ESTJ: estjResults,
  ESFP: esfpResults,
  ESFJ: esfjResults,
  ENFP: enfpResults,
  ENFJ: enfjResults,
  ENTP: entpResults,
};

/**
 * [매칭 알고리즘]
 * 사용자 답변에 따라 최적의 챔피언 1명을 반환합니다.
 * @param {string} mbti - 계산된 MBTI (예: 'ISTP')
 * @param {string} pos - 37번 질문 답변 (TOP_MID, JUNGLE_SUP, AD)
 * @param {string} style - 38번 질문 답변 (ASSASSIN, TANKER, MARKSMAN)
 */
export const getMatchedChampion = (mbti, pos, style) => {
  const mbtiGroup = allResults[mbti];

  // 데이터가 아직 없는 유형일 경우를 대비한 안전장치
  if (!mbtiGroup || mbtiGroup.length === 0) return null;

  // STEP 1: 포지션(37번)과 스타일(38번)이 모두 일치하는 챔피언 탐색
  let matched = mbtiGroup.find((c) => c.pos === pos && c.style === style);

  // STEP 2: 완벽 일치가 없다면, 선호 포지션(37번)이라도 맞는 첫 번째 챔피언 선택
  if (!matched) {
    matched = mbtiGroup.find((c) => c.pos === pos);
  }

  // STEP 3: 그것도 없다면, 해당 MBTI 그룹의 가장 대표 챔피언(첫 번째) 반환
  return matched || mbtiGroup[0];
};
