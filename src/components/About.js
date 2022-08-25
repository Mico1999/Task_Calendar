import {Link} from "react-router-dom" // use link instead <a> to not make reloads of page

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to='/'>Go back</Link>
    </div>
  )
}

export default About
