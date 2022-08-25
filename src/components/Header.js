import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'

function Header({title, onAdd, showAddTask}) {
  const location = useLocation()  // show add button only on home page
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && <Button showAddTask={showAddTask} onClick={onAdd}></Button>}
    </header>
  )
}

// Deafult title when no one is send from App.js
Header.defaultProps = {
    title: 'Task Tracer',
}

// Defines data types of all props useed in Header.js
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
