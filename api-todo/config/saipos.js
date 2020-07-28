'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {

  supervisorPass: Env.get('SAIPOS_PASSWORD', 'TrabalheNaSaipos'),

  mailBoxUrl: Env.get('MAILBOX_URL', 'https://apilayer.net/api/check'),

  mailBoxKey: Env.get('MAILBOX_KEY', '1f32cf774a7cf4164ac84544a187bf7f'),

  catFactUrl: Env.get('CATFACT_URL', 'https://cat-fact.herokuapp.com/facts/random')

}
