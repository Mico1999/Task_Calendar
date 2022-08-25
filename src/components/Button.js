import PropTypes from 'prop-types'

const Button = ({ showAddTask, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={ showAddTask === true ? ({backgroundColor: "red"}) : ({backgroundColor: "green"}) }
      className='btn'
    >
      {showAddTask === true ? ("Close") : ("Add")}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
