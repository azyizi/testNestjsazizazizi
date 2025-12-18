import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculeAzizModule } from './vehiculeaziz/vehiculeaziz.module';
import { VehiculeAziz } from './vehiculeaziz/vehicule.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import {ServeStaticModule} from '@nestjs/serve-static'
import {join} from 'path'

@Module({
  imports: [

        ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot:'/chat'
    }),

    TypeOrmModule.forRoot({
    type:'mongodb',
    host:'localhost',
    port:27017,
    database:'locationA',
    entities:[VehiculeAziz],
    synchronize:true
  }),
    VehiculeAzizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
