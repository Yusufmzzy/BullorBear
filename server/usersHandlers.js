"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");
const { MONGO_URI } = process.env;

const bcrypt = require("bcrypt");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createAnUser = async (req, res) => {
  const {
    email,
    username,
    password,
    securityquestionanswer,
    confirmpassword,
    securityquestion,
  } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Finalproject");
    const emailResult = await db.collection("users").findOne({ email });
    const userNameResult = await db.collection("users").findOne({ username });

    if (emailResult) {
      return res
        .status(409)
        .json({ status: "error", message: "email is already exist." });
    } else if (!email || !email.includes("@")) {
      return res.status(404).json({
        status: "error",
        message: "please provide a proper email address.",
      });
    } else if (!username) {
      return res.status(404).json({
        status: "error",
        message: "please provide a proper userName.",
      });
    } else if (userNameResult) {
      return res
        .status(409)
        .json({ status: "error", message: "username is alrady exist." });
    } else if (!password || password.length < 8) {
      return res.status(404).json({
        status: "error",
        message: "please provide a password or provide a stronger password.",
      });
    } else if (!securityquestionanswer || !securityquestion) {
      return res.status(404).json({
        status: "error",
        message:
          "please select a security question and provide with an answer.",
      });
    } else if (confirmpassword !== password) {
      return res.status(404).json({
        status: "error",
        message:
          "please make sure the password with confirmed password match with each other.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedsecurityquestions = await bcrypt.hash(
        securityquestionanswer,
        10
      );
      const result = await db.collection("users").insertOne({
        username: username,
        email: email,
        password: hashedPassword,
        securityquestionanswer: hashedsecurityquestions,
        securityquestion: securityquestion,
      });
      result
        ? res
            .status(200)
            .json({ status: 200, data: result, message: "Success!" })
        : res
            .status(418)
            .json({ status: "error", data: result, message: "Failed." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Invalid response." });
  } finally {
    client.close();
  }
};
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Finalproject");
    const userNameResult = await db.collection("users").findOne({ username });
    if (!userNameResult) {
      res
        .status(404)
        .json({ status: "error", message: "user does not exist." });
    } else if (await bcrypt.compare(password, userNameResult.password)) {
      res
        .status(200)
        .json({ status: 200, body: userNameResult, message: "Success." });
    } else {
      res.status(404).json({ status: "error", message: "Incorrect password." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { createAnUser, userLogin };
