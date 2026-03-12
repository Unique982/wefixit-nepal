import express from "express";
// import router from "./router/index";

import router from "./routers/user.route";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);

// global error handler Should be last
app.use(errorHandler);

export default app;
