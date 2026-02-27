# 🎮 LoL MBTI Lab

> **"당신의 성격과 가장 닮은 롤 챔피언은 누구일까요?"** > 36개의 심층 질문을 통해 분석하는 리그 오브 레전드 성격 유형 리포트 서비스

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ 주요 기능 (Key Features)

- **심층 MBTI 테스트**: 36문항의 정교한 질문을 통해 16가지 성격 유형 도출
- **챔피언 매칭**: 리그 오브 레전드 세계관(Lore)과 성격 지표를 결합한 최적의 캐릭터 매칭
- **포지션 추천**: 유저의 성향에 가장 적합한 인게임 라인(Top, Mid, Jg, Ad, Sup) 제안
- **시너지 분석**: 매칭된 챔피언과 게임 내에서 시너지가 좋은 '찰떡궁합' 리포트 제공
- **소셜 공유**: 카카오톡 및 링크 복사 기능을 통한 결과 공유 활성화

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React.js
- **Styling**: Inline Styles & CSS-in-JS (Modern UI / Dark Mode)
- **Deployment**: Vercel
- **Integration**: Kakao SDK, LoL Universe API (Story Links)

---

## 📈 수익화 전략 (Monetization)

- **Google AdSense**: 결과 페이지 및 메인 페이지 광고 최적화 배치를 통한 수익화
- **YouTube Synergy**: '최현기의 LoL Lore 연구소' 유튜브 채널과 연동하여 체류 시간 증대 및 트래픽 선순환

---

## 📁 프로젝트 구조 (Folder Structure)

```text
src/
 ├── components/
 │    ├── MainHome.js    # 메인 랜딩 페이지
 │    ├── TestPage.js    # 질문 진행 페이지 (Progress Bar 포함)
 │    ├── ResultPage.js  # 성격 리포트 및 공유 페이지
 │    ├── PolicyPage.js  # 개인정보 처리방침
 │    └── ContactPage.js # 문의하기 페이지
 ├── data.js             # 질문 데이터 및 16개 유형별 결과 로직
 └── App.js              # 라우팅 및 전역 상태 관리
```
