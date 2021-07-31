import React from 'react';
import RecomendacaoVideoPalestraRichardWolff from '../../../img/video-richard-wolf.png';
export interface InterfaceVideosPalestraGoogleRichardWolff {}

export default function VideosPalestraGoogleRichardWolff(
  props: InterfaceVideosPalestraGoogleRichardWolff
) {
  return (
    <section>
      <h1>
        Palestra na Google de Richard Wolff : Sim, ele foi mesmo à Google dizer
        estas coisas
      </h1>
      <img
            alt="Richard Wolff"
            src={RecomendacaoVideoPalestraRichardWolff}
            className="img-recomendacoes"
          />
      <p>
        Criticar capitalismo na sede de um dos maiores monopólios da indústria
        tecnológica da atualidade? Yep, definitivamente merece o selo de
        aprovação RAD. Nesta palestra o Professor aborda o conceito de
        Democracia no Trabalho, focando-se sobretudo no modo de organização das
        grandes empresas de hoje em dia. No final, há ainda uma sessão de
        perguntas e respostas - vejam por vocês próprios...mas não é de admirar,
        tendo em conta a audiência a que se dirigia.
        https://www.youtube.com/watch?v=ynbgMKclWWc
      </p>
      <a href='https://www.youtube.com/watch?v=ynbgMKclWWc' className='button'>Saber mais</a>
    </section>
  );
}
