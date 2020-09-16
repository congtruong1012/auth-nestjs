/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './dto/project.dto';
import { Project } from './interface/project.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('project') private readonly projectModel: Model<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find({});
  }

  async findById(id: string): Promise<Project> {
    return await this.projectModel.findById({ _id: id });
  }

  async create(projectDTO: ProjectDTO): Promise<Project> {
    const {name} = projectDTO;
    const slug = name.split(" ").join("-");
    const newProject = new this.projectModel({...projectDTO, slug});
    return await newProject.save();
  }

  async update(id: string, projectDTO: ProjectDTO): Promise<Project> {
    const {name} = projectDTO;
    const slug = name.split(" ").join("-");
    return await this.projectModel.findByIdAndUpdate({ _id: id }, {...projectDTO, slug}, {
      new: true,
    });
  }

  async delete(id: string): Promise<Project> {
    return await this.projectModel.findByIdAndDelete({ _id: id });
  }

  async updateTreeData(id: string, treeData: object): Promise<Project> {
    return await this.projectModel.updateOne(
      { _id: id },
      { $set: { treeData } },
    );
  }
}
