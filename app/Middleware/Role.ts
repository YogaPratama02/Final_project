import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle ({response, auth}: HttpContextContract, next: () => Promise<void>) {
    const checkRole = auth.user?.role_id
    if(checkRole == 1){
      await next()
    }else{
      return response.unauthorized({"message" : "Anda tidak bisa mengakses halaman ini"})
    }
  }
}
