import React, { useEffect } from 'react';
import RevistasListaIndividual from './RevistasListaIndividual';

import revistaCapaNovidade from '../../img/rad_revista_capa_00.png';
import tituloRevistas from '../../img/titulo-tinta-revistas.png';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import { fetchRevistasAll } from '../../redux/ducks/revistasSlice';

export interface InterfaceRevistas {
  revistas: any;
}
const capa = revistaCapaNovidade;

const Revistas = (props: InterfaceRevistas) => {
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
  });
  const revistasStore = props.revistas;
  console.log('revistasStore ->', revistasStore);

  const dispatch = useAppDispatch();
  if (revistasStore.loading === 'idle') dispatch(fetchRevistasAll());

  useEffect(() => {
    function handleResize() {
      if (
        (window.innerWidth >= 768 && dimensions.width < 768) ||
        (window.innerWidth < 768 && dimensions.width >= 768)
      ) {
        setDimensions({
          width: window.innerWidth,
        });
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions.width]);


  let listaDeRevistas
  try {
    listaDeRevistas = revistasStore.revistaList.map((revista: any) => {
      return (
        <RevistasListaIndividual
          revista_title={revista.revista_title}
          revista_img={revista.revista_img}
          revista_edition={revista.revista_edition}
          revista_id={revista.revista_id}
          key={revista.revista_id}
        />
      );
    });
  }
  catch (e) {
    window.location.href = '/';
  }

  return (
    <section className="min-page-height revistas-page parede parede-clara">
      <h1>
        <img src={tituloRevistas} alt="REVISTAS" className="titulo-tinta" />
      </h1>
      <div className="revistas-container">{listaDeRevistas}</div>
      {/* <a
        role="button"
        href="/revistas/"
        className="bg-transparency bg-transparency-red"
      >
        MAIS REVISTAS
      </a> */}
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  revistas: state.revistas,
});

// connects the component to the store
export default connect(mapStateToProps)(Revistas);
