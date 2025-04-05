// 캐시 이름 설정
const CACHE_NAME = 'handpan-academy-cache-v2';

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
    self.skipWaiting(); // 즉시 활성화
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', (event) => {
    // 이전 캐시 삭제
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        }).then(() => {
            console.log('이전 캐시가 모두 제거되었습니다.');
            return clients.claim(); // 모든 클라이언트에 대한 제어권 획득
        })
    );
});

// 네트워크 요청 이벤트
self.addEventListener('fetch', (event) => {
    // 기본 동작을 유지 (네트워크 우선)
    event.respondWith(
        fetch(event.request).catch(() => {
            // 네트워크 실패시 캐시에서 응답 시도 (선택적)
            return caches.match(event.request);
        })
    );
}); 