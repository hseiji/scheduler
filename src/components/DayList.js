import React from 'react'
import DayListItem from './DayListItem'

export const DayList = (props) => {
  return (
    <ul>
      {
        props.days.map((day) => {
          return (
            <DayListItem 
              key={day.id}
              name={day.name} 
              spots={day.spots} 
              selected={day.name === props.value}
              setDays={props.onChange}
            /> 
          )
        })
      }
    </ul>
  )
}
