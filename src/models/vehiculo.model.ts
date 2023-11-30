import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {Categoria} from './categoria.model';
import {CategoriaVehiculo} from './categoria-vehiculo.model';
import {Foto} from './foto.model';
import {Proveedor} from './proveedor.model';

@model({
  settings: {
    foreignkeys: {
      fk_vehiculo_id_proveedor: {
        name: 'fk_vehiculo_id_proveedor',
        entity: 'Proveedor',
        entitykey: 'id',
        foreignkey: 'id_proveedor'
      },
      fk_vehiculo_id_marca: {
        name: 'fk_vehiculo_id_marca',
        entity: 'Marca',
        entitykey: 'id',
        foreignkey: 'id_marca'
      }
    }
  }
})
export class Vehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_chars: string;

  @property({
    type: 'number',
    required: true,
  })
  serie_motor: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
    defaut: 0
  })
  descuento: number;

  @property({
    type: 'boolean',
    default: true,
  })
  estado?: boolean;

  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaVehiculo, keyFrom: 'id_vehiculo', keyTo: 'id_categoria'}})
  categorias: Categoria[];

  @hasMany(() => Foto, {keyTo: 'id_vehiculo'})
  fotos: Foto[];

  @belongsTo(() => Proveedor, {name: 'proveedor'})
  id_proveedor: number;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
