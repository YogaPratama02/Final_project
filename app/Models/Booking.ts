import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Field from './Field'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column.date()
  public play_date_start:  DateTime

  @column.date()
  public play_date_end: DateTime

  @column()
  public fieldId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Field)
  public fields: BelongsTo<typeof Field>
}
