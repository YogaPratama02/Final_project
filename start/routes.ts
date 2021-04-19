/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.get('/api/hello', 'TestsController.hello').as('hello')

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('auth.login')
  Route.post('/register', 'AuthController.register').as('auth.register')
  Route.post('/verification', 'AuthController.otpVerified').as('auth.verified')
}).prefix('/auth').as('auth')

Route.group(() => {
  Route.get('/', 'VenuesController.index').as('venue.index')
  Route.post('/store', 'VenuesController.store').as('venue.store')
  Route.get('/show/:id', 'VenuesController.show').as('venue.show')
  Route.put('/update/:id', 'VenuesController.update').as('venue.update')
  Route.delete('/delete/:id', 'VenuesController.destroy').as('venue.destroy')
}).prefix('/venue').as('venue').middleware(['auth', 'verify', 'role'])

Route.group(() => {
  Route.get('/:venue_id', 'FieldsController.index').as('field.index')
  Route.post('/store/:venue_id', 'FieldsController.store').as('field.store')
  Route.get('/show/:id', 'FieldsController.show').as('field.show')
  Route.put('/update/:id', 'FieldsController.update').as('field.update')
  Route.delete('/delete/:id', 'FieldsController.destroy').as('field.destroy')
}).prefix('/field').as('field').middleware(['auth', 'verify'])

Route.group(() => {
  Route.get('/', 'BookingsController.index').as('booking.index')
  Route.post('/store', 'BookingsController.store').as('booking.store')
  Route.get('/show/:field_id', 'BookingsController.show').as('booking.show')
  Route.put('/update/:id', 'BookingsController.update').as('booking.update')
  Route.delete('/delete/:id', 'BookingsController.destroy').as('booking.destroy')
}).prefix('/booking').as('booking').middleware(['auth', 'verify'])
