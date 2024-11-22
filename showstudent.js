const { MongoClient } = require('mongodb'); // 引入 MongoDB 客戶端模組

// MongoDB 连接设置
const uri = "mongodb://localhost:27017"; // 替换为实际的 MongoDB 连接字符串
const dbName = "410550163"; // 数据库名称
const collectionName = "studentslist"; // 集合名称

(async () => {
    const client = new MongoClient(uri); // 创建 MongoDB 客户端

    try {
        // 连接到 MongoDB
        await client.connect();
        console.log("成功連接到 MongoDB");

        // 获取数据库和集合
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 查询所有学生资料
        const students = await collection.find().toArray();

        // 输出查询结果
        console.log("學生資料列表：");
        students.forEach(student => {
            console.log(student);
        });
    } catch (error) {
        console.error("發生錯誤：", error);
    } finally {
        // 关闭 MongoDB 连接
        await client.close();
        console.log("已關閉 MongoDB 連接");
    }
})();
