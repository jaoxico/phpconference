import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { DatabaseModule } from '../database.module';
import { CursosProvider } from './cursos.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CursosController],
  providers: [...CursosProvider, CursosService],
})
export class CursosModule {}
