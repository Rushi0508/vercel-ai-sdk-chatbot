import { Controller, Post } from '@nestjs/common';

@Controller('ai')
export class AiController {
  @Post('generate-text')
  async generateText() {
    return 'Hello World';
  }
}
