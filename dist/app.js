"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./app/middlewares/middlewares");
const notFoundRoute_1 = __importDefault(require("./app/middlewares/notFoundRoute"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log(req.body);
    res.send("Hello World!");
});
app.use("/api/v1/", routes_1.default);
app.use(middlewares_1.globalErrorHandler);
app.use(notFoundRoute_1.default);
exports.default = app;
