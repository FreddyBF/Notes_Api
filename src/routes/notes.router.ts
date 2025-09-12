import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { NoteService } from "../services/note.service";
import { NoteRepository } from "../repositories/notes.repository";
import { prisma } from "../config/db.config";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { CreateNoteSchema } from "../validators/notesSchema";

const repo = new NoteRepository(prisma);
const service = new NoteService(repo);
const controller = new NoteController(service);

const noteRouter = Router();
noteRouter.use(authMiddleware)
noteRouter.get('/', controller.getAll);
noteRouter.get('/:id', controller.getById);
noteRouter.post('/', validate(CreateNoteSchema), controller.create);
noteRouter.put('/:id', controller.update);
noteRouter.delete('/:id', controller.delete);
export default noteRouter;