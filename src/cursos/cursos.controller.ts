import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Curso } from './entities/curso.entity';
import { validate } from 'class-validator';

@Controller('cursos')
@ApiTags('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  async create(@Body() createCursoDto: CreateCursoDto): Promise<Curso> {
    const newCurso = new Curso();
    newCurso.duracaoCurso = createCursoDto.duracaoCurso;
    newCurso.nomeCurso = createCursoDto.nomeCurso;
    newCurso.descritivoCurso = createCursoDto.descritivoCurso;
    const errors = await validate(newCurso);
    if (errors.length > 0) {
      throw new HttpException(
        `Invalid data! ${errors.join('\n')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.cursosService.create(createCursoDto);
  }

  @Get()
  @ApiOkResponse({ type: Array<Curso> })
  @ApiNotFoundResponse()
  async findAll(): Promise<Array<Curso>> {
    return await this.cursosService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Curso })
  async findOne(@Param('id') id: number): Promise<Curso> {
    return await this.cursosService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Curso })
  async update(
    @Param('id') id: number,
    @Body() updateCursoDto: UpdateCursoDto,
  ): Promise<Curso> {
    return await this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async remove(@Param('id') id: number): Promise<string> {
    return await this.cursosService.remove(id);
  }
}
