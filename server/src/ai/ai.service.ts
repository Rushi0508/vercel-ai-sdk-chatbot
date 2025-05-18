import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generateText() {
    return 'Hello World';
  }
}
