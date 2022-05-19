import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import { Show } from './Show'
import { Header } from './Header'
import { Empty } from './Empty'

export const Appointment = (props) => {
  console.log(props);
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interview={props.interview.interviewer.name}/> : <Empty/>}
    </article>
  )
}
