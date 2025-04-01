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
        '/curriculum': curriculumView
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
                <h1>아카데미 서비스</h1>
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
                    <p class="auth-description">카카오톡으로 간편하게 본인인증을 진행해주세요.</p>
                    <p class="auth-sub-description">인증에 실패한 경우 뒤로가기를 눌러,<br>홈으로 돌아갈 수 있습니다.</p>
                    <button class="kakao-button" onclick="kakaoAuth()">
                        <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png" alt="카카오톡 로고">
                        카카오톡으로 시작하기
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
                    <button class="main-button" onclick="location.href='#'">
                        스케일 사전
                    </button>
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
                <button class="certification-exam-button" onclick="navigateTo('/auth')">
                    필기시험 접수
                </button>
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
                            <button class="grid-item contact" onclick="window.location.href='tel:+821089679204'">전화연결</button>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">김문겸</div>
                            <div class="grid-item age">40대 남성</div>
                            <div class="grid-item target">학생, 성인</div>
                            <div class="grid-item job">국악 연주자</div>
                            <div class="grid-item location">강원도 강릉</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/ansrua84/', '_blank')">인스타그램</button>
                            <button class="grid-item contact" onclick="window.location.href='tel:+821029388815'">전화연결</button>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">미지수</div>
                            <div class="grid-item age">30대 여성</div>
                            <div class="grid-item target">학생, 성인</div>
                            <div class="grid-item job">아티스트</div>
                            <div class="grid-item location">서울 연남동</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/bambispring_/', '_blank')">인스타그램</button>
                            <button class="grid-item contact" onclick="window.location.href='tel:+821090830022'">전화연결</button>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">안재민</div>
                            <div class="grid-item age">30대 남성</div>
                            <div class="grid-item target">학생, 성인</div>
                            <div class="grid-item job">배우 겸 연주자</div>
                            <div class="grid-item location">서울 성북</div>
                            <div class="grid-item class-type">1:1</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/artist__jmin/', '_blank')">인스타그램</button>
                            <button class="grid-item contact" onclick="window.location.href='tel:+821072297450'">전화연결</button>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">이시온</div>
                            <div class="grid-item age">40대 남성</div>
                            <div class="grid-item target">학생, 성인</div>
                            <div class="grid-item job">명상 음악가</div>
                            <div class="grid-item location">서울 건대입구</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/sion.handpan/', '_blank')">인스타그램</button>
                            <button class="grid-item contact" onclick="window.location.href='tel:+821044454689'">전화연결</button>
                        </div>
                    </div>
                    <div class="teacher-card">
                        <div class="teacher-grid">
                            <div class="grid-item name">이지은</div>
                            <div class="grid-item age">30대 여성</div>
                            <div class="grid-item target">아이, 학생, 성인</div>
                            <div class="grid-item job">음악치료사</div>
                            <div class="grid-item location">서울 서대문구</div>
                            <div class="grid-item class-type">1:1, 소그룹</div>
                            <button class="grid-item social" onclick="window.open('https://www.instagram.com/warmwaves_therapy/', '_blank')">인스타그램</button>
                            <button class="grid-item contact" onclick="window.location.href='tel:+821045299038'">전화연결</button>
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
                            <button class="grid-item contact" onclick="window.location.href='tel:+821031270691'">전화연결</button>
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
            <header>
                <h1>커리큘럼</h1>
            </header>
            <main>
                <div class="curriculum-container">
                    <div class="curriculum-card">
                        <h2 class="level-title">입문자</h2>
                        <div class="level-content">
                            <div class="level-section">
                                <h3>필요 역량</h3>
                                <p>핸드팬에 대한 호기심과 열정</p>
                                <p>기본적인 리듬감과 음악성</p>
                            </div>
                            <div class="level-section">
                                <h3>가능한 역할</h3>
                                <p>개인 연습 및 취미 연주</p>
                                <p>기초 리듬 패턴 습득</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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