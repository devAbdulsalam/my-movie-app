import { Link } from "react-router-dom";

const Items = (props) =>
{
  const links = props.links;
  return (
    <ul>
      <h1 className="mb-1 font-semibold ">{props.tit}</h1>
      {links.map((link) =>
        <li key={link.name}>
          <Link to={'/'} className="text-gray-400
             hover:text-teal-400 duration-300 
             text-sm leading-6 cursor-pointer">
            {link.name}
          </Link>
        </li>
      )}
    </ul>
  );

}

export default Items
