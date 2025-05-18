import { Injectable } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat.dto';
import { pipeDataStreamToResponse, smoothStream, streamText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Response } from 'express';
import { tavily } from '@tavily/core';
import { z } from 'zod';

@Injectable()
export class AiService {
  async generateText(body: ChatRequestDto, res: Response) {
    pipeDataStreamToResponse(res, {
      execute: (dataStreamWriter) => {
        const result = streamText({
          model: openai('gpt-4o-mini'),
          messages: body.messages,
          maxSteps: 10,
          system: 'You are a helpful assistant.',
          toolCallStreaming: true,
          tools: {
            web_search: tool({
              description: 'Search the web for information',
              parameters: z.object({
                query: z.string(),
              }),
              execute: async ({ query }) => {
                const client = tavily({
                  apiKey: process.env.TAVILY_API_KEY,
                });
                const result = await client.search(query, {
                  type: 'general',
                  searchDepth: 'basic',
                  chunksPerSource: 3,
                  max_results: 7,
                  time_range: null,
                  days: 7,
                  include_answer: true,
                  include_raw_content: false,
                  include_images: false,
                  include_image_descriptions: false,
                  include_domains: [],
                  exclude_domains: [],
                });
                return result;
              },
            }),
          },
          experimental_transform: smoothStream({ chunking: 'word' }),
        });
        result.mergeIntoDataStream(dataStreamWriter);
      },
      onError: (error) => {
        return error instanceof Error ? error.message : String(error);
      },
    });
  }
}
