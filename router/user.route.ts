import express, { Router } from "express";
import { Register, Login, getUsers } from "../controller/user.controller";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/users").get(getUsers);

export default router;
