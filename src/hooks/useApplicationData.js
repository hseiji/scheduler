import axios from 'axios';
import { useEffect, useReducer } from 'react'

export const useApplicationData = () => {

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";
  
  // Initialize data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    })
  }, [])  

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        const day = action.day;
        return { ...state, day };

      case SET_APPLICATION_DATA:
        const days = action.days;
        const appointments = action.appointments;
        const interviewers = action.interviewers;
        return { ...state, days, appointments, interviewers }

      case SET_INTERVIEW:
        console.log("on SET_INTERVIEW");
        const id = action.id;
        const interview = action.interview;
        const appointment = {
          ...state.appointments[id],
          interview: interview
        };
        const updatedAppointments = {
          ...state.appointments,
          [id]: appointment
        };
        return { ...state, appointments: updatedAppointments }
      
      case SET_SPOTS:
        const updatedDays = action.updatedDays;
        console.log("on updatedDays");
        return { ...state, days: updatedDays }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }  

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });
  
  // Booking Interview: clicking Save
  function bookInterview(id, interview) {
    console.log("on bookInterview");
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots("add")
        console.log(state.days);
      })
      .then(() => {dispatch({ type: SET_INTERVIEW, id, interview })})
  };
  
  // Deleting Interview: clicking trash icon
  function cancelInterview(id) {
    console.log("on cancelInterview");

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
  
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {updateSpots("delete")})
      .then(() => {dispatch({ type: SET_INTERVIEW, id, interview: null })})
  };

  // Loop through days and set up number of spots
  const updateSpots = (operation) => {
    
    let updatedDays = state.days;
    console.log("state.days>>", updatedDays);

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
    });

    dispatch({type: SET_SPOTS, updatedDays });
  };


  // Returning ...
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

