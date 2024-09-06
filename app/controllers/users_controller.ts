import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async register({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const hashedPassword = await hash.make(payload.password)
    const user = await User.create({ email: payload.email, password_hash: hashedPassword })
    const token = await auth.use('jwt').generate(user)
    return { user, token }
  }

  // async login({ request, response, auth }: HttpContext) {
  //   const payload = await request.validateUsing(loginValidator)
  //   console.log(payload)

  //   //invalid case
  //   const user = await User.query().where('email', payload.email).firstOrFail()
  //   if (!(await hash.verify(user.password_hash, payload.password))) {
  //     return response.badRequest('Invalid credentials')
  //   }

  //   const token = await auth.use('jwt').generate(user)
  //   return response.ok({ token })
  // }
}
