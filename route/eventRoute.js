const route = require('express').Router()
const eventController = require('../controller/eventController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// create new event
route.post(`/create`, auth, authAdmin, eventController.create)

// to call all events
route.get(`/getEvents`, auth, eventController.getAll)

// to call single event
route.get(`/getEvent/:id`, auth, eventController.getEvent)

// to update event
route.patch(`/update/:id`, auth, authAdmin, eventController.update)

// to delete event
route.delete(`/delete/:id`, auth, authAdmin, eventController.delete)

module.exports = route