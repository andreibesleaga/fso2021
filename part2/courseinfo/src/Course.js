import React from 'react'


const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Total = ({course}) => {
    var exercises = course.parts.map(part=>{return part.exercises})
    const total = exercises.reduce((sum, current)=>sum+current);                
    return(
        <p><b>total of {total} exercises</b></p>
    ) 
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>    
    )
}

const Content = ({course}) => {
    return (
        <div>
            <Parts course={course} />
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Parts = ({course}) => {
    return course.parts.map(part => { return <Part key={part.id} part={part} />})
}

  
export default Course