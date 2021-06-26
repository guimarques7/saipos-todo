'use strict'

class StoreTask {
  get rules () {
    return {
      description: 'required',
      responsible: 'required',
      email: 'required|email'
    }
  }

  get messages () {
    return {
      'responsible.required': 'You must provide a responsible name.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'description.required': 'You must provide a task description'
    }
  }
}

module.exports = StoreTask
