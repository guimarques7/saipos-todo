'use strict';

/** @type {typeof import('../Models/Task')} */
const Task = use('App/Models/Task')
const Config = use('Config')
const JsonException = use('App/Exceptions/JsonException')
const axios = use('axios')

const saiposPassword = Config.get('saipos.supervisorPass')
const mailBoxKey = Config.get('saipos.mailBoxKey')
const mailBoxUrl = Config.get('saipos.mailBoxUrl')
const catFactUrl = Config.get('saipos.catFactUrl')

let validatingTask
let validatingPassword

class TaskService {

	/**
	 * @param {Task} task
	 * @param {String} password
	 */
	initializeService(task, password) {
		if (!task || !(task instanceof Task)) {
			this.handleError('You should pass a valid instance of Task')
		}

		validatingTask = task
		validatingPassword = password
	}

	async getValidEmail(email) {
		const url = `${mailBoxUrl}?access_key=${mailBoxKey}&email=${email}`

		const res = await axios.get(url)

		if (res.status !== 200) {
			return 'mailbox@expirou.com'
		}

		if (!res.data.mx_found) {
			return res.data.did_you_mean
		}
		return email
	}

	async getFacts(animal = 'dog', number = 3) {
		const url = `${catFactUrl}?animal_type=${animal}&amount=${number}`

		const res =  await axios.get(url);

		return res.data
	}

	/**
	 * @param {Task} task
	 * @param {String} password
	 */
	validateTaskUpdate(task, password = '') {

		this.initializeService(task, password)

		if (!this.isTaskValidToBeUpdated()) {
			this.handleError('This Task could not be updated.', 409)
		}

		if (validatingTask.isTaskBeenUnconcluded()) {
			this.validateTaskToBeUndone()
		}
	}

	isTaskValidToBeUpdated() {
		if (!validatingTask.isChangingConcludedStatus()) {
			return false
		}
		return true
	}

	validateTaskToBeUndone() {
		if (validatingPassword !== saiposPassword) {
			this.handleError('You do not have permission to mark a task as unconcluded.', 401)
		}

		if (!validatingTask.doneTimesLessThan(2)) {
			this.handleError('You cannot mark a Task as unconcluded more twice.', 409)
		}
	}

	handleError(message = '', status = null) {
		throw new JsonException(message, status)
	}

}

module.exports = TaskService
