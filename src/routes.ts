import { Router } from "express";
import todoRoutes from "./modules/todo/todo.routes";
import roleRoutes from "./modules/role/role.routes";
import userRoutes from "./modules/user/user.routes";

const router = Router();

router.use("/todos", todoRoutes);
router.use("/roles", roleRoutes);
router.use("/users", userRoutes);

export default router;
