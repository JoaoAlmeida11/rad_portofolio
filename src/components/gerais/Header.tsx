import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { tokenAuth } from '../../redux/ducks/AuthSlice';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { logOutAction } from '../../redux/ducks/AuthSlice';

import radLogo from '../../img/logotipo-rad-branco.png';
export interface InterfaceHeader {
  isLogged: boolean;
  username: string;
}

const Header = (props: InterfaceHeader) => {
  const [dimensionsWidth, setDimensionsWidth] = useState(window.innerWidth);

  const isLogged = props.isLogged;
  const dispatch = useAppDispatch();

  if (
    !isLogged &&
    localStorage.getItem('userEmail') !== null &&
    localStorage.getItem('userName') !== null &&
    localStorage.getItem('userRole') !== null &&
    localStorage.getItem('userToken') !== null
  )
    dispatch(
      tokenAuth({
        userEmail: localStorage.getItem('userEmail'),
        userName: localStorage.getItem('userName'),
        userRole: localStorage.getItem('userRole'),
        userToken: localStorage.getItem('userToken'),
      })
    );

  useEffect(() => {
    function handleResize() {
      if (dimensionsWidth < 1200 && window.innerWidth >= 1200)
        setDimensionsWidth(window.innerWidth);
      else if (dimensionsWidth >= 1200 && window.innerWidth < 1200)
        setDimensionsWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const menuHamburgerList = (
    <ul className="header-navigation-list">
      <li className="pl-3">
        <a href="/revistas/" aria-label="Lê as nossas revistas">
          REVISTAS
        </a>
      </li>
      <li>
        <a href="/explora/" aria-label="Vê as nossas recomendações">
          RECOMENDAÇÕES
        </a>
      </li>
    </ul>
  );

  return (
    <header>
      <a href="/">
        <img src={radLogo} alt="logotipo RAD" />
      </a>
      {window.innerWidth >= 1200 && menuHamburgerList}
      <ul>
        {!isLogged ? (
          <li>
            <a href="/login/" aria-label="Inicie sessão">
              LOGIN
            </a>
          </li>
        ) : (
          <li>
            {/* <span className="pe-1">{props.username}</span> */}
            <a
              href="/"
              aria-label="Inicie sessão"
              onClick={() => dispatch(logOutAction())}
            >
              LOGOUT
            </a>
          </li>
        )}
      </ul>
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogged: state.auth.isLogged,
  username: state.auth.userName,
});

export default connect(mapStateToProps)(Header);
