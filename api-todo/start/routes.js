'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', (req, res) => {
	return 'This is the home page'
})

Route.group(() => {
	Route.get('/', () => {
		return { message: 'Saipos ToDo API Challenge by Guilherme Marques' }
	})

	Route.resource('tasks', 'TaskController')
		.validator((new Map([
			[['tasks.store'], ['StoreTask']],
			[['tasks.update'], ['UpdateTask']]
		])))

	Route.post('randogs', 'TaskController.randomTasks')

}).prefix('v1')
