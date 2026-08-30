import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateResidentDto } from '../dto/createResidentDto';
import { UpdateResidentDto } from '../dto/UpdateResidentDto';
import { ResidentsService } from '../services/residents.service';

@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Post()
  create(@Body() createResidentDto: CreateResidentDto) {
    return this.residentsService.create(createResidentDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.residentsService.findById(id);
  }

  @Get('apartment/:apartmentId')
  findByApartmentId(@Param('apartmentId') apartmentId: string) {
    return this.residentsService.findByApartmentId(apartmentId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidentDto: UpdateResidentDto,
  ) {
    return this.residentsService.update(id, updateResidentDto);
  }
}
