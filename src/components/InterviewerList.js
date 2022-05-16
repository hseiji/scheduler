import React from 'react'
import 'components/InterviewerList.scss'
import { InterviewerListItem } from './InterviewerListItem'

export const InterviewerList = (props) => {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {      
        props.interviewers.map((p) => {
          return (
            <InterviewerListItem 
              key={p.id} 
              name={p.name} 
              avatar={p.avatar} 
              id={p.id} 
              setInterviewer={(event) => props.setInterviewer(p.id)}
              selected={p.id === props.interviewer}
            />
          )
        })
      }
      </ul>
    </section>
  )

}
