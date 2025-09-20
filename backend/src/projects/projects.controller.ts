import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() body: { ownerId: string; title: string; description?: string; deadline?: string }) {
    const { ownerId, title, description, deadline } = body;
    return this.projectsService.create({ ownerId, title, description, deadline: deadline ? new Date(deadline) : undefined });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; description?: string; status?: string; deadline?: string }) {
    const { title, description, status, deadline } = body;
    return this.projectsService.update(id, { title, description, status, deadline: deadline ? new Date(deadline) : undefined });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}