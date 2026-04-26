import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transactions.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentFarmer } from '../common/decorators/current-farmer.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(@CurrentFarmer() farmer: { farmerId: number }, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(farmer.farmerId, dto);
  }

  @Get()
  findAll(@CurrentFarmer() farmer: { farmerId: number }, @Query() query: TransactionQueryDto) {
    return this.transactionsService.findAll(farmer.farmerId, query);
  }

  @Get(':id')
  findOne(@CurrentFarmer() farmer: { farmerId: number }, @Param('id') id: string) {
    return this.transactionsService.findOne(farmer.farmerId, +id);
  }

  @Put(':id')
  update(@CurrentFarmer() farmer: { farmerId: number }, @Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    return this.transactionsService.update(farmer.farmerId, +id, dto);
  }

  @Delete(':id')
  remove(@CurrentFarmer() farmer: { farmerId: number }, @Param('id') id: string) {
    return this.transactionsService.remove(farmer.farmerId, +id);
  }
}