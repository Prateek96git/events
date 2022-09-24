import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify';
import axios from 'axios';

function UpdateEvent() {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    eventDate: "",
    isEnabled: false
  })

   const [status, setStatus] = useState(false)

   const navigate = useNavigate()
   const params = useParams()

   const handleStatus = (e) => {
        setStatus(!status)
   }

   useEffect(() => {
      const getEvent = async () => {
        await axios.get(`/api/v1/event/getEvent/${params.id}`)
        .then(res => {
          setEvent(res.data.event)
          setStatus(res.data.event.isEnabled)
         // event.eventDate = new Date(res.data.event.eventDate).toISOString().slice(0,14)
        }).catch(err => console.error(err.message))
      }
      getEvent()
   }, [])

  const readValue = (e) => {
    const { name, value } = e.target;
    setEvent({...event, [name]: value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
   // console.log('event =', event)
   try {
      event.isEnabled = status;
   await axios.patch(`/api/v1/event/update/${params.id}`,event)
   .then(res => {
      toast.success(`Event created successfully`)
      navigate(`/`)
      window.location.href = "/"
      }).catch(err => toast.error(err.message))
  } catch (err) {
    toast.error(err.response.data.msg)
  }
}
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
        <h3 className="display-3">UpdateEvent</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={submitHandler} autoComplete="off">
                <div className="form-group mt-2">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" value={event.name} onChange={readValue} className="form-control" required/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" id="description" value={event.description} onChange={readValue} cols="30" rows="5" className="form-control" placeholder="min 20 characters - max 250 characters" required></textarea>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="eventDate">Event Date</label>
                  <input type="datetime-local" name="eventDate" id="eventDate" value={event.eventDate} onChange={readValue} className="form-control" required />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="status">Event Status</label>
                  <input type="checkbox" name="status" id="status" value="status" checked={status} onChange={handleStatus} className="form-check-input" />
                  <label htmlFor="status" className="form-check-label ms-2">
                    {status ? "true" : "false"} </label>
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Update" className="btn btn-success" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateEvent