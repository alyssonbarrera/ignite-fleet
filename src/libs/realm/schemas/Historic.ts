/* eslint-disable no-use-before-define */
import { Realm } from '@realm/react'
import { randomUUID } from 'expo-crypto'
import { CoordsSchemaProps } from './Coords'

type GenerateProps = {
  user_id: string
  description: string
  license_plate: string
  coords: CoordsSchemaProps[]
}

export class Historic extends Realm.Object<Historic> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  coords!: CoordsSchemaProps[]
  status!: string
  updated_at!: Date
  created_at!: Date

  static generate({
    user_id,
    description,
    license_plate,
    coords,
  }: GenerateProps) {
    return {
      _id: randomUUID(),
      user_id,
      description,
      license_plate,
      coords,
      status: 'departure',
      updated_at: new Date(),
      created_at: new Date(),
    }
  }

  static schema = {
    name: 'Historic',
    primaryKey: '_id',

    properties: {
      _id: 'string',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      coords: {
        type: 'list',
        objectType: 'Coords',
      },
      status: 'string',
      updated_at: 'date',
      created_at: 'date',
    },
  }
}
