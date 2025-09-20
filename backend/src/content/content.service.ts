import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async listRequests(projectId: string) {
    return this.prisma.contentRequest.findMany({ where: { projectId }, include: { article: true, seoData: true } });
  }

  async createRequest(projectId: string, requestedById: string, data: any) {
    return this.prisma.contentRequest.create({
      data: {
        projectId,
        requestedById,
        title: data.title,
        description: data.description,
        persona: data.persona,
        tone: data.tone,
        language: data.language,
        lengthType: data.lengthType,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async getRequest(id: string) {
    const req = await this.prisma.contentRequest.findUnique({ where: { id }, include: { article: true, seoData: true } });
    if (!req) throw new NotFoundException('Request not found');
    return req;
  }

  async updateRequest(id: string, data: any) {
    await this.getRequest(id);
    return this.prisma.contentRequest.update({ where: { id }, data });
  }

  async generate(id: string) {
    // Place job in queue (stub)
    // For now just update status to GENERATING and then to READY_FOR_PUBLISH with dummy article
    const req = await this.getRequest(id);
    await this.prisma.contentRequest.update({ where: { id }, data: { status: 'GENERATING' } });
    const articleBody = `محتوای تولیدشده برای موضوع: ${req.title}`;
    const article = await this.prisma.article.create({ data: { contentRequestId: id, body: articleBody, status: 'DRAFT' } });
    await this.prisma.contentRequest.update({ where: { id }, data: { status: 'READY_FOR_PUBLISH' } });
    return article;
  }
}