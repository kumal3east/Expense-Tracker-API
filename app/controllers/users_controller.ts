import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async register({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create({ email: payload.email, password_hash: payload.password })
      const token = await auth.use('jwt').generate(user)
      return response.created({ user, token })
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  async login({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    //invalid case
    const user = await User.query().where('email', payload.email).firstOrFail()

    if (!(await hash.verify(user.password_hash, payload.password))) {
      return response.badRequest('Invalid credentials')
    }

    const token = await auth.use('jwt').generate(user)
    return response.ok({ token })
  }
}
