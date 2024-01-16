
const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Content = (props) => {
  return (
    <div>
     {props.parts.map(part => {
        console.log(part)
        return <Part key={part.id} part={part.name} exercises={part.exercises} />
         }
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  const sum = Object.values(props.parts).reduce((a, c) => a + c.exercises, 0)
    
  return (
    <div>
      <p><b>total of exercises {sum}</b></p>
    </div>
  )
}

const Course = (props) => {

  return (
    <div>
      {props.course.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course