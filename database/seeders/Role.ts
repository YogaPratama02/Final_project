import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    await Role.createMany([
      {
        name: 'Admin',
      },
      {
        name: 'User'
      }
    ])

    await User.createMany([
      {
        name: 'Yoga',
        email: 'yoga@gmail.com',
        password: 'yoga12345',
        is_verified: true,
        role_id: 1
      }
    ])
  }
}
