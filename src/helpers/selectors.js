export function getAppointmentsForDay(state, day) {

  const daySelected = state.days.filter(dayAppt => (dayAppt.name === day))
 
  let result = [];
  if (daySelected.length === 0) {
    return [];
  } else {
    result = daySelected[0].appointments.map(item => {
      return state.appointments[item]
    })
  }
  return result;
}

export function getInterview(state, interview) {

  // Edge case when there is no student or interview
  if (!state.interviewers || !interview) {
    return null;
  }

  let result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return result;
}

export function getInterviewersForDay(state, day) {

  const daySelected = state.days.filter(dayAppt => (dayAppt.name === day))
  
  let result = [];
  if (daySelected.length === 0) {
    return [];
  } else {
    result = daySelected[0].interviewers.map(item => {
      return state.interviewers[item]
    })
  }
  return result;
}