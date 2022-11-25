import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursosService {
  private logger: Logger = new Logger('CursosService');

  constructor(
    @Inject('CURSOS_REPOSITORY')
    public readonly cursosRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const newCurso = this.cursosRepository.create();
    newCurso.nomeCurso = createCursoDto.nomeCurso;
    newCurso.descritivoCurso = createCursoDto.descritivoCurso;
    newCurso.duracaoCurso = createCursoDto.duracaoCurso;
    const inserted = await this.cursosRepository.insert(newCurso);
    this.logger.debug(`Curso inserido: ${JSON.stringify(inserted)}`);
    return this.cursosRepository.findOneBy({
      id: inserted.raw.insertedId,
    });
  }

  async findAll(): Promise<Array<Curso>> {
    return await this.cursosRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursosRepository.findOneBy({ id });
    if (!curso) {
      const msg = `Curso ${id} não encontrado!`;
      this.logger.debug(msg);
      throw new HttpException(msg, HttpStatus.NOT_FOUND);
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursosRepository.findOneBy({ id });
    if (!curso) {
      const msg = `Curso ${id} não encontrado!`;
      this.logger.debug(msg);
      throw new HttpException(msg, HttpStatus.NOT_FOUND);
    }
    curso.duracaoCurso = updateCursoDto.duracaoCurso;
    curso.descritivoCurso = updateCursoDto.descritivoCurso;
    curso.nomeCurso = updateCursoDto.nomeCurso;
    return await this.cursosRepository.save(curso);
  }

  async remove(id: number): Promise<string> {
    const curso = await this.cursosRepository.findOneBy({ id });
    if (!curso) {
      const msg = `Curso ${id} não encontrado!`;
      this.logger.debug(msg);
      throw new HttpException(msg, HttpStatus.NOT_FOUND);
    }
    await this.cursosRepository.remove(curso);
    return 'Curso excluído com sucesso!';
  }
}
