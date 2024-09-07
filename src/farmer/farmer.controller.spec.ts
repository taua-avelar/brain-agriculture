import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from './farmer.controller';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto, UpdateFarmerDto } from './dtos';
import { BadRequestException } from '@nestjs/common';

describe('FarmerController', () => {
  let controller: FarmerController;
  let service: FarmerService;

  const mockFarmerService = () => ({
    create: jest.fn(),
    getDashboardData: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        {
          provide: FarmerService,
          useFactory: mockFarmerService,
        },
      ],
    }).compile();

    controller = module.get<FarmerController>(FarmerController);
    service = module.get<FarmerService>(FarmerService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createFarmer', () => {
    it('deve chamar createFarmer e retornar o resultado', async () => {
      const dto: CreateFarmerDto = {
        document: '12345678901',
        name: 'Agricultor Teste',
        farmName: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        crops: ['trigo'],
      };
      const result = { id: 1, ...dto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.createFarmer(dto)).toEqual(result);
    });
  });

  describe('getDashboardData', () => {
    it('deve retornar os dados do dashboard', async () => {
      const result = { totalFarmers: 10, totalCrops: 5 };
      jest.spyOn(service, 'getDashboardData').mockResolvedValue(result);

      expect(await controller.getDashboardData()).toEqual(result);
    });
  });

  describe('findFarmer', () => {
    it('deve retornar um agricultor pelo id', async () => {
      const id = 1;
      const result = {
        id,
        document: '12345678901',
        name: 'Agricultor Teste',
        farmName: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        crops: ['trigo'],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findFarmer(id.toString())).toEqual(result);
    });
  });

  describe('removeFarmer', () => {
    it('deve chamar removeFarmer e retornar o agricultor removido', async () => {
      const id = 1;
      const deletedFarmer = {
        id: 1,
        document: '12345678901',
        name: 'Agricultor Teste',
        farmName: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        crops: ['trigo'],
      };

      jest.spyOn(service, 'remove').mockResolvedValue(deletedFarmer);

      expect(await controller.removeFarmer(id.toString())).toEqual(
        deletedFarmer,
      );
    });
  });

  describe('updateFarmer', () => {
    it('deve chamar updateFarmer e retornar o agricultor atualizado', async () => {
      const id = 1;
      const dto: UpdateFarmerDto = { name: 'Nome Atualizado' };
      const result = {
        id,
        document: '12345678901',
        name: 'Nome Atualizado',
        farmName: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        crops: ['trigo'],
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.updateFarmer(id.toString(), dto)).toEqual(result);
    });

    it('deve lançar BadRequestException se a atualização falhar', async () => {
      const id = 1;
      const dto: UpdateFarmerDto = { name: 'Atualização Inválida' };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.updateFarmer(id.toString(), dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
