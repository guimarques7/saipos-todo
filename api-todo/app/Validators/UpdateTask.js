'use strict'

class UpdateTask {
  get rules () {
    return {
      concluded: 'required|boolean'
    }
  }
}

module.exports = UpdateTask
