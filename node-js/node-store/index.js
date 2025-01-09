// index.js
const express = require('express');
const path = require('path'); // 경로 조작을 위한 모듈
const connectDB = require('./db');
const productRoutes = require('./routes/product');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public'))); // public 폴더의 파일을 정적 파일로 제공

// 루트 경로에 대한 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // 루트 경로에서 index.html 제공
});

// API 라우트
app.use('/products', productRoutes);

// 서버 시작
(async () => {
    try {
        // MongoDB 연결
        console.log('서버 시작 전에 MongoDB 연결을 시도합니다.');
        await connectDB();  // 비동기 연결 시도

        // 서버 시작
        app.listen(PORT, () => {
            console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
        });
    } catch (error) {
        console.error('MongoDB 연결 실패로 서버 실행을 중단합니다.');
        console.error(error.message);
    }
})();