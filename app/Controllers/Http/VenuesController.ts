import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Venue from 'App/Models/Venue'

export default class VenuesController {

  /**
   * @swagger
   * /venue/:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Venue
   *    summary: Get All Venue
   *    responses:
   *      200:
   *        description: success get all venue
   *        content:
   *          application/x-www-form-urlencoded:
   *            schemas:
   *              message:
   *                type: string
   *                example:
   *                  message: success fetch venue
   *              data:
   *                type: array
   *                items:
   *                  type: object
   *                  properties:
   *                    id: integer
   *                    name: string
   *                    address: string
   *                    phone: string
   *                example:
   *                  - id: 1
   *                  - name: "Stadion Gede Bage"
   *                  - address: "Bandung"
   *                  - phone: "081381517193"
   */
    public async index({response}: HttpContextContract)
    {
        // mengetahui user yang terautentikasi
        // const user = auth.user?.name
        const venues = await Venue.query().preload('bookings')
        return response.status(200).json(venues)
    }

    /**
     * @swagger
     * /venue/store:
     *  post:
     *     security:
     *         - bearerAuth: []
     *     tags:
     *         - Add Venue
     *     summary: Store Venue
     *     requestBody:
     *         required: true
     *         content:
     *             application/x-www-form-urlencoded:
     *                 schema:
     *                    $ref: '#definitions/Venue'
     *     responses:
     *         201:
     *             description: Successfully Add Venue
     *         422:
     *             description: request invalid
     */

    public async store({request, response}: HttpContextContract)
    {
        let name = request.input('name')
        let address = request.input('address')
        let phone = request.input('phone')

        const venues = await Venue.create({
            name : name,
            address : address,
            phone : phone,
        });

        return response.created({"message" : "berhasil menyimpan data", venues})
    }

  /**
   * @swagger
   * /venue/show/{id}:
   *  get:
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Venue Params
   *    summary: Show All Venue Based on id
   *    responses:
   *      200:
   *        description: success get all venue
   *      401:
   *        description: unauthorized, token needed
   *        content:
   *          application/x-www-form-urlencoded:
   *            schemas:
   *              message:
   *                type: string
   *                example:
   *                  message: success fetch venue
   *              data:
   *                type: array
   *                items:
   *                  type: object
   *                  properties:
   *                    id: integer
   *                    name: string
   *                    address: string
   *                    phone: string
   *                example:
   *                  - id: 1
   *                  - name: "Stadion Gede Bage"
   *                  - address: "Bandung"
   *                  - phone: "081381517193"
   */

    public async show({params, response}: HttpContextContract)
    {
        const show = await Venue.query().where('id', params.id).preload('bookings')
        return response.status(200).json(show)
    }

    /**
     * @swagger
     * /venue/update/{id}:
     *  put:
     *     parameters:
     *        - in: path
     *          name: id
     *          required: true
     *     security:
     *         - bearerAuth: []
     *     tags:
     *         - Update Venue
     *     summary: Update Venue
     *     requestBody:
     *         required: true
     *         content:
     *             application/x-www-form-urlencoded:
     *                 schema:
     *                    $ref: '#definitions/Venue'
     *     responses:
     *         201:
     *             description: Successfully Update Venue
     *         422:
     *             description: request invalid
     */

    public async update({params, request, response}: HttpContextContract)
    {
        const venues = await Venue.findOrFail(params.id)
        venues.name = request.input('name')
        venues.address = request.input('address')
        venues.phone = request.input('phone')
        venues.save()
        return response.status(200).json({"message" : "berhasil merubah data", venues })
    }

    /**
   * @swagger
   * /venue/delete/{id}':
   *   delete:
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Delete Data Venue
   *    summary: Delete Data Based on id
   *    responses:
   *      200:
   *        description: success delete venue
   *      401:
   *        description: unauthorized, token needed
   *        content:
   *          application/x-www-form-urlencoded:
   *            schemas:
   *              message:
   *                type: string
   *                example:
   *                  message: success delete venue
   */
    public async destroy({params, response} : HttpContextContract){
        const venue = await Venue.findOrFail(params.id)
        await venue.delete()
        return response.status(200).json({"message" : "berhasil menghapus data"})
    }
}
