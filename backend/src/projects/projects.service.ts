import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ include: { contentRequests: true } });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id }, include: { contentRequests: true } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  create(data: { ownerId: string; title: string; description?: string; deadline?: Date }) {
    return this.prisma.project.create({ data });
  }

  async update(id: string, data: { title?: string; description?: string; status?: string; deadline?: Date }) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { deleted: true };
  }
}