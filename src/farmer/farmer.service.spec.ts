import { Test, TestingModule } from '@nestjs/testing';
import { FarmerService } from './farmer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farmer } from './farmer.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('FarmerService', () => {
  let service: FarmerService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    count: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockResolvedValue({}),
    getRawMany: jest.fn().mockResolvedValue([]),
    addSelect: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
  };

  let repo: typeof mockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        {
          provide: getRepositoryToken(Farmer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FarmerService>(FarmerService);
    repo = module.get(getRepositoryToken(Farmer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo agricultor', async () => {
      const dto = {
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
      repo.create.mockReturnValue(dto);
      repo.save.mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });

    it('deve lançar BadRequestException se o documento já estiver cadastrado', async () => {
      const dto = {
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
      const existingFarmer = {
        document: '12345678901',
        name: 'Agricultor Existente',
        farmName: 'Fazenda Existente',
        city: 'Cidade Existente',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        crops: ['milho'],
      };
      repo.findOne.mockResolvedValue(existingFarmer);

      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException('Documento já está cadastrado.'),
      );
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { document: dto.document },
      });
      expect(repo.create).not.toHaveBeenCalled();
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('deve lançar BadRequestException se as áreas forem inválidas', async () => {
      const dto = {
        document: '12345678901',
        name: 'Agricultor Teste',
        farmName: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'TS',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 50,
        crops: ['trigo'],
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('deve retornar um agricultor pelo ID', async () => {
      const farmer = {
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
      repo.findOneBy.mockResolvedValue(farmer);

      const result = await service.findOne(1);

      expect(result).toEqual(farmer);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('deve retornar null se o agricultor não for encontrado', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('deve atualizar um agricultor existente', async () => {
      const farmer = {
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
      const updateDto = { totalArea: 120 };

      repo.findOneBy.mockResolvedValue(farmer);
      repo.save.mockResolvedValue({ ...farmer, ...updateDto });

      const result = await service.update(1, updateDto);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repo.save).toHaveBeenCalledWith({ ...farmer, ...updateDto });
      expect(result).toEqual({ ...farmer, ...updateDto });
    });

    it('deve lançar NotFoundException se o agricultor não for encontrado', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.update(1, { totalArea: 120 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um agricultor', async () => {
      const farmer = {
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
      repo.findOneBy.mockResolvedValue(farmer);
      repo.remove.mockResolvedValue(farmer);

      const result = await service.remove(1);

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repo.remove).toHaveBeenCalledWith(farmer);
      expect(result).toEqual(farmer);
    });

    it('deve lançar NotFoundException se o agricultor não for encontrado', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getDashboardData', () => {
    it('deve retornar dados do dashboard', async () => {
      const totalFarmsCount = 10;
      const totalFarmsArea = { totalArea: '500' };
      const farmsByState = [{ state: 'TS', count: 3 }];
      const farmsByCrops = [{ crop: 'trigo', count: 5 }];
      const farmsByLandUse = { arableArea: '300', vegetationArea: '200' };

      repo.count.mockResolvedValue(totalFarmsCount);
      repo.createQueryBuilder().getRawOne.mockResolvedValueOnce(totalFarmsArea);
      repo.createQueryBuilder().getRawMany.mockResolvedValueOnce(farmsByState);
      repo.createQueryBuilder().getRawMany.mockResolvedValueOnce(farmsByCrops);
      repo.createQueryBuilder().getRawOne.mockResolvedValueOnce(farmsByLandUse);

      const result = await service.getDashboardData();

      expect(result).toEqual({
        totalFarmsCount,
        totalFarmsArea: 500,
        farmsByState,
        farmsByCrops,
        farmsByLandUse,
      });
    });
  });
});
