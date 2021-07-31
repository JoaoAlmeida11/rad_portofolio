import React from 'react';

export interface InterfaceVideoIntro { }

export default function VideoIntro(props: InterfaceVideoIntro) {
  return (
    <iframe width="1904" height="688" src="https://www.youtube.com/embed/tylcryOUPPE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  );
}
