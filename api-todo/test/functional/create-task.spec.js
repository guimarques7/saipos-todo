'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Create Task')

trait('Test/ApiClient')

test('can create a new task with both valid email format and mx record', async ({ assert, client }) => {

	let taskData = {
		description: 'new task',
		responsible: 'testing',
		email: 'testing@gmail.com'
	}

	const response = await client
		.post('/v1/tasks')
		.send(taskData)
		.end()

	Object.assign(taskData, {
		id: response.body.data.id,
		done: response.body.data.done,
		created_at: response.body.data.created_at,
		updated_at: response.body.data.updated_at
	})

	const expected = {
		message: "A new task was successfully added!",
		data: taskData
	}

	response.assertStatus(201)
	response.assertJSONSubset(expected)

})

test('can create a new task with a valid email format and invalid mx record', async ({ assert, client }) => {

	let taskData = {
		description: 'new task',
		responsible: 'testing',
		email: 'testing@gmaiasdl.com'
	}

	const response = await client
		.post('/v1/tasks')
		.send(taskData)
		.end()

	Object.assign(taskData, {
		id: response.body.data.id,
		email: response.body.data.email,
		created_at: response.body.data.created_at,
		updated_at: response.body.data.updated_at
	})

	const expected = {
		message: "A new task was successfully added!",
		data: taskData
	}

	response.assertStatus(201)
	response.assertJSONSubset(expected)

})

test('can create three randomly tasks about dog\'s facts', async ({ assert, client }) => {
	const tasks = await Factory.model('App/Models/Task').createMany(3)

	const response = await client
		.post('/v1/randogs')
		.send()
		.end()

	const expected = {
		message:"Was successfully added 3 new tasks!",
		data: tasks
	}

	response.assertStatus(201)
	assert.isArray(response.body.data, 'response should return a array object');
	assert.lengthOf(response.body.data, 3, 'response array should has length of 3');

})
