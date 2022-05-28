import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import { Show } from './Show'
import { Header } from './Header'
import { Empty } from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import { Form } from './Form'
import { Status } from './Status'
import { Confirm } from './Confirm'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
    // Status: Saving...
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {transition(SHOW)});
  };

  // When we cancel an interview
  function cancel() {
    console.log("on cancel");

    // Status: Cancelling...
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {transition(EMPTY)})

  };


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interview={props.interview.interviewer.name}/> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} message="Are you sure you would like to delete?" />}
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === EDIT && <Form interviewers={props.interviewers} onCancel={back} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id}/>}
    </article>
  )
}
