import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { FarmersModule } from './farmers/farmers.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ReportsModule } from './reports/reports.module';
import { NotificationsModule } from './notifications/notifications.module';

import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    // =========================
    // ENV CONFIG (GLOBAL)
    // =========================
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // =========================
    // DATABASE CONFIG
    // =========================
    TypeOrmModule.forRoot(databaseConfig()),

    // =========================
    // FEATURE MODULES
    // =========================
    AuthModule,
    FarmersModule,
    CategoriesModule,
    TransactionsModule,
    ReportsModule,
    NotificationsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}