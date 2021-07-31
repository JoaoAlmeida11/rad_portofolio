import React from 'react';
import RecomendacaoVideoDawn from '../../../img/video-daw.png';

export interface InterfaceVideosDawn {}

export default function VideosDawn(props: InterfaceVideosDawn) {
  return (
    <section>
      <h1>Dawn</h1>
      <img
            alt="imagem do canal de youtube DAW"
            src={RecomendacaoVideoDawn}
            className="img-recomendacoes mb-2"
          />
      <p>
        Recomendamos este canal de youtube em geral, mas mais especificamente o
        segmento semanal - Economic Update com o Professor Wolff, onde ele
        aborda temas da atualidade, analisando-os de uma forma profunda e
        crítica. Como já mencionamos, o Professor Wolff é particularmente
        excelente a tornar assuntos complexos compreensíveis para qualquer
        pessoa.
      </p>
      <a href='https://www.youtube.com/channel/UCK-6FjMu9OI8i0Fo6bkW0VA' className='button'>Saber mais</a>
    </section>
  );
}
