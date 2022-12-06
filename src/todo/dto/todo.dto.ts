import { IsOptional } from 'class-validator';

export class ToDoDto {
  @IsOptional()
  toDoId: string;

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  question: string;

  @IsOptional()
  issue: string;

  @IsOptional()
  subIssue: string;
}
