import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import { Show } from './Show'
import { Header } from './Header'
import { Empty } from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import { Form } from './Form'
import { getInterviewersForDay } from 'helpers/selectors'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // When we save an interview
  function save(name, interviewer) {
    console.log("on Save");
    
    const interview = {
      student: name,
      interviewer
    };

    console.log("name, interviewer", name, interviewer);

    props.bookInterview(props.id, interview);
    console.log("props.interview>>", props.interview);
    transition(SHOW);
  }

  // console.log(props.state);
  const listInterviewers = getInterviewersForDay(props.state, props.state.day)

  // console.log(props);
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interview={props.interview.interviewer.name}/> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={listInterviewers} onCancel={back} onSave={save}/>}
    </article>
  )
}
