import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cursos' })
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  @IsDefined({ message: 'Nome do curso não informado!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message:
      'O nome do curso deve ser uma string com tamanho mínimo de 5 caracteres',
  })
  @MaxLength(5, {
    message:
      'O nome do curso deve ser uma string com tamanho máximo de 35 caracteres',
  })
  @ApiProperty()
  nomeCurso: string;
  @Column({ type: 'int', nullable: false, default: 0 })
  @IsDefined({ message: 'Duração do curso não informada!' })
  @IsNumber()
  @Min(1)
  @ApiProperty({ default: 1 })
  duracaoCurso: number;
  @Column({ type: 'text' })
  @IsDefined({
    message: 'É obrigatório a informação de um descritivo do curso.',
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descritivoCurso: string;
}
