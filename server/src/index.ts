import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import bodyParser from "body-parser";

import { router } from "../routes/userRoutes";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", router);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
