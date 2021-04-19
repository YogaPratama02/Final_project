import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasManyThrough, HasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import Field from './Field'
import Booking from './Booking'

/**
*  @swagger
*  definitions:
*    Venue:
*      type: object
*      properties:
*        id:
*          type: integer
*        name:
*          type: string
*        address:
*          type: string
*        phone:
*          type: string
*      required:
*        - name
*        - address
*        - phone
*/

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name : string

  @column()
  public address : string

  @column()
  public phone :string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Field)
  public fields: HasMany<typeof Field>

  @hasManyThrough([() => Booking, () => Field])
  public bookings: HasManyThrough<typeof Booking>
}
