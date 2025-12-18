import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
@Injectable()
export class VehiculeAzizGateway {
  @WebSocketServer()
  server: Server;

  notifyUnavailable(vehicleId: string) {
    try {
      this.server.emit('vehicle_unavailable', { id: vehicleId });
    } catch (e) {
      
    }
  }
}
