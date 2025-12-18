import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculeAziz } from './vehicule.entity';
import { VehiculeAzizService } from './vehiculeaziz.service';
import { VehiculeAzizController } from './vehiculeaziz.controller';
import { VehiculeAzizValidationMiddleware } from './vehiculeaziz-validation.middleware';
import { VehiculeAzizGateway } from './vehiculeaziz.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculeAziz])],
  controllers: [VehiculeAzizController],
  providers: [VehiculeAzizService, VehiculeAzizGateway],
})
export class VehiculeAzizModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VehiculeAzizValidationMiddleware)
      .forRoutes(
        { path: 'vehiculeaziz/create', method: RequestMethod.POST },
        { path: 'vehiculeaziz/UpdateVehicle/:id', method: RequestMethod.PUT },
      );
  }
}
