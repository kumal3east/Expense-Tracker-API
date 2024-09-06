/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ExpensesController from '#controllers/expenses_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    // User Management Routes
    router
      .group(() => {
        router.post('/register', [UsersController, 'register'])
        router.post('/login', [UsersController, 'login'])
      })
      .prefix('user')
    // Group routes for Expense Management and Reporting
    router
      .group(() => {
        // Expense Management Routes
        router.post('/create', [ExpensesController, 'create']) // create an expense
        router.post('/search', [ExpensesController, 'search']) // get a list of expenses
        router.put('/update/', [ExpensesController, 'update']) // update an expense
        router.delete('/delete/', [ExpensesController, 'delete']) // delete an expense

        // Reporting Route
        router.get('/report', [ExpensesController, 'report']) // Generate a report by category for a given date range
      })
      .prefix('expenses')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
