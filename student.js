const fs = require('fs'); // 文件系統模組
const csv = require('csv-parser'); // 解析 CSV
const { MongoClient } = require('mongodb'); // MongoDB 客戶端

// MongoDB 連接配置
const uri = 'mongodb://localhost:27017'; // 替換為你的 MongoDB 連接字串
const dbName = '410550163'; // 替換為你的資料庫名稱
const collectionName = 'studentslist'; // 替換為你的集合名稱

const client = new MongoClient(uri);

async function importCSV() {
    try {
        // 連接到 MongoDB
        await client.connect();
        console.log("成功連接到 MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 讀取 CSV 檔案
        const results = [];
        fs.createReadStream('studentslist.csv') // 替換為你的 CSV 檔案路徑
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    // 插入資料到 MongoDB
                    const insertResult = await collection.insertMany(results);
                    console.log(`成功插入 ${insertResult.insertedCount} 筆資料！`);
                } catch (insertError) {
                    console.error("插入資料時發生錯誤：", insertError);
                } finally {
                    // 關閉連接
                    await client.close();
                }
            });
    } catch (error) {
        console.error("發生錯誤：", error);
    }
}

// 執行導入
importCSV();
