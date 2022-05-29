import axios from 'axios';
import { useEffect, useState } from 'react'

export const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Initialize data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // console.log(all[2].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])  
  
  const setDay = day => setState({ ...state, day });
  
  // Booking Interview: clicking Save
  function bookInterview(id, interview) {
    console.log("on bookInterview");
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {updateSpots("add")})
      .then(() => {setState({ ...state, appointments })})
  };
  
  // Deleting Interview: clicking trash icon
  function cancelInterview(id) {
    console.log("on cancelInterview");
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {updateSpots("delete")})
      .then(() => {setState({ ...state, appointments })})
  };

  // Loop through days and set up number of spots
  const updateSpots = (operation) => {
    
    const updatedDays = {...state.days};

    updatedDays.map((day) => {
      if(state.day === day.name) {
        // Add interview: spots = spots - 1
        if(operation === "add") {
          let spots = day.spots - 1;
          day.spots = spots;
        }
        if(operation === "delete") {
          let spots = day.spots + 1;
          day.spots = spots;
        }
        return {...day};
      }
      return day;
    })
    setState({ ...state, updatedDays })
  };


  // Returning ...
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

