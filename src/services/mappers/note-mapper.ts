import { NoteResponseDTO } from '../../dtos/note.dto'

export class NoteMapper {
    
  static toResponse(
    note: { id: number; title: string; content: string }
  ): NoteResponseDTO {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
    };
  }

  static toResponseList(
    notes: Array<{ id: number; title: string; content: string }>
  ): NoteResponseDTO[] {
    return notes.map(NoteMapper.toResponse);
  }
}
