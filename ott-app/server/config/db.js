import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
// Azure MySQL connection example

// var fs = require('fs');
// var mysql = require('mysql');
// const serverCa = [fs.readFileSync("/var/www/html/DigiCertGlobalRootCA.crt.pem", "utf8")];

export async function createDbConnection() {
  const isLocalhost = process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    ssl: isLocalhost
      ? false
      : {
          rejectUnauthorized: true,
          ca: fs.readFileSync(path.resolve('./certs/DigiCertGlobalRootG2.crt.pem')),
        },
    connectTimeout: 10000,
    maxIdle: 0,
    idleTimeout: 60000,
    enableKeepAlive: true,
  });

  return conn;
}
