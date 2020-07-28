'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('../../Services/TaskService')} */
const TaskService = use('TaskService')

const Config = use('Config')
const Task = use('App/Models/Task')
const Ws = use('Ws')

const service = new TaskService()


/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {

	/**
	 * Show a list of all tasks.
	 * GET tasks
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async index({ request, response }) {
		return await Task.all()
	}

	/**
	 * Create/save a new task.
	 * POST tasks
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		const task = new Task()

		Object.assign(task, request.only(['description', 'email', 'responsible']))

		task.email = await service.getValidEmail(task.email)

		await task.save()
		await task.reload()

		return response.created({ data: task, message: 'A new task was successfully added!' })
	}

	/**
	 * Display a single task.
	 * GET tasks/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async show({ params, request, response }) {
		const task = await Task.findOrFail(params.id)
		return response.json(task)
	}

	/**
	 * Update task details.
	 * PUT or PATCH tasks/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {

		const task = await Task.findOrFail(params.id)

		Object.assign(task, request.only(['concluded']))

		service.validateTaskUpdate(task, request.header('saipos-pass'))

		await task.save()
		await task.reload()

		let status = 'undone'
		if (task.concluded) {
			status = 'done'
		}

		return response.ok({ data: task, message: `A task was successfully checked as ${status}!` })
	}

	/**
	 * Delete a task with id.
	 * DELETE tasks/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
	}

	/**
	 * Create/save three new randomic tasks.
	 * POST randogs
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async randomTasks({ request, response }) {
		const facts = await service.getFacts()

		const randomlyTasks = await Promise.all(facts.map(async (fact) => {
			const task = new Task()
			Object.assign(task, {
				responsible: 'Eu',
				email: 'eu@me.com',
				description: fact.text
			})
			await task.save()
			return task;
		}))

		return response.created({ data: randomlyTasks, message: `Was successfully added ${randomlyTasks.length} new tasks!` })
	}
}

module.exports = TaskController
