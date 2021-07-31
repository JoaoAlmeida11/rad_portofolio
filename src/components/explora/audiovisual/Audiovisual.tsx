import React from 'react';
import RecomendacaoVideoDawn from '../../../img/video-daw.png';
import RecomendacaoVideoPalestraRichardWolff from '../../../img/video-richard-wolf.png';
export interface InterfaceYoutube { }

export default function Audiovisual(props: InterfaceYoutube) {
  return (
    <section>
      <h1>Recomendações</h1>
      <div>
        <a href="/explora/audiovisual/DAW/">
          <img
            alt="imagem do canal de youtube DAW"
            src={RecomendacaoVideoDawn}
            className="img-recomendacoes"
          />
        </a>
        <p>
          <a href="/explora/audiovisual/DAW/" className="button"
          >
            DAW
          </a>
        </p>
      </div>
      <div>
        <a href="/explora/audiovisual/videosPalestraGoogleRichardWolff/">
          <img
            alt="Richard Wolff"
            src={RecomendacaoVideoPalestraRichardWolff}
            className="img-recomendacoes"
          />
        </a>
        <p>
          <a
            href="/explora/audiovisual/videosPalestraGoogleRichardWolff/"
            className="button"
          >
            Palestra na Google de Richard Wolff
          </a>
        </p>
      </div>
    </section>
  );
}
