import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const createSub = async (req: Request, res: Response, next) => {
  const { name, title, description } = req.body;

  const token = req.cookies.token;

  if (!token) return next();

  // 밑의 코드는 유저정보를 확인할 때 필요한 정보들을 담고 있음
  // 유저 정보를 필요로하는 여러 핸들러를 편하게 사용하기 위해 미들웨어로 분리 필요함
  // server/src/middlewares에 작성됨
};

const router = Router();

router.post("/", createSub);

export default router;
