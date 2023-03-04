import express from "express";
import { getUsers } from "../controllers/getUsers";
import { loginUser } from "../controllers/loginUser";
import { registerUser } from "../controllers/registerUser";
import { cookieJwtAuth } from "../middleware/cookieJwtAuth";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUsers").get(cookieJwtAuth, getUsers);

export { router };
