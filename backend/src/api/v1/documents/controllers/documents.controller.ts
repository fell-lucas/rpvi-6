import { Controller, Get } from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';

@Controller('api/v1/documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get('list')
  async getAllDocuments() {
    return 'hello world';
  }
}
