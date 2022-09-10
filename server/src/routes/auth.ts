import { isEmpty, validate } from "class-validator";
import { Router, Response, Request } from "express";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import path from "path";

const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};

    // 이메일과 유저이름이 이미 저장 사용되고 있는 것인지 확인
    const emailUser = await User.findOneBy({ email });
    const usernameUser = await User.findOneBy({ username });

    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용중입니다.";
    if (usernameUser) errors.username = "이미 이 사용자 이름이 사용중입니다.";

    //에러가 있다면 return 으로 에러를 response 보내줌
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // 엔티티에 정해 놓은 조건으로 user 데이터의 유효성 검사를 해줌.
    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapError(errors));
    //  유저 정보를 user table에 저장.
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let errors: any = {};

    if (isEmpty(username)) errors.username = "이름을 입력해주세요";
    if (isEmpty(password)) errors.password = "비밀번호를 입력해주세요";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // db에서 유저 찾기
    const user = await User.findOneBy({ username });
    if (!user)
      return res.status(404).json({ username: "등록되지 않은 사용자입니다" });

    // 유저 있으면 비밀번호 비교
    const passwordMatche = await bcrypt.compare(password, user.password);

    // 비밀번호 다를 경우 에러 전송
    if (!passwordMatche) {
      return res.status(401).json({ password: "잘못된 로그인 정보입니다." });
    }

    // 비밀번호가 맞을 경우 토큰 생성
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // 쿠키 저장
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const router = Router();
router.post("/register", register);
router.post("/login", login);

export default router;
