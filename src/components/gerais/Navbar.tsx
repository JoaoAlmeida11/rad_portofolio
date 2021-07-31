import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faBars,
  // faSearch,
} from '@fortawesome/free-solid-svg-icons';

export interface InterfaceNavbar {}

export default function Navbar(props: InterfaceNavbar) {
  const [bookColor, setBookColor] = useState('white');
  const [menuColor, setMenuColor] = useState('white');
  // const [searchColor, setSearchColor] = useState('white');
  const [menuListVisibility, setMenuListVisibility] = useState(false);
  const [navBackgroundColor, setNavBackgroundColor] = useState(
    'nav-backgroundColor-black'
  );
  const [dimensionsWidth, setDimensionsWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      if (dimensionsWidth < 1130 && window.innerWidth >= 1130) {
        setDimensionsWidth(window.innerWidth);
        setMenuListVisibility(false);
        setNavBackgroundColor('nav-backgroundColor-black');
        setBookColor('white');
        setMenuColor('white');
      } else if (dimensionsWidth >= 1130 && window.innerWidth < 1130)
        setDimensionsWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  // const searchHTML = (
  //   <form className="searchPop">
  //     <input id="search" name="search" type="text" />
  //   </form>
  // );

  const handleMenuHamburgerList = () => {
    if (menuListVisibility === false) {
      setMenuListVisibility(true);
      setNavBackgroundColor('nav-backgroundColor-white');
      setBookColor('black');
      setMenuColor('black');
      // setSearchColor('black');
    } else {
      setMenuListVisibility(false);
      setNavBackgroundColor('nav-backgroundColor-black');
      setBookColor('white');
      setMenuColor('white');
      // setSearchColor('white');
    }
  };

  const menuHamburgerList = (
    <ul className="MenuHamburgerList">
      <li>
        <a href="/revistas/" aria-label="Lê as nossas revistas">
          REVISTAS
        </a>
      </li>
      {/* <li>
        <a
          href="/recursos/"
          aria-label="V~e os  nossos recursos sobre o ativismo"
        >
          RECURSOS
        </a>
      </li> */}
      <li>
        <a href="/explora/" aria-label="Vê as nossas recomendações">
          RECOMENDAÇÕES
        </a>
      </li>
      {/* <li>
        <a href="/sobre/" aria-label="Conhece-nos">
          SOBRE
        </a>
      </li>
      <li>
        <a href="/contactos/" aria-label="Entra em contacto connosco">
          CONTACTOS
        </a>
      </li> */}
      <li>
        <a href="/login/" aria-label="Inicie sessão">
          LOGIN
        </a>
      </li>
      {/* <li>
        <a href="/signup/" aria-label="Crie a sua conta">
          SIGNUP
        </a>
      </li> */}
    </ul>
  );

  return (
    <>
      {window.innerWidth < 1130 && (
        <nav role="navigation" className={navBackgroundColor}>
          <a
            href="/revistas/"
            aria-label="Lê as nossas revistas"
            onMouseEnter={() => setBookColor('#faa50a')}
            onMouseLeave={() => {
              menuListVisibility === false
                ? setBookColor('white')
                : setBookColor('black');
            }}
          >
            <FontAwesomeIcon icon={faBookOpen} size="2x" color={bookColor} />
          </a>

          <span>
            <FontAwesomeIcon
              icon={faBars}
              aria-label="Abrir o menu de navegação"
              size="2x"
              color={menuColor}
              onMouseEnter={() => setMenuColor('#faa50a')}
              onMouseLeave={() => {
                menuListVisibility === false
                  ? setMenuColor('white')
                  : setMenuColor('black');
              }}
              onClick={handleMenuHamburgerList}
            />
          </span>

          {/* <a
          href="#"
          aria-label="Pesquisar"
          onMouseEnter={() => setSearchColor('#faa50a')}
          onMouseLeave={() => {
            menuListVisibility === false
              ? setSearchColor('white')
              : setSearchColor('black');
          }}
        >
          <FontAwesomeIcon icon={faSearch} color={searchColor} size="2x" />
        </a> */}
        </nav>
      )}
      {menuListVisibility === true && menuHamburgerList}
    </>
  );
}
