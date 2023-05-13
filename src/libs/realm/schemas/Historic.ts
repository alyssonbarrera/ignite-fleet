/* eslint-disable no-use-before-define */
import { Realm } from '@realm/react'

type GenerateProps = {
  user_id: string
  description: string
  license_plate: string
}

export class Historic extends Realm.Object<Historic> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  status!: string
  updated_at!: Date
  created_at!: Date

  static generate({ user_id, description, license_plate }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      description,
      license_plate,
      status: 'departure',
      updated_at: new Date(),
      created_at: new Date(),
    }
  }

  static schema = {
    name: 'Historic',
    primaryKey: 'id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      status: 'string',
      updated_at: 'date',
      created_at: 'date',
    },
  }
}
