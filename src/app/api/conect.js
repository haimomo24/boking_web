import sql from "mssql";

const config = {
  user: "sa", 
  password: "123456a@", 
  server: "192.168.88.95", 
  database: "booking", 
  options: {
    encrypt: false, 
    trustServerCertificate: true,
  },
  port: 1433, 
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Kết nối SQL Server thành công!");
    return pool;
  })
  .catch(err => {
    console.error("Lỗi kết nối SQL Server:", err);
    // Trong môi trường sản xuất, có thể bạn không muốn thoát quá trình
    // process.exit(1);
    return Promise.reject(err);
  });

// Thêm export mặc định
const dbUtils = { sql, poolPromise };
export default dbUtils;
export { sql, poolPromise };