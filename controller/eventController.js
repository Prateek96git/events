const Event = require('../model/eventModel')

const eventController = {
    create: async (req, res) => {
        try {
            req.body.createdBy = req.user.id 
            let event = await Event.create(req.body)
            res.json({ event })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAll: async (req,res) => {
        try {
          let events = await Event.find({})
          return res.status(200).json({ events, count: events.length })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEvent: async (req,res) => {
        try {
            let id = req.params.id // to read ref id from router
            let event = await Event.findOne({ _id: id })
            if (!event)
                 return res.status(404).json({ msg: `No event found with id = ${id}`})

                 return res.status(200).json({ event })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
            let id = req.params.id
            const event = await Event.findOneAndUpdate({_id: id }, req.body, {
                new: true,
                runValidators: true
            })
            res.status(200).json({ event })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {
            const id = req.params.id
            await Event.findOneAndDelete({ _id: id })
            return res.status(200).json({ msg: "Event deleted successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = eventController

/* 
  HTTP Status Codes
    200 - OK
    400 - Bad request
    404 - Page Not Found
    500 - Bad Gateway
    505 - Internal Server Error
*/