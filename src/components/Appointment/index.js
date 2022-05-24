import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import { Show } from './Show'
import { Header } from './Header'
import { Empty } from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import { Form } from './Form'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log(props);
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interview={props.interview.interviewer.name}/> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back}/>}
    </article>
  )
}
