import Expense from '#models/expense'
import {
  createValidator,
  deleteValidator,
  readValidator,
  reportValidator,
  updateValidator,
} from '#validators/expense'
import type { HttpContext } from '@adonisjs/core/http'
// import { DateTime } from 'luxon'

export default class ExpensesController {
  async create({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createValidator)
      const expense = await Expense.create({
        user_id: auth.user!.id,
        title: payload.title,
        amount: payload.amount,
        date_of_expense: new Date(payload.date_of_expense), //
        category: payload.category,
        notes: payload.notes,
      })

      return response.created(expense)
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
      let result = await expenses.paginate(payload.page, payload.limit)
      return response.ok(result)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
  async update({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateValidator)
      let expense = await Expense.query().where('id', payload.id).first()
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
      let expense = await Expense.query().where('id', payload.id).first()
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
      let expenses = await Expense.query()
        .where('user_id', auth.user!.id)
        .whereBetween('date_of_expense', [payload.start_date, payload.end_date])
        .select('category')
        .groupBy('category')
        .sum('amount')
        .as('total')

      const result = expenses.map((expense) => {
        return {
          category: expense.category,
          total: expense.$extras.total || expense.$extras.sum,
        }
      })
      return response.ok(result)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}
