import { Router } from "express";
const routerV1: any = Router();

import adminRoutes from "./admins/admins.routes";
import userRoutes from "./users/users.routes";
import novelRoutes from "./novels/novel.routes";

routerV1.use("/v1", adminRoutes);
routerV1.use("/v1", userRoutes);
routerV1.use("/v1", novelRoutes);

export default routerV1;
