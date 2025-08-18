import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { HealthModule } from './controllers/health/health.module';
import { AuthModule } from './controllers/auth/auth.module';
import { ProductCategoryModule } from './controllers/productCategory/productCategory.module';
import { ProductBrandModule } from './controllers/productBrand/productBrand.module';
import { DishCategoryModule } from './controllers/dishCategory/dishCategory.module';
import { RawMaterialCategoryModule } from './controllers/rawMaterialCategory/rawMaterialCategory.module';

@Module({
  imports: [
    // Config global
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a Postgres (Render + local)
    TypeOrmModule.forRootAsync({
      name: 'dbinhands',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get<string>('NODE_ENV') === 'production';

        // Si tienes DATABASE_URL en Render, úsala;
        // si no, caes a host/port/user/pass/name.
        const databaseUrl = config.get<string>('DATABASE_URL');

        // Render Postgres suele requerir SSL
        const useSSL = config.get<string>('DB_SSL') === 'true';

        return {
          name: 'dbinhands',
          type: 'postgres' as const,
          ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT') ?? 5432,
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASS'),
                database: config.get<string>('DB_NAME'),
              }),

          // En desarrollo puedes tener .ts, en producción .js bajo /dist
          entities: [
            // ajusta el path si tus entidades no usan .entity
            join(__dirname, 'database/dbinhandsRestaurante/**/*.entity.{ts,js}'),
            join(__dirname, 'database/dbinhandsRestaurante/**/*.{ts,js}'),
          ],

          // No sincronices en prod salvo que sea intencional
          synchronize: false,
          migrationsRun: false,

          // SSL para Render (relaja el cert)
          ssl: useSSL,
          extra: useSSL ? { ssl: { rejectUnauthorized: false } } : undefined,

          // Opcional pero útil para Nest + TypeORM
          // autoLoadEntities: true, // usa esto si registras entidades via @Entity en módulos
          // logging: isProd ? ['error', 'warn'] : ['query', 'error', 'warn'],
        };
      },
    }),

  // Resto de módulos de la app (actívalos cuando quieras)
  HealthModule,
  AuthModule,
  DishCategoryModule,
  ProductCategoryModule,
  ProductBrandModule,
  RawMaterialCategoryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
