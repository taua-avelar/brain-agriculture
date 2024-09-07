import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './farmer.entity';
import { CreateFarmerDto, UpdateFarmerDto } from './dtos';

@Injectable()
export class FarmerService {
  constructor(@InjectRepository(Farmer) private repo: Repository<Farmer>) {}

  private validateAreas(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ) {
    if (arableArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'A soma da área agricultável e da área de vegetação não pode ser maior que a área total da fazenda.',
      );
    }
  }

  create(body: CreateFarmerDto) {
    this.validateAreas(body.totalArea, body.arableArea, body.vegetationArea);
    const newFarmer = this.repo.create(body);

    return this.repo.save(newFarmer);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(document: string) {
    return this.repo.find({ where: { document } });
  }

  async update(id: number, attrs: UpdateFarmerDto) {
    const farmer = await this.findOne(id);
    if (!farmer) throw new NotFoundException('Usuario não encontrado');
    this.validateAreas(
      attrs.totalArea ?? farmer.totalArea,
      attrs.arableArea ?? farmer.arableArea,
      attrs.vegetationArea ?? farmer.vegetationArea,
    );
    Object.assign(farmer, attrs);
    return this.repo.save(farmer);
  }

  async remove(id: number) {
    const farmer = await this.findOne(id);
    if (!farmer) throw new NotFoundException('Usuario não encontrado');

    return this.repo.remove(farmer);
  }

  async getDashboardData(): Promise<any> {
    const totalFarmsCount = await this.repo.count();

    const totalFarmsArea = await this.repo
      .createQueryBuilder('farmer')
      .select('SUM(farmer.totalArea)', 'totalArea')
      .getRawOne();

    const farmsByState = await this.repo
      .createQueryBuilder('farmer')
      .select('farmer.state', 'state')
      .addSelect('COUNT(farmer.id)', 'count')
      .groupBy('farmer.state')
      .getRawMany();

    const farmsByCrops = await this.repo
      .createQueryBuilder('farmer')
      .select("UNNEST(string_to_array(farmer.crops, ',')) AS crop")
      .addSelect('COUNT(*)', 'count')
      .groupBy('crop')
      .getRawMany();

    const farmsByLandUse = await this.repo
      .createQueryBuilder('farmer')
      .select('SUM(farmer.arableArea)', 'arableArea')
      .addSelect('SUM(farmer.vegetationArea)', 'vegetationArea')
      .getRawOne();

    return {
      totalFarmsCount,
      totalFarmsArea: parseFloat(totalFarmsArea.totalArea),
      farmsByState,
      farmsByCrops,
      farmsByLandUse,
    };
  }
}
