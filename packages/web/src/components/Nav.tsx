import { NavLink } from 'react-router-dom';
import routes from '@/routes';

export default function Nav() {
  const itemsNav = () => {
    return routes[0].children.map((route, index) => {
      if (!route.index) {
        return (
          <li key={index} className="border-t md:border-none">
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `transition-all block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker  capitalize ${
                  isActive ? 'font-bold' : undefined
                }`
              }
            >
              {route.path}
            </NavLink>
          </li>
        );
      }
    });
  };

  return (
    <>
      <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        htmlFor="menu-btn"
      >
        <span className="navicon bg-grey-darkest flex items-center relative"></span>
      </label>
      <ul className="menu md:border-none flex justify-end list-reset m-0 w-full md:w-auto text-primary">
        {itemsNav()}
      </ul>
    </>
  );
}
