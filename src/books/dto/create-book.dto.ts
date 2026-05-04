import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(0)
  year: number;

  @IsString()
  @IsOptional()
  genre?: string;
}
