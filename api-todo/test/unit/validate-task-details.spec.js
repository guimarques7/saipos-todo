'use strict'

const { test } = use('Test/Suite')('Validate Task Details')
const UpdateTask = use('App/Validators/UpdateTask')
const StoreTask = use('App/Validators/StoreTask')
const { validate } = use('Validator')

test('is invalid user\'s email when storing a task', async ({ assert }) => {
  const validation = await validate({
    description: 'test',
    responsible: 'user\'s name',
    email: 'wrong email'
  }, StoreTask.rules())

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      field: 'email',
      message: 'email validation failed on email',
      validation: 'email'
    }
  ])
})

test('is invalid task\'s description when storing a task', async ({ assert }) => {
  const validation = await validate({
    responsible: 'user\'s name',
    email: 'wrong email'
  }, StoreTask.rules())

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      field: 'description',
      message: 'required validation failed on description',
      validation: 'required'
    }
  ])
})
