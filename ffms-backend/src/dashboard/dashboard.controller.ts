import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentFarmer } from '../common/decorators/current-farmer.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly reportsService: ReportsService) {}

  //  SUMMARY (requires date range)
  @Get('summary')
  getSummary(
    @CurrentFarmer() farmer: any,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.reportsService.getSummary(farmer.farmerId, from, to);
  }

  //  TRENDS (year-based chart)
  @Get('trends')
  getTrends(
    @CurrentFarmer() farmer: any,
    @Query('year') year: string,
  ) {
    return this.reportsService.getTrends(farmer.farmerId, year);
  }

  //  CSV EXPORT
  @Get('export')
  async exportCSV(
    @CurrentFarmer() farmer: any,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const csv = await this.reportsService.generateCSV(
      farmer.farmerId,
      from,
      to,
    );

    return {
      message: 'CSV generated successfully',
      data: csv,
    };
  }
}