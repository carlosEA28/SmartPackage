import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePackageDto } from '../dto/create-package.dto';
import { WithdrawPackageDto } from '../dto/withdraw-package.dto';
import { PackagesService } from '../services/packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() createDto: CreatePackageDto) {
    return this.packagesService.create(createDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.packagesService.findById(id);
  }

  @Get('apartment/:apartmentId')
  findByApartmentId(@Param('apartmentId') apartmentId: string) {
    return this.packagesService.findByApartmentId(apartmentId);
  }

  @Get('apartment/:apartmentId/available')
  findAvailable(@Param('apartmentId') apartmentId: string) {
    return this.packagesService.findAvailableByApartmentId(apartmentId);
  }

  @Post(':id/withdraw')
  withdraw(@Param('id') id: string, @Body() withdrawDto: WithdrawPackageDto) {
    return this.packagesService.withdraw(id, withdrawDto);
  }
}
