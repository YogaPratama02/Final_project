import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController
{
    /**
     *
     * @swagger
     * /auth/register:
     *  post:
     *     tags:
     *         - Authentication
     *     requestBody:
     *         required: true
     *         content:
     *             application/x-www-form-urlencoded:
     *                 schema:
     *                    $ref: '#definitions/User'
     *     responses:
     *         201:
     *             description: Berhasil
     *         422:
     *             description: request invalid
     */
    public async register({request, response} : HttpContextContract){
        const otpRandom = Math.floor(100000 + Math.random() * 900000)
        const name = request.input('name')
        const email = request.input('email')
        const password = request.input('password')
        const role_id = 2
        let newUser = await User.create({name, email, password, role_id})
        await Database.table('otp_codes').insert({otp_code : otpRandom, user_id: newUser.id})
        await Mail.send((message) => {
            message
              .from('admin@example.com')
              .to(email)
              .subject('Welcome Onboard!')
              .htmlView('email/otp_verification', { otpRandom })
          })
        return response.created({"message" : "Register Success, Please Verify Your OTP Code!"})
    }

    /**
     *
     * @swagger
     * /auth/login:
     *  post:
     *     tags:
     *         - Login
     *     requestBody:
     *         required: true
     *         content:
     *             application/x-www-form-urlencoded:
     *                 schema:
     *                    type: object
     *                    properties:
     *                      id:
     *                         type: integer
     *                      email:
     *                         type: string
     *                      password:
     *                         type: string
     *     responses:
     *         201:
     *             description: Successfully Login
     *         422:
     *             description: request invalid
     *         400:
     *             descriptipn: bad request
     */

    public async login ({ request, auth, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        const token = await auth.use('api').attempt(email, password)
        return response.status(200).json({"message" : "Login Success", token})
    }

    /**
     *
     * @swagger
     * /auth/verification:
     *  post:
     *     tags:
     *         - OTP Verification
     *     requestBody:
     *         required: true
     *         content:
     *             application/x-www-form-urlencoded:
     *                 schema:
     *                    type: object
     *                    properties:
     *                      id:
     *                         type: integer
     *                      otp_code:
     *                         type: integer
     *                      email:
     *                         type: string
     *     responses:
     *         201:
     *             description: Successfully Verification
     *         422:
     *             description: request invalid
     *         400:
     *             descriptipn: bad request
     */

    public async otpVerified({request, response}: HttpContextContract){
        let otp_code = request.input('otp_code')
        let email = request.input('email')

        let user = await User.findBy('email', email)
        let otpCheck = await Database.query().from('otp_codes').where('otp_code', otp_code).first()
        if(user?.id == otpCheck.user_id)
        {
            user.is_verified = true
            await user?.save()
            return response.status(200).json({"message" : "Successfully Verification OTP"})
        }else{
            return response.status(400).json({"message" : "Your OTP is invalid"})
        }
    }
}
