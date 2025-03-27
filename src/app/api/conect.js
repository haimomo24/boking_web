import sql from "mssql";

const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "123456a@",
  server: process.env.DB_SERVER || "113.160.202.36",
  database: process.env.DB_NAME || "booking",
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_CERT === "true" || true,
  },
  port: parseInt(process.env.DB_PORT || "1999"),
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Kết nối SQL Server thành công!");
    return pool;
  })
  .catch(err => {
    console.error("Lỗi kết nối SQL Server:", err);
    return Promise.reject(err);
  });

const dbUtils = { sql, poolPromise };
export default dbUtils;
export { sql, poolPromise };
