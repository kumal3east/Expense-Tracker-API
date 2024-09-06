import Expense from '#models/expense'
import {
  createValidator,
  deleteValidator,
  readValidator,
  reportValidator,
  updateValidator,
} from '#validators/expense'
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
  async update({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateValidator)
      const expense = await Expense.query().where('id', payload.id).first()
      if (expense!.user_id != auth.user!.id) {
        return response.forbidden('You do not have permission to modify this data.')
      }
      expense!.merge(payload)
      await expense!.save()
      return response.ok(expense)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
  async delete({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(deleteValidator)
      const expense = await Expense.query().where('id', payload.id).first()
      if (expense!.user_id != auth.user!.id) {
        return response.forbidden('You do not have permission to modify this data.')
      }
      await expense!.delete()
      return response.ok('Deleted')
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
  async report({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(reportValidator)
      const expenses = await Expense.query()
        .where('user_id', auth.user!.id)
        .whereBetween('date_of_expense', [payload.start_date, payload.end_date])
        .select('category')
        .groupBy('category')
        .sum('amount')
        .as('total')
        .finally()

      const res = expenses.map((expense) => {
        return {
          category: expense.category,
          total: expense.$extras.total || expense.$extras.sum, // Ensure `total` from extras is included
        }
      })
      return response.ok(res)
    } catch (error) {
      console.log(error)

      return response.status(error.status).json(error)
    }
  }
}
