import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Venues extends BaseSchema {
  protected tableName = 'venues'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('address')
      table.string('phone')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
