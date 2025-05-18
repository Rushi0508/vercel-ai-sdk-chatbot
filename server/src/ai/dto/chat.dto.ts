import { Attachment, Message, TextPart } from 'ai';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChatRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @IsNotEmpty()
  messages: Message[];
}
