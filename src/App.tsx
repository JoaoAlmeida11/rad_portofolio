import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/gerais/Header';
import HomePage from './components/homepage/HomePage';
import Revistas from './components/revistas/Revistas';
import RevistaPaginaIndividual from './components/revistas/RevistaPaginaIndividual';
// import Recursos from './components/recursos/Recursos';
import Explora from './components/explora/Explora';
import Documentarios from './components/explora/Documentarios';
import Sobre from './components/institucionais/Sobre';
import Contactos from './components/institucionais/Contactos';
import Footer from './components/gerais/Footer';
import Navbar from './components/gerais/Navbar';
import Login from './components/autenticacao/Login';
import SignUp from './components/autenticacao/SignUp';
import Audiovisual from './components/explora/audiovisual/Audiovisual';
import VideosDawn from './components/explora/audiovisual/VideosDawn';
import VideosPalestraGoogleRichardWolff from './components/explora/audiovisual/VideosPalestraGoogleRichardWolff';
// import Threads from './components/revistas/Threads';
import Livros from './components/explora/Livros';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Header}></Route>
      </Switch>

      <main>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/revistas/" component={Revistas}></Route>
          <Route
            exact
            path="/revistas/:revistaId/"
            component={RevistaPaginaIndividual}
          ></Route>
          {/* <Route
            exact
            path="/revistas/:revistaId/:threadsId/"
            component={Threads}
          ></Route> */}

          <Route exact path="/explora/" component={Explora}></Route>
          <Route
            exact
            path="/explora/documentarios/"
            component={Documentarios}
          ></Route>
          <Route
            exact
            path="/explora/livros/"
            component={Livros}
          ></Route>
          <Route
            exact
            path="/explora/audiovisual/"
            component={Audiovisual}
          ></Route>
          <Route
            exact
            path="/explora/audiovisual/DAW/"
            component={VideosDawn}
          ></Route>
          <Route
            exact
            path="/explora/audiovisual/videosPalestraGoogleRichardWolff/"
            component={VideosPalestraGoogleRichardWolff}
          ></Route>

          <Route exact path="/sobre/" component={Sobre}></Route>
          <Route exact path="/contactos/" component={Contactos}></Route>
          {/* autenticacao routing */}
          <Route exact path="/login/" component={Login}></Route>
          <Route exact path="/signup/" component={SignUp}></Route>
        </Switch>
        <Switch>
          <Route path="/" component={Footer}></Route>
        </Switch>
      </main>
      <Switch>
        <Route path="/" component={Navbar}></Route>
      </Switch>
    </Router>
  );
}

export default App;
