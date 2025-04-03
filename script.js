// 카카오 SDK 초기화
function initializeKakao() {
    try {
        if (!Kakao.isInitialized()) {
            Kakao.init('e0cd06a9e0719d0c2a6fcf2bdb9906c2');
            console.log('카카오 SDK 초기화 성공');
        }
    } catch (error) {
        console.error('카카오 SDK 초기화 실패:', error);
        alert('카카오 인증 서비스 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
}

// 시간대에 따른 테마 설정
function setThemeByTime() {
    const hour = new Date().getHours();
    const isDarkTime = hour >= 18 || hour < 6;
    document.body.classList.toggle('dark-theme', isDarkTime);
}

// 1분마다 테마 체크
function initThemeChecker() {
    setThemeByTime(); // 초기 설정
    setInterval(setThemeByTime, 60000); // 1분마다 체크
}

// 앱 초기화 함수 수정
function initializeApp() {
    initThemeChecker(); // 테마 체커 초기화
    showLoadingScreen();
    setTimeout(() => {
        const loadingContainer = document.querySelector('.loading-container');
        loadingContainer.classList.add('fade-out');
        setTimeout(() => {
            mainView();
        }, 500);
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    // 카카오 SDK 초기화 실행
    initializeKakao();

    // 라우팅 처리
    const routes = {
        '/': homeView,
        '/auth': authView,
        '/education': educationView,
        '/certification': certificationView,
        '/teachers': teachersView,
        '/video-lessons': videoLessonsView,
        '/curriculum': curriculumView,
        // '/scale-dictionary': scaleDictionaryView  // 임시 비활성화
    };

    // 현재 URL에 따른 뷰 렌더링
    function renderView() {
        const path = window.location.pathname;
        const view = routes[path] || homeView;
        view();
    }

    // 홈 화면 뷰
    function homeView() {
        document.querySelector('.container').innerHTML = `
            <header>
                <h1><span class="title-emoji">🏫</span> 핸드팬 아카데미</h1>
            </header>
            <main>
                <div class="button-container">
                    <button class="main-button" onclick="window.open('https://forms.gle/4Fcb5S3KtwKYYejA9', '_blank')">
                        [홍대] 4/6, 4/20 핸드팬 그룹수업 신청
                    </button>
                    <button class="main-button" onclick="navigateTo('/teachers')">
                        강사 라인업
                    </button>
                    <button class="main-button" onclick="navigateTo('/certification')">
                        핸드팬강사 자격증
                    </button>
                    <button class="main-button" onclick="navigateTo('/education')">
                        교육자료
                    </button>
                    <div class="divider"></div>
                    <div class="horizontal-buttons">
                        <button class="main-button" onclick="window.open('http://qr.kakao.com/talk/eaCVDVzuz5Z7kqRWulpewF1ix7M-', '_blank')">
                            카톡문의
                        </button>
                        <button class="main-button" onclick="window.location.href='tel:+821089679204'">
                            전화상담
                        </button>
                    </div>
                    <button class="main-button empty-button" onclick="toggleAppDownloadPopup()">
                        앱 다운로드
                    </button>
                </div>
            </main>
            <div class="popup-overlay" onclick="toggleAppDownloadPopup()">
                <img src="images/appdown.png" alt="앱 다운로드 QR코드" class="popup-image" onclick="event.stopPropagation()">
            </div>
        `;
    }

    // 인증 화면 뷰
    function authView() {
        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <header>
                <h1>본인인증</h1>
            </header>
            <main>
                <div class="auth-container">
                    <p class="auth-description">필기시험 접수를 위해 본인인증이 필요합니다.</p>
                    <p class="auth-sub-description">카카오톡으로 간편하게 본인인증을 진행해주세요.</p>
                    <button class="kakao-button" onclick="startKakaoCertification()">
                        <img src="images/kakao.png" alt="카카오톡">
                        카카오톡 본인인증
                    </button>
                </div>
            </main>
        `;
    }

    // 교육자료 화면 뷰
    function educationView() {
        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <header>
                <h1>교육자료</h1>
            </header>
            <main>
                <div class="button-container">
                    <button class="main-button" onclick="navigateTo('/curriculum')">
                        커리큘럼
                    </button>
                    <button class="main-button" onclick="navigateTo('/video-lessons')">
                        동영상 레슨
                    </button>
                    <!-- 스케일 사전 임시 비활성화
                    <button class="main-button" onclick="navigateTo('/scale-dictionary')">
                        스케일 사전
                    </button>
                    -->
                </div>
            </main>
        `;
    }

    // 동영상 레슨 페이지 뷰
    function videoLessonsView() {
        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/education')">
                <span class="back-arrow">←</span>
            </button>
            <header>
                <h1>동영상 레슨</h1>
            </header>
            <main>
                <div class="button-container">
                    <button class="main-button" onclick="window.open('https://youtube.com/playlist?list=PL4WnUbNHhe60m0lavGl2sKGMfrinGza-Q&si=_I-nwawj0y7_CAlU', '_blank')">
                        리듬
                    </button>
                    <button class="main-button" onclick="window.open('https://youtube.com/playlist?list=PL4WnUbNHhe61QgyJ7JCQTfOwKwZrRkkQ8&si=T-p68Ojum96sB2TL', '_blank')">
                        테크닉
                    </button>
                    <button class="main-button" onclick="window.open('https://youtube.com/playlist?list=PLdbxiPn7dguQMlImDKdgGTyLutnvUOx-V&si=KGAxs74E37nmFcSJ', '_blank')">
                        핸드팬음악 라이브러리
                    </button>
                </div>
            </main>
        `;
    }

    // 자격증 정보 페이지
    function certificationView() {
        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <div class="certification-container">
                <div class="certification-slider">
                    <div class="slide">
                        <div class="certification-info">
                            <p class="certification-title">자격명: 핸드팬강사</p>
                            <p class="certification-issuer">발급: 사운드앤디자인(SND)</p>
                            <p class="certification-number">민간자격등록번호: 2025-001474</p>
                            <div class="certification-levels">
                                <div class="level-item">
                                    <h3>2급</h3>
                                    <p>일반인 및 학생들을 대상으로 핸드팬을 활용한 즉흥연주 기초과정을 가르치는 직무를 수행</p>
                                </div>
                                <div class="level-item">
                                    <h3>1급</h3>
                                    <p>자신만의 수업기법을 개발하여 1급 및 2급 핸드팬강사를 양성하고 일반인 및 학생들을 대상으로 핸드팬 연주를 가르치는 직무를 수행</p>
                                </div>
                            </div>
                            <div class="exam-button-container">
                                <button class="exam-button" onclick="navigateTo('/auth')">필기시험 접수</button>
                            </div>
                        </div>
                    </div>
                    <div class="slide">
                        <img src="images/certi.png" alt="자격증" class="certification-image">
                    </div>
                </div>
                <div class="slider-controls">
                    <button class="slider-button prev" onclick="showSlide(currentSlide - 1)">←</button>
                    <button class="slider-button next" onclick="showSlide(currentSlide + 1)">→</button>
                </div>
            </div>
        `;
        initializeSlider();
    }

    // 슬라이더 초기화 함수
    function initializeSlider() {
        window.currentSlide = 0;
        const slider = document.querySelector('.certification-slider');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.nav-dot');
        const prevButton = document.querySelector('.slider-button.prev');
        const nextButton = document.querySelector('.slider-button.next');

        if (!slider || !slides.length) return;

        window.showSlide = function (index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentSlide = index;
            const offset = -100 * index;
            slider.style.transform = `translateX(${offset}%)`;

            // 네비게이션 닷 업데이트
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // 버튼 상태 업데이트
            if (prevButton) prevButton.style.opacity = index === 0 ? '0.5' : '1';
            if (nextButton) nextButton.style.opacity = index === slides.length - 1 ? '0.5' : '1';
        };

        // 터치/스와이프 이벤트 처리
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // 최소 스와이프 거리
                if (diff > 0) {
                    showSlide(currentSlide + 1);
                } else {
                    showSlide(currentSlide - 1);
                }
            }
        });

        // 초기 슬라이드 표시
        showSlide(0);
    }

    // 강사 라인업 화면 뷰
    function teachersView() {
        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <main>
                <div class="teachers-container">
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">이헌국</div>
                            <div class="grid-item age">30대 남성</div>
                            <div class="grid-item target">성인</div>
                            <div class="grid-item job">원장</div>
                            <div class="grid-item location">서울 홍대</div>
                            <div class="grid-item class-type">대중강연, 세미나</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/snd_handpan_academy/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821089679204'">전화연결</button> -->
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">김문겸</div>
                            <div class="grid-item age">40대 남성</div>
                            <div class="grid-item target">청소년, 성인</div>
                            <div class="grid-item job">국악 연주자</div>
                            <div class="grid-item location">강원도 강릉</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/ansrua84/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821029388815'">전화연결</button> -->
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">미지수</div>
                            <div class="grid-item age">30대 여성</div>
                            <div class="grid-item target">성인</div>
                            <div class="grid-item job">배우 & 연주자</div>
                            <div class="grid-item location">서울 서대문구</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/warmwaves_therapy/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821045299038'">전화연결</button> -->
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">안재민</div>
                            <div class="grid-item age">30대 남성</div>
                            <div class="grid-item target">청소년, 성인</div>
                            <div class="grid-item job">배우 & 연주자</div>
                            <div class="grid-item location">서울 성북</div>
                            <div class="grid-item class-type">1:1</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/artist__jmin/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821072297450'">전화연결</button> -->
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">이시온</div>
                            <div class="grid-item age">40대 남성</div>
                            <div class="grid-item target">청소년, 성인</div>
                            <div class="grid-item job">명상 음악가</div>
                            <div class="grid-item location">서울 건대입구</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/sion.handpan/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821044454689'">전화연결</button> -->
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">이지은</div>
                            <div class="grid-item age">30대 여성</div>
                            <div class="grid-item target">아동, 청소년, 성인</div>
                            <div class="grid-item job">음악치료, 명상상담</div>
                            <div class="grid-item location">서울 서대문구</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/warmwaves_therapy/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821045299038'">전화연결</button> -->
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">조진희</div>
                            <div class="grid-item age">40대 여성</div>
                            <div class="grid-item target">성인</div>
                            <div class="grid-item job">암환우 연주자</div>
                            <div class="grid-item location">서울 성수</div>
                            <div class="grid-item class-type">1:1</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/designjinhee/', '_blank')">인스타그램</button>
                            <!-- <button class="grid-item contact" onclick="window.location.href='tel:+821031270691'">전화연결</button> -->
                        </div>
                    </div>
                </div>
            </main>
        `;
    }

    // 커리큘럼 페이지 뷰
    function curriculumView() {
        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/education')">
                <span class="back-arrow">←</span>
            </button>
            <main>
                <div class="curriculum-container">
                    <p class="curriculum-subtitle">기초과정 학습과목</p>
                    <div class="curriculum-card">
                        <h2 class="level-title">1. 이론</h2>
                        <ul class="curriculum-list">
                            <li>핸드팬 구조와 명칭</li>
                            <li>하모닉스 원리</li>
                            <li>튜닝과 리튠</li>
                            <li>스케일 개론</li>
                            <li>작곡</li>
                            <li>교수법</li>
                            <li>악기 보관과 관리</li>
                        </ul>
                    </div>
                    <div class="curriculum-card">
                        <h2 class="level-title">2. 리듬</h2>
                        <ul class="curriculum-list">
                            <li>4박자 기본리듬</li>
                            <li>6박자 기본리듬</li>
                            <li>리듬 쪼개기</li>
                            <li>하이햇으로 그루브 만들기</li>
                            <li>Odd Meter 확장</li>
                            <li>나만의 리듬 만들기</li>
                        </ul>
                    </div>
                    <div class="curriculum-card">
                        <h2 class="level-title">3. 테크닉</h2>
                        <ul class="curriculum-list">
                            <li>손가락 트레이닝</li>
                            <li>아르페지오</li>
                            <li>리듬화음멜로디 동시연주</li>
                            <li>롤 Roll</li>
                            <li>음색 확장</li>
                            <li>핸드팬 듀오 플레이: 캐슬링</li>
                        </ul>
                    </div>
                </div>
            </main>
        `;
    }

    // 스케일 사전 페이지 뷰
    function scaleDictionaryView() {
        document.querySelector('.container').innerHTML = `
            <div class="scale-dictionary-container">
                <button class="back-button" onclick="navigateTo('/education')">
                    <span class="back-arrow">←</span>
                </button>
                <div class="scale-card">
                    <div class="scale-header">
                        <h2>D Kurd 10</h2>
                        <p class="scale-notes">D / A Bb C D E F G A C</p>
                    </div>
                    <div class="scale-features">
                        <div class="feature-item">
                            <span class="feature-text">오리지널 디자인</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-text">대중적인 마이너</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-text">스테디셀러</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-text">초보자 추천</span>
                        </div>
                    </div>
                    <button class="video-button" onclick="window.open('https://www.youtube.com/watch?v=uL40C1bqKik', '_blank')">
                        동영상 보기
                    </button>
                </div>
            </div>
        `;
    }

    // 페이지 이동 함수
    window.navigateTo = function (path) {
        window.history.pushState({}, '', path);
        renderView();
    };

    // 브라우저 뒤로가기 처리
    window.addEventListener('popstate', renderView);

    // 초기 뷰 렌더링
    renderView();
});

// 카카오 인증 함수
function kakaoAuth() {
    // 초기화 상태 재확인
    if (!Kakao.isInitialized()) {
        initializeKakao();
    }

    Kakao.Auth.login({
        success: function (authObj) {
            // 카카오 인증 성공 시 사용자 정보 요청
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (res) {
                    const kakaoAccount = res.kakao_account;
                    console.log('카카오 인증 성공:', kakaoAccount);

                    // 구글 폼 URL
                    const formUrl = 'https://forms.gle/iHKFCr6Ybjpd27GR6';

                    // 새 창에서 구글 폼 열기
                    window.open(formUrl, '_blank');

                    // 알림 표시
                    alert('본인인증이 완료되었습니다. 필기시험 접수 페이지로 이동합니다.');

                    // 홈 화면으로 이동
                    navigateTo('/');
                },
                fail: function (error) {
                    console.error('사용자 정보 요청 실패:', error);
                    alert('사용자 정보를 가져오는데 실패했습니다.\n잠시 후 다시 시도하거나 뒤로가기 버튼을 눌러 홈으로 돌아갈 수 있습니다.');
                }
            });
        },
        fail: function (err) {
            console.error('카카오 인증 실패:', err);
            if (err.error_code === 'KOE101') {
                alert('카카오 인증 서비스 설정에 문제가 있습니다.\n잠시 후 다시 시도해주세요.');
            } else {
                alert('카카오톡 인증에 실패했습니다.\n뒤로가기 버튼을 눌러 홈으로 돌아갈 수 있습니다.');
            }
        }
    });
}

// 앱 다운로드 팝업 토글 함수
window.toggleAppDownloadPopup = function () {
    const overlay = document.querySelector('.popup-overlay');
    overlay.classList.toggle('active');

    // 팝업이 열릴 때 스크롤 방지
    if (overlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function createTeacherCard(teacher) {
    return `
        <div class="teacher-card">
            <div class="teacher-grid">
                <div class="grid-item name">${teacher.name}</div>
                <div class="grid-item job">${teacher.job}</div>
                <div class="grid-item target">${teacher.target}</div>
                <div class="grid-item social" onclick="window.open('${teacher.social}', '_blank')">SNS</div>
                <div class="grid-item contact" onclick="window.open('${teacher.contact}', '_blank')">문의하기</div>
                <!-- <div class="grid-item call" onclick="window.location.href='tel:${teacher.phone}'">전화연결</div> -->
            </div>
        </div>
    `;
}

function showCertificationExam() {
    const content = `
        <div class="auth-container">
            <p class="auth-description">필기시험 접수를 위해 본인인증이 필요합니다.</p>
            <p class="auth-sub-description">카카오톡으로 간편하게 본인인증을 진행해주세요.</p>
            <button class="kakao-button" onclick="startKakaoCertification()">
                <img src="images/kakao.png" alt="카카오톡">
                카카오톡 본인인증
            </button>
        </div>
    `;
    showContent(content);
}

function startKakaoCertification() {
    // 카카오톡 본인인증 서비스 초기화
    Kakao.init('YOUR_KAKAO_APP_KEY');

    // 본인인증 요청
    Kakao.Auth.authorize({
        redirectUri: 'YOUR_REDIRECT_URI',
        scope: 'account_ci',
        prompt: 'select_account',
        serviceTerms: ['account_ci']
    });
}

// 카카오톡 본인인증 콜백 처리
function handleKakaoCertificationCallback(response) {
    if (response.ci) {
        // 본인인증 성공 시 필기시험 링크로 이동
        window.location.href = 'https://forms.gle/8QJ9QJ9QJ9QJ9QJ9Q';
    } else {
        alert('본인인증에 실패했습니다. 다시 시도해주세요.');
    }
}

function teacherCardView() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <div class="teacher-card">
            <div class="teacher-name">핸드팬강사 자격</div>
            <div class="teacher-title">Handpan Instructor Certification</div>
            <div class="teacher-details">
                <p>핸드팬강사 자격은 핸드팬의 전문성을 인정받는 국제 자격증입니다.</p>
                <p>1급: 핸드팬의 모든 스케일과 테크닉을 완벽하게 마스터한 전문가</p>
                <p>2급: 핸드팬의 주요 스케일과 테크닉을 숙달한 전문가</p>
                <p>3급: 핸드팬의 기본 스케일과 테크닉을 이해한 전문가</p>
                <div class="exam-button-container">
                    <button class="exam-button" onclick="examView()">필기시험 접수</button>
                </div>
            </div>
        </div>
    `;
}

function mainView() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <header>
            <h1><span class="title-emoji">🏫</span> 핸드팬 아카데미</h1>
        </header>
        <div class="button-container">
            <button class="main-button" onclick="navigateTo('/curriculum')">기초과정 학습과목</button>
            <div class="divider"></div>
            <button class="main-button" onclick="navigateTo('/certification')">강사 자격증</button>
            <button class="main-button" onclick="navigateTo('/teachers')">강사 라인업</button>
            <button class="main-button" onclick="navigateTo('/dictionary')">스케일 사전</button>
            <button class="main-button empty-button">커뮤니티 (준비중)</button>
        </div>
    `;
} 