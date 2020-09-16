/* eslint-disable @typescript-eslint/ban-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProjectDTO } from './dto/project.dto';
import { Project } from './interface/project.interface';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findByid(@Param('id') id: string): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Res() res: Response,
    @Body() projectDTO: ProjectDTO,
  ): Promise<Response> {
    await this.projectService.create(projectDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Thêm thành công',
      success: true,
    });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<Response> {
    await this.projectService.update(id, projectDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Cập nhật thành công',
      success: true,
    });
  }

  @Delete(':id')
  async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    await this.projectService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Xóa thành công',
      success: true,
    });
  }

  @Patch(':id')
  updateTreeData(
    @Param('id') id: string,
    @Body() treeData: object,
  ): Promise<Project> {
    return this.projectService.updateTreeData(id, treeData);
  }
}
