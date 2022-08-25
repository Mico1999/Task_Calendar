import {Link} from "react-router-dom" // use link instead <a> to not make reloads of page

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer