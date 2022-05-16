import React from 'react'
import 'components/InterviewerListItem.scss'
import classNames from 'classnames'

export const InterviewerListItem = (props) => {
  const interviewClass = classNames("interviewers__item", { "interviewers__item--selected": props.selected });

  return (
    <li className={interviewClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      Sylvia Palmer
    </li>
  )
}



