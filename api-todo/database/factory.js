'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Task', (faker, i, data) => {
  return {
    description: faker.sentence({ words: 5 }),
    responsible: faker.name(),
    email: faker.email(),
    done: data.done || 0,
    concluded: data.concluded || false
  }
})
