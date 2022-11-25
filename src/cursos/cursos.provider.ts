import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';

export const CursosProvider: Array<Provider<Repository<Curso>>> = [
  {
    provide: 'CURSOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Curso),
    inject: ['DATA_SOURCE'],
  },
];
