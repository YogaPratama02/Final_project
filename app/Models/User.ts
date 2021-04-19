import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

/**
*  @swagger
*  definitions:
*    User:
*      type: object
*      properties:
*        id:
*          type: integer
*        name:
*          type: string
*        email:
*          type: string
*        password:
*          type: string
*      required:
*        - name
*        - email
*        - password
*/

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public is_verified: boolean

  @column()
  public role_id : number

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @belongsTo(() => Role)
  public roles: BelongsTo<typeof Role>
}
