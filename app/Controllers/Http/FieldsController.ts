import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Field from 'App/Models/Field'

export default class FieldsController {
    public async index({params, response} : HttpContextContract){
        const index = await Field.query().where('venue_id', params.venue_id)
        return response.status(200).json(index)
    }

    public async store({params, request, response} : HttpContextContract)
    {
        const aboutSchema = schema.create({
            name : schema.string(),
            type : schema.enum(['futsal', 'mini soccer', 'basketball']),
        });
        let venueId  = params['venue_id']
        const data = await request.validate({
            schema : aboutSchema,
            messages : {
                'name.required' : 'nama harus diisi!',
                'type.required'  : 'type harus diisi',
            },
        });
        const field = await Field.create({
            name: data.name,
            type: data.type,
            venueId: venueId
        })
        return response.created({"message" : "berhasil menyimpan data", field})
    }

    public async show({params, response} : HttpContextContract)
    {
        const fields = await Field.find(params.id)
        return response.status(200).json(fields)
    }

    public async update({request, response, params} : HttpContextContract)
    {
        const fields = await Field.findOrFail(params.id)
        fields.name = request.input('name')
        fields.type = request.input('type')
        fields.venueId = params['venue_id']
        fields.save()
        return response.status(200).json({"message" : "berhasil merubah data", fields })
    }

    public async destroy({params, response} : HttpContextContract){
        const field = await Field.findOrFail(params.id)
        await field.delete()
        return response.status(200).json({"message" : "berhasil menghapus data"})
    }
}
