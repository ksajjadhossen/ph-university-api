import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/middlewares";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes/routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/api/v1/", router);
app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
