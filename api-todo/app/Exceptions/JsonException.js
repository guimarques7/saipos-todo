'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class JsonException extends LogicalException {
	handle (error, { response }) {
		response.status(error.status).json({error: error.message || 'You got a error'})
	}
}

module.exports = JsonException
