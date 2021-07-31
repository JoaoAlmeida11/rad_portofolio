import React from 'react';
export interface InterfaceRevistasListaIndividual {
  revista_title: string;
  revista_img: string;
  revista_edition: number;
  revista_id: number;
  key: number;
}

export default function RevistasListaIndividual(
  props: InterfaceRevistasListaIndividual
) {
  let parede = null;
  parede =
    props.revista_edition % 2 === 0
      ? ' parede parede-clara '
      : ' parede parede-escura ';

  const revistaClassName = parede + ' listagem-revistas-item';

  const url = '/revistas/' + props.revista_id + '/';
  return (
    <article className={revistaClassName}>
      {/* <h1 className="text-center">{props.titulo}</h1> */}
      <img
        // src={`static/media/${props.revista_img}`}
        src={`/static/media/${props.revista_img}`}
        className="revista-capa"
        alt={props.revista_title}
        onClick={() => window.location.replace(url)}
      />
      <a href={url} role="button" className="numeracao">
        #{props.revista_edition}
      </a>
    </article>
  );
}
