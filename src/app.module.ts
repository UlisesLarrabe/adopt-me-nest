import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsModule } from './pets/pets.module';
import { AdoptionsModule } from './adoptions/adoptions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
      }),
    }),
    UsersModule,
    PetsModule,
    AdoptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
