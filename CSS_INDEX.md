# 핸드팬 웹앱 CSS 인덱스

이 문서는 핸드팬 웹앱의 디자인 요소들이 어떻게 정의되어 있는지 정리한 개발 노트입니다. 모든 디자인 요소의 위치와 특성을 쉽게 찾고 수정할 수 있도록 구성되어 있습니다.

## 목차
1. [CSS 변수(root 설정)](#css-변수)
2. [레이아웃 및 컨테이너](#레이아웃-및-컨테이너)
3. [버튼 스타일](#버튼-스타일)
4. [지도 및 위치 관련 요소](#지도-및-위치-관련-요소)
5. [카드 및 목록 스타일](#카드-및-목록-스타일)
6. [텍스트 및 타이포그래피](#텍스트-및-타이포그래피)
7. [아이콘 및 이미지](#아이콘-및-이미지)
8. [모바일 및 반응형 스타일](#모바일-및-반응형-스타일)
9. [다크 모드](#다크-모드)
10. [애니메이션 및 트랜지션](#애니메이션-및-트랜지션)

## CSS 변수

전체 애플리케이션의 디자인 변수들은 `:root` 선택자 내에서 정의되어 있습니다.
- **파일 위치**: `styles.css` (1-56 줄)

### 색상 변수
- 기본 배경: `--bg-color`, `--body-bg` (라이트 모드: #F7F7F2)
- 컨테이너 배경: `--container-bg` (라이트 모드: #FFFFFF)
- 주요 색상: `--primary-color` (라이트 모드: #E8E8D8)
- 보조 색상: `--secondary-color` (라이트 모드: #F2F2E6)
- 텍스트 색상: `--text-color`, `--text-color-secondary`, `--text-color-tertiary`
- 경계선 색상: `--border-color`
- 버튼 그라디언트: `--button-gradient-start`, `--button-gradient-end`
- 버튼 호버 색상: `--button-hover-color`
- 그림자 색상: `--box-shadow`
- 강조 색상: `--accent-color` (라이트 모드: #8BC34A)
- 카카오 색상: `--kakao-color` (#FEE500), `--kakao-text` (#000000)

### 폰트 가중치
- `--font-light`: 300
- `--font-regular`: 400
- `--font-medium`: 500
- `--font-bold`: 700
- `--font-extra-bold`: 800

### 카드 스타일 변수
- 배경: `--card-bg`
- 경계선: `--card-border`
- 그림자: `--card-shadow`
- 호버 배경: `--card-hover-bg`
- 호버 그림자: `--card-hover-shadow`
- 둥근 모서리: `--card-border-radius` (15px), `--card-inner-border-radius` (8px)

### 버튼 변수
- 테두리 반경: `--button-border-radius` (23px)
- 최소 높이: `--button-min-height` (35px)
- 패딩(수직): `--button-padding-v` (8px)
- 패딩(수평): `--button-padding-h` (12px)
- 기본 폰트 크기: `--button-font-base` (13px)
- 줄 높이: `--button-line-height` (1.2)
- 텍스트 패딩: `--button-text-padding` (4px)
- 버튼 폰트 크기: `--button-font-size` (18px)

### 다크 모드 변수
- 다크 모드 색상 변수들은 `.dark-theme` 클래스에서 재정의됨
- **파일 위치**: `styles.css` (82-114 줄)

## 레이아웃 및 컨테이너

### 기본 컨테이너
- **파일 위치**: `styles.css` (214-233 줄)
- 클래스: `.container`
- 너비: 최대 480px (데스크톱), 100% (모바일)
- 패딩: 30px 20px
- 배경: `var(--container-bg)`
- 둥근 모서리: 20px (데스크톱), 0px (모바일)

### 콘텐츠 래퍼
- **파일 위치**: `styles.css` (263-272 줄)
- 클래스: `.content-wrapper`
- 디스플레이: flex
- 방향: column
- 정렬: center

### 모바일 뷰
- **파일 위치**: `styles.css` (1883-1900 줄)
- 클래스: `.mobile-view`

### 스크롤 제어
- **파일 위치**: `styles.css` (62-80 줄)
- 클래스: `.no-scroll-home`
- 스크롤 비활성화 및 고정 높이 설정

## 버튼 스타일

### 메인 버튼
- **파일 위치**: `styles.css` (324-341 줄)
- 클래스: `.main-button`
- 너비: 100%
- 패딩: 18px
- 폰트 크기: `var(--button-font-size)`
- 배경: 그라디언트 (var(--button-gradient-start), var(--button-gradient-end))
- 둥근 모서리: `var(--button-border-radius)`

### 홈 화면 버튼 스타일
- **파일 위치**: `styles.css` (342-371 줄)
- 클래스: `.button-1`, `.button-2`, `.button-3`, `.button-4`, `.button-5`, `.button-6`, `.button-7`
- 각 버튼별 개별 스타일 설정 가능

### 가로 버튼 컨테이너
- **파일 위치**: `styles.css` (372-384 줄)
- 클래스: `.horizontal-buttons`
- 디스플레이: flex
- 간격: 10px
- 너비: 100%

### 카카오 버튼
- **파일 위치**: `styles.css` (2544-2564 줄)
- 클래스: `.kakao-icon-container`, `.main-button.button-5`
- 아이콘 컨테이너 너비/높이: 42px
- 버튼 높이: 55px

### 전화 버튼
- **파일 위치**: `styles.css` (2575-2582 줄)
- 클래스: `.main-button.button-6`
- 버튼 높이: 55px

### 뒤로가기 버튼
- **파일 위치**: `styles.css` (394-420 줄)
- 클래스: `.back-button`, `.back-arrow`
- 너비/높이: 44px
- 위치: 고정(fixed)
- 상단 위치: 25px
- 왼쪽 위치: 15px

## 지도 및 위치 관련 요소

### 지도 컨테이너
- **파일 위치**: `styles.css` (1925-1939 줄)
- 클래스: `.map-container`
- 높이: 190px (script.js에서 인라인 스타일로 설정)
- 하단 여백: 20px

### 지도 배경
- **파일 위치**: `styles.css` (1940-1949 줄)
- 클래스: `.map-background`
- 높이: 100%

### 위치 포인트
- **파일 위치**: `styles.css` (1950-1994 줄)
- 클래스: `.location-point`
- 너비/높이: 12px
- 호버/활성화 효과: 확대 및 색상 변경

### 지도 제목
- **파일 위치**: `styles.css` (1995-2003 줄)
- 클래스: `.map-title`
- 폰트 크기: 15px
- 패딩: 8px 0

### 지도 브랜드
- **파일 위치**: `styles.css` (2019-2032 줄)
- 클래스: `.map-brand`
- 폰트 크기: 15px
- 텍스트 정렬: 센터

## 카드 및 목록 스타일

### 커리큘럼 목록
- **파일 위치**: `styles.css` (1824-1837 줄)
- 클래스: `.curriculum-list`
- 디스플레이: grid
- 그리드 템플릿 열: 2열 (기본), 1열 (single-column 클래스 적용 시)
- 간격: 8px

### 커리큘럼 목록 항목
- **파일 위치**: `styles.css` (1838-1850 줄)
- 클래스: `.curriculum-list li`, `.curriculum-list li.small-text`
- 최소 높이: `calc(var(--button-min-height) * 1.2)`
- 폰트 크기 조정: 싱글 컬럼에서 15px로 설정 (2535-2543 줄)

### 싱글 컬럼 커리큘럼 목록
- **파일 위치**: `styles.css` (2505-2533 줄)
- 클래스: `.curriculum-list.single-column`
- 그리드 템플릿 열: 1fr (단일 열)
- 간격: 15px

### 프로필 카드
- **파일 위치**: `styles.css` (2091-2100 줄, 2227-2231 줄)
- 클래스: `.profile-card`
- 배경: `var(--card-bg)`
- 둥근 모서리: 15px
- 패딩: 20px

### 연락처 카드
- **파일 위치**: `styles.css` (2101-2109 줄)
- 클래스: `.contact-card`
- 추가 스타일링 및 내부 요소 정의

## 텍스트 및 타이포그래피

### 헤더 및 제목
- **파일 위치**: `styles.css` (288-305 줄)
- 클래스: `header`, `h1`, `h2`, `h3`, `.level-title`
- 텍스트 정렬: 센터
- 패딩: 20px 0
- 상단 여백: 10px

### 프로필 관련 텍스트
- **파일 위치**: `styles.css` (2110-2137 줄)
- 클래스: `.profile-section-title`, `.profile-name`, `.profile-job`
- 폰트 크기 및 가중치 정의

### FAQ 텍스트
- **파일 위치**: `styles.css` (2279-2298 줄)
- 클래스: `.faq-question`, `.faq-answer`
- 질문: 굵게, 17px
- 답변: 일반, 14px

## 아이콘 및 이미지

### 프로필 아이콘
- **파일 위치**: `styles.css` (1732-1752 줄)
- 클래스: `.profile-icon-container`, `.profile-icon`
- 너비/높이: 60px (데스크톱), 50px (모바일)
- 둥근 모서리: 50%

### 테마 아이콘
- **파일 위치**: `styles.css` (1689-1716 줄, 1724-1731 줄)
- 클래스: `.theme-toggle`, `.theme-icon`
- 너비/높이: 22px
- 위치: 고정(fixed), 우측 상단

### 카카오 아이콘
- **파일 위치**: `styles.css` (2544-2554 줄)
- 클래스: `.kakao-icon-container`
- 너비/높이: 42px
- 배경 이미지: url('images/optimized/kakao-optimized.png')

## 모바일 및 반응형 스타일

### 모바일 환경 (480px 이하)
- **파일 위치**: `styles.css` (794-866 줄)
- 미디어 쿼리: `@media (max-width: 480px)`
- 모바일 환경에 맞춘 레이아웃 및 스타일 조정

### 태블릿 환경 (768px 이하)
- **파일 위치**: `styles.css` (714-793 줄)
- 미디어 쿼리: `@media (max-width: 768px)`
- 태블릿 환경에 맞춘 레이아웃 및 스타일 조정

### PWA 환경
- **파일 위치**: `styles.css` (136-185 줄)
- 미디어 쿼리: `@media all and (display-mode: standalone)`
- PWA 환경에 맞춘 특별 스타일링

### 버튼 크기 조정 (모바일)
- **파일 위치**: `styles.css` (1844-1882 줄)
- 미디어 쿼리: `@media (max-width: 480px)`
- 버튼 크기, 패딩, 폰트 크기 조정

## 다크 모드

### 다크 모드 설정
- **파일 위치**: `styles.css` (82-114 줄)
- 클래스: `.dark-theme`
- 배경, 컬러 등 다크 모드에 맞게 CSS 변수 재정의

### 다크 모드 전환
- **script.js**에서 `setThemeByTime()` 함수를 통해 시간에 따라 자동 변경
- `toggleTheme()` 함수로 사용자 수동 변경 가능

## 애니메이션 및 트랜지션

### 페이드인 애니메이션
- **파일 위치**: `styles.css` (2057-2061 줄)
- 키프레임: `@keyframes fadeIn`
- 불투명도 0에서 1로 전환

### 줌인 애니메이션
- **파일 위치**: `styles.css` (2062-2073 줄)
- 키프레임: `@keyframes zoomIn`
- 크기 0.8에서 1로 확대

### 팝업 페이드인 애니메이션
- **파일 위치**: `styles.css` (1413-1423 줄)
- 키프레임: `@keyframes popupFadeIn`
- 불투명도와 스케일 동시 변경

## 자주 수정되는 요소

### 버튼 높이 및 스타일
- 홈 화면 가로 버튼(카카오톡/전화): `.main-button.button-5`, `.main-button.button-6` (2558-2582 줄)
- 메인 버튼 패딩 및 크기: `.main-button` (324-341 줄)

### 지도 크기 및 여백
- 지도 컨테이너: `.map-container` (1925-1939 줄)
- script.js의 `setMapContainerSize()` 함수에서 높이 190px로 설정

### 폰트 크기
- 버튼 폰트 크기: `--button-font-size` (56 줄)
- 모바일 폰트 크기 조정: `:root` 재정의 (1845-1853 줄)

### 커리큘럼 목록 레이아웃
- 커리큘럼 목록 그리드: `.curriculum-list`, `.curriculum-list.single-column` (1824-1837 줄, 2505-2533 줄)
- 모바일 환경에서의 폰트 크기: (2535-2543 줄) 