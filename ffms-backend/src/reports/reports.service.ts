import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepo: Repository<Transaction>,
  ) {}

  async getSummary(farmerId: number, from: string, to: string) {
    const totals = await this.transactionsRepo
      .createQueryBuilder('t')
      .select('t.type', 'type')
      .addSelect('SUM(t.amount)', 'total')
      .where('t.farmer.farmerId = :farmerId', { farmerId })
      .andWhere('t.transactionDate BETWEEN :from AND :to', { from, to })
      .groupBy('t.type')
      .getRawMany();

    const totalIncome = Number(totals.find(r => r.type === 'income')?.total ?? 0);
    const totalExpenses = Number(totals.find(r => r.type === 'expense')?.total ?? 0);
    const netProfit = totalIncome - totalExpenses;

    const breakdown = await this.transactionsRepo
      .createQueryBuilder('t')
      .leftJoin('t.category', 'c')
      .select('c.name', 'category')
      .addSelect('t.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(t.amount)', 'total')
      .where('t.farmer.farmerId = :farmerId', { farmerId })
      .andWhere('t.transactionDate BETWEEN :from AND :to', { from, to })
      .groupBy('c.name, t.type')
      .orderBy('SUM(t.amount)', 'DESC')
      .getRawMany();

    return {
      total_income: totalIncome,
      total_expenses: totalExpenses,
      net_profit: netProfit,
      income_breakdown: breakdown.filter(r => r.type === 'income'),
      expense_breakdown: breakdown.filter(r => r.type === 'expense'),
    };
  }

  async getTrends(farmerId: number, year: string) {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const monthlyData = await this.transactionsRepo
      .createQueryBuilder('t')
      .select('EXTRACT(MONTH FROM t.transactionDate)', 'month')
      .addSelect('t.type', 'type')
      .addSelect('SUM(t.amount)', 'total')
      .where('t.farmer.farmerId = :farmerId', { farmerId })
      .andWhere('t.transactionDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('EXTRACT(MONTH FROM t.transactionDate), t.type')
      .orderBy('month', 'ASC')
      .getRawMany();

    const incomeByMonth = new Array(12).fill(0);
    const expensesByMonth = new Array(12).fill(0);

    for (const row of monthlyData) {
      const monthIndex = parseInt(row.month) - 1;
      if (row.type === 'income') {
        incomeByMonth[monthIndex] = parseFloat(row.total);
      } else {
        expensesByMonth[monthIndex] = parseFloat(row.total);
      }
    }

    return {
      year: parseInt(year),
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      income: incomeByMonth,
      expenses: expensesByMonth,
    };
  }

  async generateCSV(farmerId: number, from: string, to: string): Promise<string> {
    const summary = await this.getSummary(farmerId, from, to);
    
    let csv = 'FFMS Financial Report\n';
    csv += `Period: ${from} to ${to}\n\n`;
    csv += `Total Income,${summary.total_income}\n`;
    csv += `Total Expenses,${summary.total_expenses}\n`;
    csv += `Net Profit,${summary.net_profit}\n\n`;
    
    csv += 'Income Breakdown\n';
    csv += 'Category,Count,Total\n';
    for (const item of summary.income_breakdown) {
      csv += `${item.category},${item.count},${item.total}\n`;
    }
    
    csv += '\nExpense Breakdown\n';
    csv += 'Category,Count,Total\n';
    for (const item of summary.expense_breakdown) {
      csv += `${item.category},${item.count},${item.total}\n`;
    }
    
    return csv;
  }
}
