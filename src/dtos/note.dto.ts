export interface CreateNoteDTO {
  title: string;
  content: string;
}

// Para atualizar nota
export interface UpdateNoteDTO {
  title?: string;
  content?: string;
}

export interface NoteResponseDTO {
  id: number;
  title: string;
  content: string;
}