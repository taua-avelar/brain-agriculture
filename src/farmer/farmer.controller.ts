import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto, UpdateFarmerDto } from './dtos';

@Controller('farmer')
export class FarmerController {
  constructor(private farmerService: FarmerService) {}
  @Post('/new')
  createFarmer(@Body() body: CreateFarmerDto) {
    this.farmerService.create(body);
  }

  @Get('/:id')
  findFarmer(@Param('id') id: string) {
    return this.farmerService.findOne(parseInt(id));
  }

  @Delete('/:id')
  removeFarmer(@Param('id') id: string) {
    return this.farmerService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateFarmer(@Param('id') id: string, @Body() body: UpdateFarmerDto) {
    return this.farmerService.update(parseInt(id), body);
  }
}
