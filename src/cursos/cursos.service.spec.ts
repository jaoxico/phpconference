import { Test, TestingModule } from '@nestjs/testing';
import { CursosService } from './cursos.service';
import { DatabaseModule } from '../database.module';
import { CursosProvider } from './cursos.provider';
import { Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

describe('CursosService', () => {
  let service: CursosService;
  const logger = new Logger('CursosServiceTest');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...CursosProvider, CursosService],
    }).compile();

    service = module.get<CursosService>(CursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar falha', async () => {
    try {
      const result = await service.create({
        nomeCurso: null,
        descritivoCurso: 'teste curso',
        duracaoCurso: 1,
      });
    } catch (exceprion) {
      expect(exceprion).toBeInstanceOf(QueryFailedError);
    }
  });
});
