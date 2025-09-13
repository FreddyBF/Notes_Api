import { NextFunction, Request, Response } from 'express';
import { NoteService } from '../services/note.service';
import { CreateNoteDTO, UpdateNoteDTO, NoteResponseDTO } from '../dtos/note.dto';
import { ApiResponse } from '../utils/response';

export class NoteController {

    constructor(private readonly noteService: NoteService) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = (req as any).userId;
        const notes = await this.noteService.getAllNotesByUser(userId);
        res.status(200).json(
          ApiResponse.success<NoteResponseDTO[]>(
            notes, 200,
            'Notas carregadas com sucesso',
            'NOTES_FETCH_SUCCESS'
          )
        );
      } catch (error: any) {
        next(error);
      }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = (req as any).userId;
        const noteId = Number(req.params.id);
        const note = await this.noteService.getNoteById(noteId, userId);
        res.status(200).json(
          ApiResponse.success<NoteResponseDTO>(
            note, 
            200, 
            'Nota carregada com sucesso',
            'NOTE_FETCH_SUCCESS'
          ));
      } catch (error: any) {
        next(error);
      }
    } 

    create = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = (req as any).userId;
        const noteDto: CreateNoteDTO = req.body;
        const note = await this.noteService.createNote(userId, noteDto);
        res.status(201).json(
          ApiResponse.success<NoteResponseDTO>(
            note, 
            201, 
            'Nota criada com sucesso',
            'NOTE_CREATED'
          )
        );
      } catch (error) {
        next(error);
      }
    } 

    update = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = (req as any).userId;
        const noteDto: UpdateNoteDTO = req.body;
        const note = await this.noteService.updateNote(Number(req.params.id), userId, noteDto);
        res.status(200).json(
          ApiResponse.success<NoteResponseDTO>(
            note, 
            200, 
            'Nota atualizada com sucesso',
            'NOTE_UPDATED'
          )
        );
      } catch (error) {
        next(error);
      }
    } 
    
    delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = (req as any).userId;
        await this.noteService.deleteNote(Number(req.params.id), userId);
        res.status(200).json(
          ApiResponse.success(
            {}, 
            200, 
            'Nota deletada com sucesso',
            'NOTE_DELETED'
          ));
      } catch (error) {
        next(error);
      }
    }
}
