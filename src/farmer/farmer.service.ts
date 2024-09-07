import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './farmer.entity';

@Injectable()
export class FarmerService {
  constructor(@InjectRepository(Farmer) private repo: Repository<Farmer>) {}

  create(body: any) {
    const newFarmer = this.repo.create(body);

    return this.repo.save(newFarmer);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(document: string) {
    return this.repo.find({ where: { document } });
  }

  async update(id: number, attrs: Partial<Farmer>) {
    const farmer = await this.findOne(id);
    if (!farmer) throw new NotFoundException('Usuario não encontrado');

    Object.assign(farmer, attrs);
    return this.repo.save(farmer);
  }

  async remove(id: number) {
    const farmer = await this.findOne(id);
    if (!farmer) throw new NotFoundException('Usuario não encontrado');

    return this.repo.remove(farmer);
  }
}
