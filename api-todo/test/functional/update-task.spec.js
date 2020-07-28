'use strict'

const Factory = use('Factory')

const { test, trait } = use('Test/Suite')('Update Task')
trait('Test/ApiClient')

test('when a task is concluded the done number is incremented', async ({ assert, client }) => {
	const apiTask = await client
		.get('/v1/tasks/1')
		.end()

	let taskData = {
		concluded: true
	}

	const response = await client
		.put('/v1/tasks/1')
		.header('saipos-pass', 'TrabalheNaSaipos')
		.send(taskData)
		.end()


	Object.assign(taskData, {
		id: response.body.data.id,
		created_at: response.body.data.created_at,
		updated_at: response.body.data.updated_at
	})

	const expected = {
		message: 'A task was successfully checked as done!',
		data: taskData
	}

	assert.isBelow(apiTask.body.done, response.body.data.done)
	response.assertStatus(200)
	response.assertJSONSubset(expected)
})

test('only supervisor can mark a task as unconcluded', async ({ assert, client }) => {
	const task = await Factory.model('App/Models/Task').create({ concluded: true })

	let taskData = {
		concluded: false
	}

	const response = await client
		.put(`/v1/tasks/${task.id}`)
		.header('saipos-pass', 'WrongPassword')
		.send(taskData)
		.end()

	response.assertStatus(401)
	response.assertJSONSubset({
		error: 'You do not have permission to mark a task as unconcluded.'
	})
})

test('cannot mark a task as unconcluded more twice', async ({ assert, client }) => {

	const taskId = await use('Database').table('tasks').insert({
		responsible: 'someone',
		email: 'a@a.com',
		description: 'some description',
		concluded: true,
		done: 3
	})

	let taskData = {
		concluded: false
	}

	const response = await client
		.put(`/v1/tasks/${taskId}`)
		.header('saipos-pass', 'TrabalheNaSaipos')
		.send(taskData)
		.end()

	response.assertStatus(409)
	response.assertJSONSubset({
		error: 'You cannot mark a Task as unconcluded more twice.'
	})
})
