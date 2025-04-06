const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

// webp-converter 2.x.x 버전은 다음과 같이 초기화해야 합니다
webp.grant_permission();

// 변환할 이미지 목록
const imagesToConvert = [
    { src: 'images/appdown.png', dest: 'images/appdown.webp', quality: 80 },
    { src: 'images/icons/icon-512x512.png', dest: 'images/icons/icon-512x512.webp', quality: 80 },
    { src: 'images/splash/splash-logo.png', dest: 'images/splash/splash-logo.webp', quality: 85 },
    { src: 'images/splash-logo.png', dest: 'images/splash-logo.webp', quality: 85 },
    { src: 'images/certi.png', dest: 'images/certi.webp', quality: 85 },
    { src: 'images/theme/light-mode.png', dest: 'images/theme/light-mode.webp', quality: 90 },
    { src: 'images/theme/dark-mode.png', dest: 'images/theme/dark-mode.webp', quality: 90 },
    { src: 'images/icons/icon-192x192.png', dest: 'images/icons/icon-192x192.webp', quality: 90 },
    { src: 'images/icons/apple-touch-icon.png', dest: 'images/icons/apple-touch-icon.webp', quality: 90 },
];

// 디렉토리 확인 및 생성 함수
function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
}

// 이미지 변환 함수
async function convertImages() {
    console.log('이미지 변환 시작...');

    for (const image of imagesToConvert) {
        try {
            // 대상 디렉토리 확인
            ensureDirectoryExists(image.dest);

            // PNG/JPG에서 WebP로 변환
            console.log(`변환 중: ${image.src} → ${image.dest}`);
            await webp.cwebp(image.src, image.dest, `-q ${image.quality}`);

            // 파일 크기 확인
            const originalSize = fs.statSync(image.src).size;
            const webpSize = fs.statSync(image.dest).size;
            const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);

            console.log(`${path.basename(image.src)}: ${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${savings}% 축소)`);
        } catch (error) {
            console.error(`${image.src} 변환 실패:`, error);
        }
    }

    console.log('이미지 변환 완료');
}

// 변환 실행
convertImages().catch(err => {
    console.error('오류 발생:', err);
}); 