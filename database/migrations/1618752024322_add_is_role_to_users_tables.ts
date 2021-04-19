import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('role_id')
    })
  }
}
