const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  try {
    const result = await sql`select version()`;
    console.log(result);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

async function addUser(name, email, password) {
  console.log(name, email, password);
  try {
    //   const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    //   console.log("Length : ", existingUser.length);
    //   if (existingUser.length > 0) {
    //     return { message: "Appeared" };
    //   } else {
    const result = await sql`
        INSERT INTO register (name, email, password)
        VALUES (${name}, ${email}, ${password});`;
    //   }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function addotp(email, otp) {
  try {
    const result = await sql`UPDATE register 
    SET otp = ${otp} 
    WHERE email = ${email};`;
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function verifyOTP(email, otp) {
  const result = await sql`SELECT COUNT(*) AS count
    FROM register
    WHERE email = ${email}
    AND otp = ${otp};`;
  console.log(result);
  return result;
}

async function update_password(email, password) {
  try {
    const result = await sql`UPDATE register
    SET password = ${password}
    WHERE email = ${email};`;
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function login_page(name, password) {
    const result = await sql`SELECT COUNT(*) AS count
      FROM register
      WHERE name = ${name}
      AND  password = ${password};`;
    console.log(result);
    return result;
  }



module.exports = {
  getPgVersion: getPgVersion,
  addUser: addUser,
  addotp: addotp,
  verifyOTP: verifyOTP,
  update_password: update_password,
  login_page:login_page
};
