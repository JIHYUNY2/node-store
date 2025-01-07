// db.js
const { MongoClient } = require('mongodb');

// MongoDB 연결 URI (기본 설정)
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// 데이터베이스 이름
const dbName = 'productDB';

// MongoDB 연결 함수
async function connectDB() {
  try {
      // MongoDB 연결 시도
      await client.connect();
      console.log('✅ MongoDB에 성공적으로 연결되었습니다.');
      return client.db(dbName);
  } catch (error) {
      // 연결 실패 시 더 구체적인 에러 메시지를 로그로 남기기
      console.error('MongoDB 연결 중 에러 발생:', error.message);
      console.error(error); // error 객체 자체를 로깅하여 더 많은 정보 확인
      throw error; // 에러를 다시 던져서 상위에서 처리할 수 있게 합니다.
  }
}

module.exports = connectDB;