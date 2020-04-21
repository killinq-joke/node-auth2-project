const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./user/user-router");
const authRouter = require("./auth/auth-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(userRouter);
server.use(authRouter);

module.exports = server;
