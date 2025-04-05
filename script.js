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
    const isDarkTime = hour >= 18 || hour < 6; // 오후 6시부터 오전 6시까지 다크모드

    // 항상 시간에 따라 테마 설정 (로컬 스토리지 확인 없음)
    document.body.classList.toggle('dark-theme', isDarkTime);
    console.log(`시간대에 따른 테마 설정: ${hour}시, 다크모드=${isDarkTime}`);

    // 테마 변경 시 아이콘 업데이트
    updateThemeIcon();
}

// 테마 아이콘 업데이트 함수
function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        // 현재 테마에 따라 이미지 소스 설정
        themeIcon.src = document.body.classList.contains('dark-theme')
            ? 'images/theme/light-mode.png'
            : 'images/theme/dark-mode.png';
    }
}

// 테마 토글 함수 - 실제로는 테마를 변경하지 않고 아이콘만 변경
function toggleTheme() {
    // 테마는 변경하지 않음 (아무런 효과 없음)
    // 아이콘만 시각적으로 토글 (보여주기 효과)
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        const isDarkMode = document.body.classList.contains('dark-theme');
        themeIcon.src = isDarkMode
            ? 'images/theme/dark-mode.png'
            : 'images/theme/light-mode.png';

        // 1초 후 다시 원래 아이콘으로 되돌림
        setTimeout(() => {
            themeIcon.src = isDarkMode
                ? 'images/theme/light-mode.png'
                : 'images/theme/dark-mode.png';
        }, 1000);
    }
}

// 1분마다 테마 체크
function initThemeChecker() {
    // 시간에 따라 테마 설정 (로컬 스토리지 체크 없음)
    setThemeByTime();

    // 1분마다 시간대에 따른 테마 체크
    setInterval(setThemeByTime, 60000);
}

// 앱 초기화 함수 수정
function initializeApp() {
    initThemeChecker(); // 테마 체커 초기화
    showLoadingScreen();
    setTimeout(() => {
        const loadingContainer = document.querySelector('.loading-container');
        if (loadingContainer) {
            loadingContainer.classList.add('fade-out');
        }
        setTimeout(() => {
            mainView();
        }, 500);
    }, 1500);
}

// 실제 뷰포트 높이 설정 함수
function setViewportHeight() {
    // 실제 뷰포트 높이의 1% 계산
    let vh = window.innerHeight * 0.01;
    // CSS 변수로 설정
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // PWA 모드 감지
    const isPWA = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isPWA) {
        // PWA 모드일 때 body와 html에 클래스 추가
        document.documentElement.classList.add('pwa-mode');
        document.body.classList.add('pwa-mode');

        // iOS의 경우 추가 설정
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            // 컨테이너와 body의 배경색을 완전히 일치시킴
            document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--container-bg');

            // 뒤로가기 버튼과 테마 토글 버튼에 safe area 여백 추가
            const backButton = document.querySelector('.back-button');
            const themeToggle = document.querySelector('.theme-toggle');

            if (backButton) {
                // iOS에서 뒤로가기 버튼 위치 추가 조정
                backButton.style.top = '40px'; // 더 높게 설정하여 가려지지 않도록
                backButton.style.marginTop = 'env(safe-area-inset-top)'; // Safe area 고려
            }

            if (themeToggle) {
                // iOS에서 테마 버튼 위치 추가 조정
                themeToggle.style.top = '40px'; // 더 높게 설정하여 가려지지 않도록
                themeToggle.style.marginTop = 'env(safe-area-inset-top)'; // Safe area 고려
            }

            // 컨테이너 패딩 수정
            const container = document.querySelector('.container');
            if (container) {
                container.style.paddingTop = 'calc(env(safe-area-inset-top) + 50px)';
            }
        }

        // 컨테이너 높이를 뷰포트에 맞춤
        const container = document.querySelector('.container');
        if (container) {
            container.style.height = `${window.innerHeight}px`;
            container.style.minHeight = `${window.innerHeight}px`;
            container.style.maxHeight = `${window.innerHeight}px`;

            // 컨테이너의 배경색도 동일하게 유지
            container.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--container-bg');
        }
    }
}

// 초기화 함수
document.addEventListener('DOMContentLoaded', function () {
    // URL 라우팅 설정
    setupRouting();

    // 뷰포트 높이 초기 설정
    setViewportHeight();

    // 창 크기 변경 시 업데이트
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // 페이지 로드 시 현재 시간에 따른 테마 즉시 설정
    setThemeByTime();
});

document.addEventListener('DOMContentLoaded', () => {
    // 카카오 SDK 초기화 실행
    initializeKakao();

    // 뷰포트 높이 설정
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // 테마 체커 초기화 및 테마 토글 버튼 추가
    initThemeChecker();

    // 라우팅 처리
    const routes = {
        '/': homeView,
        '/auth': authView,
        '/education': educationView,
        '/certification': certificationView,
        '/teachers': teachersView,
        '/video-lessons': videoLessonsView,
        '/curriculum': curriculumView,
        '/faq': faqView,
        '/teacher/hongdae': () => teacherProfileView('홍대'),
        '/teacher/seodaemun': () => teacherProfileView('서대문'),
        '/teacher/seongbuk': () => teacherProfileView('성북'),
        '/teacher/konkuk': () => teacherProfileView('건대입구'),
        '/teacher/gangneung': () => teacherProfileView('강릉'),
        // '/scale-dictionary': scaleDictionaryView  // 임시 비활성화
    };

    // 현재 URL에 따른 뷰 렌더링
    function renderView() {
        const path = window.location.pathname;
        const view = routes[path] || homeView;
        view();

        if (path === '/') {
            // 홈 화면에서만 지도 초기화 - 지연 없이 즉시 실행
            initMap();
        }

        // 현재 시간에 따른 테마 설정 적용
        setThemeByTime();
    }

    // 지역 위치 데이터
    const locationData = [
        { name: "홍대", x: 100, y: 80, link: "/teacher/hongdae" },
        { name: "서대문", x: 180, y: 140, link: "/teacher/seodaemun" },
        { name: "성북", x: 280, y: 90, link: "/teacher/seongbuk" },
        { name: "건대입구", x: 380, y: 160, link: "/teacher/konkuk" },
        { name: "강릉", x: 500, y: 120, link: "/teacher/gangneung" }
    ];

    // 지도 초기화 함수
    function initMap() {
        const mapContainer = document.getElementById('location-map');
        if (!mapContainer) return;

        // 기존 포인트 삭제
        const existingPoints = mapContainer.querySelectorAll('.location-point');
        existingPoints.forEach(point => point.remove());

        // 이벤트 위임을 위한 이벤트 리스너
        mapContainer.addEventListener('click', (e) => {
            // 클릭된 요소 또는 그 부모 중 .location-point 클래스를 가진 요소 찾기
            let targetElement = e.target;
            // 클릭된 요소가 가상 요소(::after)인 경우 부모(포인터)를 찾음
            let pointElement = targetElement.closest('.location-point');

            if (pointElement) {
                const locationName = pointElement.dataset.name;
                const location = locationData.find(item => item.name === locationName);
                if (location) {
                    navigateTo(location.link);
                }
            }
        });

        // 새 포인트 생성
        locationData.forEach(location => {
            const point = document.createElement('div');
            point.className = 'location-point';
            point.dataset.name = location.name;
            point.style.left = `${location.x}px`;
            point.style.top = `${location.y}px`;

            mapContainer.appendChild(point);
        });

        // 화면 크기에 따라 지도 위치 조정 (반응형)
        const adjustMapPoints = () => {
            const mapWidth = mapContainer.offsetWidth;
            const scaleRatio = mapWidth / 600; // SVG 기본 너비 기준

            const points = mapContainer.querySelectorAll('.location-point');
            points.forEach(point => {
                const locationName = point.dataset.name;
                const location = locationData.find(item => item.name === locationName);
                if (location) {
                    point.style.left = `${location.x * scaleRatio}px`;
                    point.style.top = `${location.y * scaleRatio}px`;
                }
            });
        };

        // 초기 조정 및 창 크기 변경 시 조정
        adjustMapPoints();
        window.addEventListener('resize', adjustMapPoints);

        // PC 웹에서 안정성 향상을 위해 한 번 더 실행 (지연 없이)
        adjustMapPoints();

        // 지도 크기 설정 - 지도 초기화 직후 즉시 설정
        setMapContainerSize();
    }

    // 지도 컨테이너 크기 설정 전역 함수
    function setMapContainerSize() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            // 기존 스타일을 유지하면서 특정 속성만 덮어쓰는 방식으로 수정
            const existingStyles = mapContainer.getAttribute('style') || '';
            const styles = existingStyles.split(';').filter(style =>
                !style.includes('height') &&
                !style.includes('min-height') &&
                !style.includes('max-height') &&
                style.trim() !== ''
            ).join(';');

            // 새로운 스타일 설정 (기존 스타일 유지 + 크기 속성 추가)
            const newStyles = `${styles}; height: 190px !important; min-height: 190px !important; max-height: 190px !important;`;
            mapContainer.setAttribute('style', newStyles);

            // 내부 요소들의 가시성 확인
            const mapBackground = document.getElementById('location-map');
            if (mapBackground) {
                mapBackground.style.visibility = 'visible';
                mapBackground.style.display = 'block';
                mapBackground.style.position = 'relative';
                mapBackground.style.height = 'calc(100% - 38px)';
            }
        }
    }

    // 홈 화면 뷰
    function homeView() {
        document.querySelector('.container').innerHTML = `
            <div class="content-wrapper" style="width: 100%; max-width: 100%;">
                <header class="hidden-header">
                    <!-- 타이틀 제거 -->
                </header>
                <div class="profile-icon-container">
                    <img src="images/theme/${document.body.classList.contains('dark-theme') ? 'light-mode.png' : 'dark-mode.png'}" alt="프로필" class="profile-icon">
                </div>
                <div class="map-brand">Snd Handpan Academy</div>
                <div class="map-container" style="height: 190px; min-height: 190px; max-height: 190px; margin-bottom: 20px;">
                    <div class="map-title">레슨예약 & 공연문의</div>
                    <div class="map-background" id="location-map"></div>
                </div>
                <main style="width: 100%; max-width: 100%; padding-top: 10px;">
                    <div class="button-container" style="width: 100%; max-width: 100%; margin-top: 20px;">
                        <!-- 그룹수업 신청 버튼 제거 -->
                        <button class="main-button button-3" style="width: 100%; max-width: 100%;" onclick="navigateTo('/certification')">
                            핸드팬강사 자격증
                        </button>
                        <button class="main-button button-4" style="width: 100%; max-width: 100%;" onclick="navigateTo('/education')">
                            교육자료
                        </button>
                        <div class="horizontal-buttons" style="width: 100%; max-width: 100%;">
                            <button class="main-button button-5" style="width: 50%; max-width: 50%;" onclick="window.open('http://qr.kakao.com/talk/eaCVDVzuz5Z7kqRWulpewF1ix7M-', '_blank')">
                                카톡문의
                            </button>
                            <button class="main-button button-6" style="width: 50%; max-width: 50%;" onclick="window.location.href='tel:+821089679204'">
                                전화상담
                            </button>
                        </div>
                        <button class="main-button empty-button button-7" style="width: 100%; max-width: 100%;" onclick="toggleAppDownloadPopup()">
                            앱 다운로드
                        </button>
                    </div>
                </main>
                <div class="popup-overlay" onclick="toggleAppDownloadPopup()">
                    <img src="images/appdown.png" alt="앱 다운로드 QR코드" class="popup-image" onclick="event.stopPropagation()">
                </div>
            </div>
        `;

        // 홈 화면에서 스크롤 비활성화
        document.body.classList.add('no-scroll-home');

        // 모든 환경에서 mobile-view 클래스 추가
        document.body.classList.add('mobile-view');

        // 버튼 너비 즉시 적용
        const buttons = document.querySelectorAll('.main-button');
        buttons.forEach(button => {
            button.style.width = '100%';
            button.style.maxWidth = '100%';
        });

        const horizontalButtons = document.querySelectorAll('.horizontal-buttons .main-button');
        horizontalButtons.forEach(button => {
            button.style.width = '50%';
            button.style.maxWidth = '50%';
        });

        document.querySelector('.button-container').style.width = '100%';
        document.querySelector('.button-container').style.maxWidth = '100%';
        document.querySelector('.content-wrapper').style.width = '100%';
        document.querySelector('.content-wrapper').style.maxWidth = '100%';
    }

    // 인증 화면 뷰
    function authView() {
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

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
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <header>
                <h1>교육자료</h1>
            </header>
            <main>
                <div class="button-container">
                    <button class="main-button button-1" onclick="navigateTo('/faq')">
                        자주묻는질문
                    </button>
                    <button class="main-button button-2" onclick="navigateTo('/curriculum')">
                        커리큘럼
                    </button>
                    <button class="main-button button-3" onclick="navigateTo('/video-lessons')">
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

    // 자주묻는질문 페이지 뷰
    function faqView() {
        // 자주묻는질문 페이지에서는 스크롤 비활성화로 변경
        document.body.classList.add('no-scroll-home');

        // FAQ 항목을 배열로 관리 - 필요에 따라 여기서 항목을 추가, 수정, 삭제할 수 있습니다
        const faqItems = [
            {
                question: "핸드팬은 어떤 악기인가요?",
                answer: "핸드팬은 누구나 손으로 두드리는 것만으로도 깊고 따뜻한 울림을 느낄 수 있는, 직관적인 소리명상 도구입니다. 복잡한 음악지식이 없어도 내 감정과 호흡에 따라 자연스럽게 연주할 수 있어, 처음 접하시는 분들도 편안하게 즐기실 수 있습니다. 마음을 가라앉히는 웰니스부터 리듬감 있는 표현까지, 일상의 다양한 순간에 어울리는 포근한 악기입니다."
            },
            {
                question: "그럼 음악을 전공하셨거나, 작곡이나 연주 활동에 활용하고 싶으신 분들에게도 어울릴까요?",
                answer: "물론입니다. 핸드팬은 멜로디, 화음, 리듬을 모두 표현할 수 있어 단독 연주뿐 아니라 작·편곡, 세션, 공연 등 다양한 음악 작업에 유연하게 쓰일 수 있는 악기입니다. 소리 하나하나가 섬세하고 풍부해서 자신만의 감성을 표현하기 좋습니다."
            },
            {
                question: "핸드팬을 배우기 위한 사전 지식이 필요한가요?",
                answer: "핸드팬은 사전 음악지식과 경험 없이도 시작할 수 있는 직관적인 악기입니다. 때문에 비전공자, 취미생들도 쉽게 배울 수 있습니다. 또한 전문 핸드팬 연주자가 아니더라도, 심리상담과 요가명상 등 관련 분야의 전문가들이 많이 활용하고 계십니다."
            },
            {
                question: "핸드팬강사 자격증은 어떻게 취득하나요?",
                answer: "핸드팬강사 자격증은 필기시험과 실기시험을 통과해야 취득할 수 있습니다. 필기시험은 '핸드팬에 대한 이해도', '전문성', '강사로서의 마음가짐'을 평가하고, 실기시험은 '연주능력'과 '교육능력'을 평가합니다. 자격증을 취득한 강사분들께서는 현업에서 활동하고 계십니다."
            },
            {
                question: "레슨은 어떻게 신청할 수 있나요?",
                answer: "홈페이지의 지도에서 원하는 지역을 선택하면 해당 지역 강사프로필 페이지로 이동합니다. 각 강사별 연락처를 통해 직접 문의하시거나, 홈페이지 하단의 '카톡문의' 또는 '전화상담' 버튼을 이용해 문의하실 수 있습니다."
            },
            {
                question: "악기가 없어도 배울 수 있나요?",
                answer: "그럼요. 지점들 마다 여러 스케일의 악기가 비치되어 있기 때문에, 처음에는 악기가 없어도 충분히 배우실 수 있습니다. 이후 원하실 때, 악기 제작자가 직접 악기 선택과 구매도 함께 도와드립니다."
            },
            // 필요한 경우 여기에 새 FAQ 항목을 추가하세요
            // {
            //     question: "새로운 질문",
            //     answer: "새로운 답변"
            // },
        ];

        // FAQ 슬라이드 HTML 생성
        const faqSlidesHtml = faqItems.map((item, index) => `
            <div class="slide">
                <div class="faq-item">
                    <div class="faq-counter">${index + 1}/${faqItems.length}</div>
                    <h3 class="faq-question">${item.question}</h3>
                    <p class="faq-answer">${item.answer}</p>
                </div>
            </div>
        `).join('');

        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/education')">
                <span class="back-arrow">←</span>
            </button>
            <main>
                <div class="certification-container">
                    <div class="certification-slider faq-slider">
                        ${faqSlidesHtml}
                    </div>
                    <div class="slider-controls">
                        <button class="slider-button prev" onclick="showFaqSlide(currentFaqSlide - 1)">←</button>
                        <button class="slider-button next" onclick="showFaqSlide(currentFaqSlide + 1)">→</button>
                    </div>
                </div>
            </main>
        `;

        initializeFaqSlider();
    }

    // FAQ 슬라이더 초기화 함수
    function initializeFaqSlider() {
        window.currentFaqSlide = 0;
        const slider = document.querySelector('.faq-slider');
        const slides = document.querySelectorAll('.faq-slider .slide');
        const prevButton = document.querySelector('.faq-slider ~ .slider-controls .slider-button.prev');
        const nextButton = document.querySelector('.faq-slider ~ .slider-controls .slider-button.next');

        if (!slider || !slides.length) return;

        window.showFaqSlide = function (index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentFaqSlide = index;
            const offset = -100 * index;
            slider.style.transform = `translateX(${offset}%)`;

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
                    showFaqSlide(currentFaqSlide + 1);
                } else {
                    showFaqSlide(currentFaqSlide - 1);
                }
            }
        });

        // 초기 슬라이드 표시
        showFaqSlide(0);
    }

    // 동영상 레슨 페이지 뷰
    function videoLessonsView() {
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

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
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <div class="certification-container">
                <div class="certification-slider">
                    <div class="slide">
                        <div class="certification-info">
                            <p class="certification-title">자격명: 핸드팬강사</p>
                            <p class="certification-issuer">발급기관: 사운드앤디자인(SND)</p>
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
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

        const activeTeachers = [
            {
                name: '이헌국',
                age: '30대 남성',
                target: '성인',
                job: '원장',
                location: '서울 홍대',
                classType: '대중강연, 세미나',
                social: 'https://www.instagram.com/snd_handpan_academy/'
            },
            {
                name: '이시온',
                age: '40대 남성',
                target: '청소년, 성인',
                job: '명상 음악가',
                location: '서울 건대입구',
                classType: '1:1, 소그룹',
                social: 'https://www.instagram.com/sion.handpan/'
            },
            {
                name: '이지은',
                age: '30대 여성',
                target: '아동, 청소년, 성인',
                job: '음악치료사 & 명상심리상담',
                location: '서울 서대문구',
                classType: '1:1, 소그룹',
                social: 'https://www.instagram.com/warmwaves_therapy/',
                phone: '+821045299038'
            }
        ];

        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <main>
                <div class="teachers-container">
                    ${activeTeachers.map(teacher => `
                        <div class="teacher-card">
                            <div class="teacher-grid">
                                <div class="grid-item name">${teacher.name}</div>
                                <div class="grid-item age">${teacher.age}</div>
                                <div class="grid-item target">${teacher.target}</div>
                                <div class="grid-item job">${teacher.job}</div>
                                <div class="grid-item location">${teacher.location}</div>
                                <div class="grid-item class-type">${teacher.classType}</div>
                                <button class="grid-item social" onclick="window.open('${teacher.social}', '_blank')"><i class="fab fa-instagram"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </main>
        `;
    }

    // 커리큘럼 페이지 뷰
    function curriculumView() {
        // 커리큘럼 페이지에서는 스크롤 비활성화로 변경
        document.body.classList.add('no-scroll-home');

        // 기존 container 요소 선택
        const container = document.querySelector('.container');

        // 커리큘럼 페이지 클래스 추가
        container.classList.add('curriculum-page');

        container.innerHTML = `
            <button class="back-button" onclick="navigateTo('/education')">
                <span class="back-arrow">←</span>
            </button>
            <main style="flex: 1; display: flex; flex-direction: column;">
                <p class="curriculum-subtitle">기초과정 학습과목</p>
                <div class="certification-container">
                    <div class="certification-slider curriculum-slider">
                        <div class="slide">
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
                        </div>
                        <div class="slide">
                            <div class="curriculum-card">
                                <h2 class="level-title">2. 리듬</h2>
                                <ul class="curriculum-list">
                                    <li>4박자 기본리듬</li>
                                    <li>6박자 기본리듬</li>
                                    <li>리듬 쪼개기</li>
                                    <li class="small-text">하이햇으로 그루브 만들기</li>
                                    <li>Odd Meter 확장</li>
                                    <li>나만의 리듬 만들기</li>
                                </ul>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="curriculum-card">
                                <h2 class="level-title">3. 테크닉</h2>
                                <ul class="curriculum-list">
                                    <li>손가락 트레이닝</li>
                                    <li>아르페지오</li>
                                    <li class="small-text">리듬화음멜로디 동시연주</li>
                                    <li>롤 Roll</li>
                                    <li>음색 확장</li>
                                    <li class="small-text">핸드팬 듀오 플레이: 캐슬링</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="slider-controls">
                        <button class="slider-button prev" onclick="showCurriculumSlide(currentCurriculumSlide - 1)">←</button>
                        <button class="slider-button next" onclick="showCurriculumSlide(currentCurriculumSlide + 1)">→</button>
                    </div>
                </div>
            </main>
        `;
        initializeCurriculumSlider();
    }

    // 커리큘럼 슬라이더 초기화 함수
    function initializeCurriculumSlider() {
        window.currentCurriculumSlide = 0;
        const slider = document.querySelector('.curriculum-slider');
        const slides = document.querySelectorAll('.curriculum-slider .slide');
        const prevButton = document.querySelector('.curriculum-slider ~ .slider-controls .slider-button.prev');
        const nextButton = document.querySelector('.curriculum-slider ~ .slider-controls .slider-button.next');

        if (!slider || !slides.length) return;

        window.showCurriculumSlide = function (index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentCurriculumSlide = index;
            const offset = -100 * index;
            slider.style.transform = `translateX(${offset}%)`;

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
                    showCurriculumSlide(currentCurriculumSlide + 1);
                } else {
                    showCurriculumSlide(currentCurriculumSlide - 1);
                }
            }
        });

        // 초기 슬라이드 표시
        showCurriculumSlide(0);
    }

    // 스케일 사전 페이지 뷰
    function scaleDictionaryView() {
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

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

    // 선생님 정보 조회 함수
    function getTeacherInfo(location) {
        // 지역별 선생님 정보
        const teacherInfoMap = {
            '홍대': {
                name: '이헌국',
                age: '30대 남성',
                target: '성인',
                job: '원장',
                location: '서울 홍대',
                classType: '대중강연, 세미나',
                social: 'https://www.instagram.com/snd_handpan_academy/',
                phone: '+821089679204'
            },
            '서대문': {
                name: '이지은',
                age: '30대 여성',
                target: '아동, 청소년, 성인',
                job: '음악치료사 & 명상심리상담',
                location: '서울 서대문구',
                classType: '1:1, 소그룹',
                social: 'https://www.instagram.com/warmwaves_therapy/',
                phone: '+821045299038'
            },
            '성북': {
                name: '안재민',
                age: '30대 남성',
                target: '청소년, 성인',
                job: '배우 & 연주자',
                location: '서울 성북구',
                classType: '1:1, 소그룹',
                social: 'https://www.instagram.com/artist__jmin/',
                phone: '+821072297450'
            },
            '건대입구': {
                name: '이시온',
                age: '50대 남성',
                target: '청소년, 성인',
                job: '마고사운드 명상음악가',
                location: '서울 건대입구',
                classType: '1:1, 소그룹',
                social: 'https://www.instagram.com/sion.handpan/',
                phone: '+821044454689'
            },
            '강릉': {
                name: '김문겸',
                age: '40대 남성',
                target: '청소년, 성인',
                job: '국악 연주자',
                location: '강원도 강릉',
                classType: '1:1, 소그룹',
                social: 'https://www.instagram.com/ansrua84/',
                phone: '+821029388815'
            }
        };

        return teacherInfoMap[location] || {
            name: '담당 강사',
            age: '미정',
            target: '전 연령',
            job: '핸드팬 강사',
            location: '미정',
            classType: '미정',
            social: 'https://www.instagram.com/snd_handpan_academy/',
            phone: '+821089679204'
        };
    }

    // 선생님 프로필 뷰
    function teacherProfileView(location) {
        // 스크롤 비활성화 (FAQ와 커리큘럼 페이지만 스크롤 활성화)
        document.body.classList.add('no-scroll-home');

        const teacherInfo = getTeacherInfo(location);

        // 홍대 지점 버튼 텍스트 설정 및 버튼 표시 여부 결정
        let buttonText = '수업 신청하기';
        let buttonClass = 'main-button';
        let buttonFontSize = '';
        let showButton = location === '홍대'; // 홍대 지점만 버튼을 표시

        if (location === '홍대') {
            buttonText = '4/6, 20(일) 오후2시 그룹레슨 신청';
            buttonClass = 'main-button hongdae-lesson-btn';
            buttonFontSize = ''; // CSS 파일에서 설정된 크기를 사용
        }

        document.querySelector('.container').innerHTML = `
            <button class="back-button" onclick="navigateTo('/')">
                <span class="back-arrow">←</span>
            </button>
            <main>
                <div class="profile-card">
                    <div class="profile-header">
                        <h2 class="profile-name">${teacherInfo.name} 선생님</h2>
                        <p class="profile-job">${teacherInfo.job}</p>
                    </div>
                    <div class="profile-details">
                        <div class="profile-item">
                            <span class="profile-label">위치</span>
                            <span class="profile-value">${teacherInfo.location}</span>
                        </div>
                        <div class="profile-item">
                            <span class="profile-label">연령대</span>
                            <span class="profile-value">${teacherInfo.age}</span>
                        </div>
                        <div class="profile-item">
                            <span class="profile-label">수업 형태</span>
                            <span class="profile-value">${teacherInfo.classType}</span>
                        </div>
                        <div class="profile-item">
                            <span class="profile-label">수업 대상</span>
                            <span class="profile-value">${teacherInfo.target}</span>
                        </div>
                    </div>
                </div>
                
                <!-- 새로운 문의 & 섭외 카드 -->
                <div class="profile-card contact-card">
                    <div class="profile-header">
                        <h3 class="profile-section-title">문의 & 섭외</h3>
                    </div>
                    <div class="profile-actions">
                        <button class="profile-action instagram" onclick="window.open('${teacherInfo.social}')">
                            <i class="fab fa-instagram"></i>
                        </button>
                        <button class="profile-action phone" onclick="window.location.href='tel:${teacherInfo.phone}'">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button class="profile-action message" onclick="window.location.href='sms:${teacherInfo.phone}'">
                            <i class="fas fa-sms"></i>
                        </button>
                    </div>
                </div>
                
                ${showButton ? `
                <div class="button-container" style="margin-top: 20px;">
                    <button class="${buttonClass}" style="${buttonFontSize}" onclick="window.open('https://forms.gle/4Fcb5S3KtwKYYejA9', '_blank')">
                        ${buttonText}
                    </button>
                </div>
                ` : ''}
            </main>
        `;
    }

    // 페이지 이동 함수
    window.navigateTo = function (route) {
        const container = document.querySelector('.container');

        // 모든 페이지 전환 시 스크롤 위치 초기화
        window.scrollTo(0, 0);

        // 특수 페이지 클래스 제거
        container.classList.remove('curriculum-page');

        // 홈 화면으로 돌아갈 때 특별 처리
        if (route === '/') {
            // 기존 설정된 인라인 스타일 초기화
            container.removeAttribute('style');

            // PWA 모드 확인 및 컨테이너 스타일 재설정
            const isPWA = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
            if (isPWA) {
                container.style.height = `${window.innerHeight}px`;
                container.style.minHeight = `${window.innerHeight}px`;
                container.style.maxHeight = `${window.innerHeight}px`;
                container.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--container-bg');
            }

            // 홈 화면을 위한 클래스 추가 전에 모든 이전 상태 클래스 초기화
            document.body.classList.remove('no-scroll-home');
            document.body.classList.remove('mobile-view');

            // 기존 스크롤 위치 초기화
            container.scrollTop = 0;

            // 뷰포트 높이 재설정
            setViewportHeight();
        } else {
            // 홈 화면이 아닌 다른 페이지로 이동할 때는 mobile-view 제거
            document.body.classList.remove('mobile-view');
        }

        // 브라우저 히스토리 업데이트
        window.history.pushState({}, '', route);

        // renderView 함수를 통해 라우팅 처리
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

// 스플래시 스크린 표시 함수
function showLoadingScreen() {
    // 이미 로딩 컨테이너가 있으면 제거
    const existingContainer = document.querySelector('.loading-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // 로딩 컨테이너 생성
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';

    // 로고 이미지 추가
    const logoImg = document.createElement('img');
    logoImg.src = 'images/splash-logo.png'; // 경로 수정: 루트 이미지 디렉토리에서 로드
    logoImg.alt = '핸드팬 레슨예약';
    logoImg.className = 'splash-logo';

    // 이미지 로드 상태 확인
    logoImg.onload = function () {
        console.log('스플래시 이미지 로드 성공');
    };

    logoImg.onerror = function () {
        console.error('스플래시 이미지 로드 실패');
        // 이미지 로드 실패 시 대체 이미지 표시
        logoImg.src = 'images/theme/light-mode.png';
    };

    loadingContainer.appendChild(logoImg);
    document.body.appendChild(loadingContainer);

    console.log('스플래시 화면 생성됨, 이미지 경로:', logoImg.src);
} 