import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @IsDefined({ message: 'Nome do curso não informado!' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 35, {
    message:
      'O nome do curso deve ser uma string com tamanho entre 5 e 35 caractares',
  })
  @ApiProperty()
  nomeCurso: string;
  @IsDefined({ message: 'Duração do curso não informada!' })
  @IsNumber()
  @Min(1, { message: 'A duração do curso deve ser de no mínimo uma hora!' })
  @ApiProperty({ default: 1 })
  duracaoCurso: number;
  @IsDefined({
    message: 'É obrigatório a informação de um descritivo do curso.',
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descritivoCurso: string;
}
