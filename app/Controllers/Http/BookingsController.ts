import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from 'App/Models/Booking'
import Field from 'App/Models/Field'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BookingsController {
    public async index({response} : HttpContextContract)
    {
        const index = await Booking.query().preload('fields')
        // const a = 1
        return response.status(200).json(index)
    }
    public async store({request, response, auth} : HttpContextContract)
    {
        let userId = auth.user?.id
        let play_date_start = request.input('play_date_start')
        let play_date_end = request.input('play_date_end')
        let fields = await Field.query().where('name', request.input('field_id')).first()
        let field_id = fields?.id
        
        let store = await Booking.create({
            userId: userId,
            play_date_start: play_date_start,
            play_date_end: play_date_end,
            fieldId: field_id
        })
        await Database.table('user_has_bookings').insert({user_id : userId, booking_id : store.id})
        return response.created({"message": "berhasil booking lapangan", store})
    }

    public async show({params, response} : HttpContextContract)
    {
        const show = await Booking.query().where('field_id', params.field_id).preload('fields', (query) => {
            query.preload('venue')
        })
        return response.status(200).json(show)
    }

    public async update({request, response, params} : HttpContextContract)
    {
        const booking = await Booking.findOrFail(params.id)
        booking.play_date_start = request.input('play_date_start')
        booking.play_date_end = request.input('play_date_end')
        booking.save()
        return response.status(200).json({"message" : "berhasil merubah data", booking })
    }

    public async destroy({params, response} : HttpContextContract){
        const field = await Booking.findOrFail(params.id)
        await field.delete()
        return response.status(200).json({"message" : "berhasil menghapus data"})
    }
}
