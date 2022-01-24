import { Module } from '@nestjs/common';
import { DocumentsModule } from './api/v1/documents/documents.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
