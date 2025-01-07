// index.js
const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./routes/product');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(express.json());
app.use('/products', productRoutes);

// 루트 경로에 대한 처리
app.get('/', (req, res) => {
    res.send('✅ 서버가 정상적으로 작동하고 있습니다.');
});

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