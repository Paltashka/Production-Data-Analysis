import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { PartsModule } from './parts/parts.module';
import { PiecesModule } from './pieces/pieces.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'db2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    OrdersModule,
    PartsModule,
    PiecesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
