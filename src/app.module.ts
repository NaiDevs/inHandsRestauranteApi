import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './controllers/health/health.module';

// Importar todos los módulos de la aplicación
// import { AuthModule } from './controllers/auth/auth.module';
// import { BrandsModule } from './controllers/brands/brands.module';
// import { CategoriesModule } from './controllers/categories/categories.module';
// import { ConfigsModule } from './controllers/configs/configs.module';
// import { InvoicesModule } from './controllers/invoices/invoices.module';
// import { LocationModule } from './controllers/location/location.module';
// import { OrdersModule } from './controllers/orders/orders.module';
// import { ProductsModule } from './controllers/products/products.module';
// import { QuotesModule } from './controllers/quotes/quotes.module';
// import { ReportsModule } from './controllers/reports/reports.module';
// import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      name: 'dbinhands',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        name: 'dbinhands',
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/database/dbinhandsRestaurante/**/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: false,
      }),
    }),

  // Módulos de la aplicación
  HealthModule,
  // AuthModule,
  // BrandsModule,
  // CategoriesModule,
  // ConfigsModule,
  // InvoicesModule,
  // LocationModule,
  // OrdersModule,
  // ProductsModule,
  // QuotesModule,
  // ReportsModule,
  // UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
