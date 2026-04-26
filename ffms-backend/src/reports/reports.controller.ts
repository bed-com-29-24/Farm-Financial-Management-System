import { Controller, Get, Query, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ReportsService } from './reports.service';
import { ReportQueryDto, TrendQueryDto } from './dto/report-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentFarmer } from '../common/decorators/current-farmer.decorator';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('summary')
  getSummary(@CurrentFarmer() farmer: { farmerId: number }, @Query() query: ReportQueryDto) {
    return this.reportsService.getSummary(farmer.farmerId, query.from, query.to);
  }

  @Get('trends')
  getTrends(@CurrentFarmer() farmer: { farmerId: number }, @Query() query: TrendQueryDto) {
    return this.reportsService.getTrends(farmer.farmerId, query.year);
  }

  @Get('export')
  async exportReport(
    @CurrentFarmer() farmer: { farmerId: number },
    @Query() query: ReportQueryDto,
    @Res() res: Response,
  ) {
    const { from, to, format = 'csv' } = query;
    
    if (format === 'csv') {
      const csv = await this.reportsService.generateCSV(farmer.farmerId, from, to);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=report_${from}_to_${to}.csv`);
      return res.send(csv);
    } else {
      res.status(501).json({ message: 'PDF export coming soon' });
    }
  }

  @Get('dashboard/summary')
  getDashboardSummary(@CurrentFarmer() farmer: { farmerId: number }, @Query('from') from: string, @Query('to') to: string) {
    return this.reportsService.getSummary(farmer.farmerId, from, to);
  }

  @Get('dashboard/charts')
  getDashboardCharts(@CurrentFarmer() farmer: { farmerId: number }, @Query('year') year: string) {
    return this.reportsService.getTrends(farmer.farmerId, year);
  }
}