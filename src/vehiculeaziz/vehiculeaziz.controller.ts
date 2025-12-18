import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VehiculeAzizService } from './vehiculeaziz.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';

@Controller('vehiculeaziz')
export class VehiculeAzizController {
  constructor(private readonly service: VehiculeAzizService) {}

  @Post('create')
  create(@Body() dto: CreateVehiculeDto) {
    return this.service.create(dto);
  }

  @Get('showVehicles')
  showAll() {
    return this.service.findAll();
  }

  @Get('showVehicles/:id')
  showOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete('DeleteVehicle/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Put('UpdateVehicle/:id')
  update(@Param('id') id: string, @Body() dto: UpdateVehiculeDto) {
    return this.service.update(id, dto);
  }

  @Get('search')
  search(@Query('brand') brand: string, @Query('model') model: string) {
    return this.service.search(brand, model);
  }

  @Post('calculateRent/:id')
  calculate(@Param('id') id: string, @Body() body: { days: number }) {
    return this.service.calculateRent(id, body.days);
  }

  @Get('recent')
  recent() {
    return this.service.recent();
  }

  @Get('total')
  total() {
    return this.service.total();
  }
}
