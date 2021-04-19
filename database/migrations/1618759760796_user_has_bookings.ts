import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserHasBookings extends BaseSchema {
  protected tableName = 'user_has_bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('booking_id').unsigned().references('id').inTable('bookings').onDelete('CASCADE')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
