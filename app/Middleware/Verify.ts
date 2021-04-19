import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Verify {
  public async handle ({response, auth}: HttpContextContract, next: () => Promise<void>) {
    let isVerified = auth.user?.is_verified
    if(isVerified){
      await next()
    }else{
      return response.unauthorized({"message" : "Your Account is not verified"})
    }
  }
}
