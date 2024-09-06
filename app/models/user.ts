import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import Expense from '#models/expense'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password_hash: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password_hash) {
      user.password_hash = await hash.make(user.password_hash)
    }
  }

  @hasMany(() => Expense)
  declare expenses: HasMany<typeof Expense>
}
