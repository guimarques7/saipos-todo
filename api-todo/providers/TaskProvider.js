'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class TaskProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('App/Services/TaskService', (app) => {
		const TaskService = require('../app/Services/TaskService')
		return new TaskService()
	})
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    //
  }
}

module.exports = TaskProvider
