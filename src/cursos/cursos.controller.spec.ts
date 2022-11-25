import { Test, TestingModule } from '@nestjs/testing';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { DatabaseModule } from '../database.module';
import { CursosProvider } from './cursos.provider';
import { HttpException, Logger } from '@nestjs/common';

describe('CursosController', () => {
  let controller: CursosController;
  const logger = new Logger('CursosControllerTest');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CursosController],
      providers: [...CursosProvider, CursosService],
    }).compile();

    controller = module.get<CursosController>(CursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve falhar a inserção', async () => {
    try {
      const result = await controller.create({
        duracaoCurso: 1,
        descritivoCurso: 'teste',
        nomeCurso: 'joao',
      });
    } catch (exception) {
      logger.error(exception);
      expect(exception).toBeInstanceOf(HttpException);
    }
  });

  it('deve falhar a exclusão', async () => {
    try {
      const result = await controller.remove(500);
    } catch (exception) {
      logger.error(exception);
      expect(exception).toBeInstanceOf(HttpException);
    }
  });
});
