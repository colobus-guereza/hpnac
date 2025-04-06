// 캐시 이름 설정
const CACHE_NAME = 'handpan-academy-cache-v5';

// 미리 캐싱할 핵심 리소스 목록
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/script.js',
    '/styles.css',
    '/manifest.json',
    // 핵심 이미지 파일들 (새로운 WebP 파일 포함)
    '/images/theme/light-mode.webp',
    '/images/theme/dark-mode.webp',
    '/images/map/korea-map.svg',
    '/images/splash/splash-logo.webp',
    '/images/splash/splash-logo.png',
    '/images/certi.webp',
    '/images/optimized/kakao-optimized.png'
];

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
    console.log('서비스 워커 설치 중...');

    // 핵심 리소스 미리 캐싱
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('핵심 리소스 캐싱 중...');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('핵심 리소스 캐싱 완료');
                return self.skipWaiting(); // 즉시 활성화
            })
    );
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', (event) => {
    console.log('서비스 워커 활성화 중...');

    // 이전 캐시 삭제
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log(`이전 캐시 삭제: ${name}`);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('이전 캐시가 모두 제거되었습니다.');
            return clients.claim(); // 모든 클라이언트에 대한 제어권 획득
        })
    );
});

// 네트워크 요청 이벤트
self.addEventListener('fetch', (event) => {
    // 이미지 파일에 대한 요청인지 확인
    const isImage = event.request.url.match(/\.(webp|png|jpe?g|svg|gif)$/i);

    // 이미지 파일이면 캐시 우선 전략 사용
    if (isImage) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                // 캐시에 있으면 캐시에서 제공
                if (cachedResponse) {
                    return cachedResponse;
                }

                // 캐시에 없으면 네트워크 요청
                return fetch(event.request).then(networkResponse => {
                    // 요청이 성공하고 유효한 상태 코드인 경우에만 캐시
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }

                    // 응답을 복제 (스트림은 한 번만 사용 가능)
                    const responseToCache = networkResponse.clone();

                    // 캐시에 저장
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                        console.log('이미지 캐싱 완료:', event.request.url);
                    });

                    return networkResponse;
                });
            })
        );
    } else {
        // 이미지가 아닌 경우 네트워크 우선 전략 사용 (캐시 폴백)
        event.respondWith(
            fetch(event.request).catch(() => {
                console.log('네트워크 요청 실패, 캐시에서 시도:', event.request.url);
                return caches.match(event.request);
            })
        );
    }
}); 