import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/middlewares";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes/routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	console.log(req.body);
	res.send("Hello World!");
});

app.use("/api/v1/", router);
app.use(notFoundRoute);
app.use(globalErrorHandler);

export default app;
