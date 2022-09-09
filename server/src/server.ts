import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/auth";
import cors from "cors";

const app = express();
const origin = "http://localhost:3000";

app.use(
  cors({
    origin,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
// app.get url 접속하면 해당 블록의 코드 실행
app.get("/", (_, res) => res.send("running"));

// app.listen 포트로 접속하면 해당 블록의 코드 실행
let port = 4000;
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
