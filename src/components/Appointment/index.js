import React from 'react'
import 'components/Appointment/styles.scss'
import { Show } from './Show'
import { Header } from './Header'
import { Empty } from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import { Form } from './Form'
import { Status } from './Status'
import { Confirm } from './Confirm'
import { Error } from './Error'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // SAVING an interview
  function save(name, interviewer) {
    console.log("on Save");   
    const interview = {
      student: name,
      interviewer
    };
    // Status: Saving...
    transition(SAVING, true);

    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch((error) => {
        console.log("error >>", error);
        transition(ERROR_SAVE, true);
      })
  };

  // DELETING an interview
  function cancel() {
    console.log("on cancel");

    // Status: Cancelling...
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {transition(EMPTY)})
      .catch((error) => {
        console.log("error >>", error);
        transition(ERROR_DELETE, true);
      })
  };


  return (
    <article className="appointment">
      <Header time={props.time}/>
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
      {mode === ERROR_SAVE && <Error message="Could not save the appointment." onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete the appointment." onClose={() => back()}/>}
    </article>
  )
}
