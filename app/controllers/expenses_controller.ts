import Expense from '#models/expense'
import { createValidator } from '#validators/expense'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExpensesController {
  async create({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(createValidator)
    const expense = await Expense.create({
      user_id: auth.user?.id,
      title: payload.title,
      amount: payload.amount,
      date_of_expense: new Date(payload.date_of_expense),
      category: payload.category,
      notes: payload.notes,
    })

    return expense
  }
  async read({ request }: HttpContext) {}
  async update({ request }: HttpContext) {}
  async delete({ request }: HttpContext) {}
  async report({ request }: HttpContext) {}
}
