import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateApartmentDto } from '../dto/createApartmentDto';
import { UpdateApartmentDto } from '../dto/UpdateApartmentDto';
import { ApartmentsService } from '../services/apartments.service';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.apartmentsService.findById(id);
  }

  @Get(':id/residents')
  findResidents(@Param('id') id: string) {
    return this.apartmentsService.findResidents(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ) {
    return this.apartmentsService.update(id, updateApartmentDto);
  }
}
