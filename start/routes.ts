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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
// User Management Routes
router.post('/register', [UsersController, 'register'])
// router.post('/login', [UsersController, 'login'])

// Group routes for Expense Management and Reporting
router.group(() => {
  // Expense Management Routes
  router.post('/expenses', [ExpensesController, 'create']) // create an expense
  router.get('/expenses', [ExpensesController, 'index']) // get a list of expenses
  router.put('/expenses/:id', [ExpensesController, 'update']) // update an expense
  router.delete('/expenses/:id', [ExpensesController, 'delete']) // delete an expense

  // Reporting Route
  router.get('/expenses/report', [ExpensesController, 'report']) // Generate a report by category for a given date range
})
// .middleware('auth') // Protect these routes with JWT-based authentication
