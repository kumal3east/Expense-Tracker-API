import Expense from '#models/expense'
import { createValidator, readValidator } from '#validators/expense'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ExpensesController {
  async create({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createValidator)
      const expense = await Expense.create({
        user_id: auth.user?.id,
        title: payload.title,
        amount: payload.amount,
        date_of_expense: DateTime.fromISO(payload.date_of_expense.toISOString()).toJSDate(),
        category: payload.category,
        notes: payload.notes,
      })

      return response.ok(expense)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
  async read({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(readValidator)
      const expenses = Expense.query().where('user_id', auth.user!.id)
      if (payload.category) {
        expenses.where('category', payload.category)
      }
      if (payload.start_date && payload.end_date) {
        expenses.whereBetween('date_of_expense', [payload.start_date, payload.end_date])
      }
      return response.ok(await expenses)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
  // async update({ request, response, auth }: HttpContext) {}
  // async delete({ request, response, auth }: HttpContext) {}
  // async report({ request, response, auth }: HttpContext) {}
}
