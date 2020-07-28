'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('description', 255).notNullable()
      table.string('responsible', 255).notNullable()
      table.string('email', 255).notNullable()
      table.boolean('concluded').notNullable().defaultTo(false)
      table.integer('done').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
