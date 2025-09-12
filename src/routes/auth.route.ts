import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "../services/jwt.service";
import { prisma } from "../config/db.config";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../validators/userSchema";

const userRepository = new UserRepository(prisma);
const jwtService = new JwtService();
const authService = new AuthService(userRepository, jwtService);
const authController = new AuthController(authService);

const authRoute = Router();
authRoute.post('/register', validate(createUserSchema), authController.register);
authRoute.post('/login', authController.login);

export default authRoute;