'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

	static boot() {
		super.boot()
		this.addHook('beforeUpdate', 'TaskHook.updateTask')
		this.addHook('beforeSave', 'TaskHook.saveTask')
	}

	getOriginalValues() {
		return Object.assign(new Task(), this.$originalAttributes)
	}

	getConcluded() {
		return Boolean(Number(this.concluded))
	}

	isChangingConcludedStatus() {
		return this.getConcluded() !== this.getOriginalValues().getConcluded()
	}

	isTaskBeenConcluded() {
		return this.isConcluded() && !this.getOriginalValues().isConcluded()
	}

	isTaskBeenUnconcluded() {
		return !this.isConcluded() && this.getOriginalValues().isConcluded()
	}

	hasNeverBeenDone() {
		return this.done == 0
	}

	doneTimesLessThan(manyTimes) {
		return this.done <= manyTimes
	}

	isConcluded() {
		return this.getConcluded()
	}

}

module.exports = Task
