import React from 'react'
import 'components/InterviewerList.scss'
import { InterviewerListItem } from './InterviewerListItem'
import PropTypes from 'prop-types';

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
              selected={p.id === props.value}
              setInterviewer={() => props.onChange(p.id)}
            />
          )
        })
      }
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};