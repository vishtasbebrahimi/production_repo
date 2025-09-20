import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('projects/:projectId/requests')
  list(@Param('projectId') projectId: string) {
    return this.contentService.listRequests(projectId);
  }

  @Post('projects/:projectId/requests')
  create(@Param('projectId') projectId: string, @Body() body: any) {
    return this.contentService.createRequest(projectId, body.requestedById, body);
  }

  @Get('requests/:id')
  get(@Param('id') id: string) {
    return this.contentService.getRequest(id);
  }

  @Patch('requests/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.contentService.updateRequest(id, body);
  }

  @Post('requests/:id/generate')
  generate(@Param('id') id: string) {
    return this.contentService.generate(id);
  }
}