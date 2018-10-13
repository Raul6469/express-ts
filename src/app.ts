require("dotenv").config();

import express from "express";

const cors = require("cors");
import expressValidator from "express-validator";

import * as greeting from "./api/greeting";
import { MessageAPI } from "./api/messages-route";
import { UserAPI } from "./api/user-route";
import { AuthGuard } from "./auth/auth-guard";
import { TokenIssuer } from "./auth/token-issuer";

const app = express();

app.use(cors());
app.use(expressValidator());
app.use(express.json());

app.use("/auth", TokenIssuer);

app.use(AuthGuard);

app.get("/", greeting.hello);
app.use("/message", MessageAPI);
app.use("/user", UserAPI);

export default app;
