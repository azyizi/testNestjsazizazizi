import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculeAziz } from './vehicule.entity';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { VehiculeAzizGateway } from './vehiculeaziz.gateway';

@Injectable()
export class VehiculeAzizService {
  constructor(
    @InjectRepository(VehiculeAziz)
    private readonly repo: Repository<VehiculeAziz>,
    private readonly gateway: VehiculeAzizGateway,
  ) {}

  async create(data: CreateVehiculeDto) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent as any);
  }

  async findAll() {
    return this.repo.find();
  }

  private async findByIdString(id: string) {
    const list = await this.repo.find();
    return list.find((v: any) => v.id?.toString?.() === id) as VehiculeAziz | undefined;
  }

  async findOne(id: string) {
    const v = await this.findByIdString(id);
    if (!v) throw new NotFoundException('Vehicule not found');
    return v;
  }

  async remove(id: string) {
    const v = await this.findOne(id);
    const res = await this.repo.remove(v as any);
    if (v && v.available === false) {
      this.gateway.notifyUnavailable(v.id?.toString?.());
    }
    return res;
  }

  async update(id: string, data: UpdateVehiculeDto) {
    const v = await this.findOne(id);
    const wasAvailable = v.available;
    Object.assign(v, data as any);
    const saved = await this.repo.save(v as any);
    if (wasAvailable && saved.available === false) {
      this.gateway.notifyUnavailable(saved.id?.toString?.());
    }
    return saved;
  }

  async search(brand?: string, model?: string) {
    const list = await this.repo.find();
    return list.filter((v: any) => {
      if (brand && model) return v.brand === brand && v.model === model;
      if (brand) return v.brand === brand;
      if (model) return v.model === model;
      return true;
    });
  }

  async calculateRent(id: string, days: number) {
    const v = await this.findOne(id);
    return { total: v.pricePerDay * days };
  }

  async recent() {
    const list = await this.repo.find();
    return list.filter((v: any) => v.year > 2020);
  }

  async total() {
    const list = await this.repo.find();
    return list.filter((v: any) => v.available === true).length;
  }
}
