import { NoteRepository } from '../repositories/notes.repository';
import { CreateNoteDTO, UpdateNoteDTO, NoteResponseDTO } from '../dtos/note.dto';
import { NotFoundError, NoteConflictError } from '../exceptions/domain/index';
import { NoteMapper } from './mappers/note-mapper';

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(userId: number, data: CreateNoteDTO): Promise<NoteResponseDTO> {
    
    const existingNote = await this.noteRepository.findByTitleAndUser(data.title, userId);
    if (existingNote) {
      throw new NoteConflictError(data.title);
    }

    // Cria a nota
    const createdNote = await this.noteRepository.create({
      title: data.title,
      content: data.content,
      user: { connect: { id: userId } },
    });

    return NoteMapper.toResponse(createdNote);
  }

  async getAllNotesByUser(userId: number): Promise<NoteResponseDTO[]> {
    const notes = await this.noteRepository.findAllByUser(userId);
    return NoteMapper.toResponseList(notes);
  }

  async getNoteById(id: number, userId: number): Promise<NoteResponseDTO> {
    const note = await this.noteRepository.findById(id);
    if (!note || note.userId !== userId) {
      throw new NotFoundError('Nota não encontrada');
    }
    return NoteMapper.toResponse(note);
  }

  async updateNote(id: number, userId: number, data: UpdateNoteDTO): Promise<NoteResponseDTO> {
    const note = await this.getNoteById(id, userId);
    const noteUpdated = await this.noteRepository.update(
      note.id, {
      title: data.title,
      content: data.content,
    });
    return NoteMapper.toResponse(noteUpdated);
  }

  async deleteNote(id: number, userId: number): Promise<NoteResponseDTO> {
    const note = await this.getNoteById(id, userId);
    const noteDeleted = await this.noteRepository.delete(note.id);
    return NoteMapper.toResponse(noteDeleted);
  }
}

