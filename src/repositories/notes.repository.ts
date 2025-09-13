import { PrismaClient, Prisma, Note } from '@prisma/client';

export class NoteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllByUser(userId: number): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });
  }

  async findByTitleAndUser(title: string, userId: number): Promise<Note | null> {
    return this.prisma.note.findFirst({
      where: { 
        title, 
        userId 
      }
    });
  }

  async findById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({
      where: { id }
    });
  }

  async create(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async update(id: number, data: Prisma.NoteUpdateInput): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<Note> {
    return this.prisma.note.delete({
      where: { id }
    });
  }
}
