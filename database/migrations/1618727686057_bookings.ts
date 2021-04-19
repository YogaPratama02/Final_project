import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.dateTime('play_date_start')
      table.dateTime('play_date_end')
      table.integer('field_id').unsigned().references('id').inTable('fields').onDelete('CASCADE')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
