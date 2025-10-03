const { Client } = require("pg");

const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || 5432;
const user = process.env.DB_USER || "postgres";
const password = process.env.DB_PASSWORD || "postgres";
const database = process.env.DB_NAME || "testdb";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForPostgres() {
  while (true) {
    try {
      const client = new Client({ host, port, user, password, database });
      await client.connect();
      console.log("✅ Postgres is ready!");
      await client.end();
      break;
    } catch (err) {
      console.log("⏳ Waiting for Postgres to be ready...");
      await delay(2000);
    }
  }
}

waitForPostgres().then(() => {
  // Start backend after DB is ready
  require("./index.js"); // or your backend entry file
});
