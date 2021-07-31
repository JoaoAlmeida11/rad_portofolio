import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);
export interface InterfaceFooter { }

export default function Footer(props: InterfaceFooter) {
  return (
    <footer>
      <article>
        <a href="/sobre/">Sobre</a>
        <a href="/contactos/">Contactos</a>
        <div>
          <a href="https://www.youtube.com/channel/UCyBQIl0XW5jFRptfVT2CVUQ">
            <FontAwesomeIcon icon={['fab', 'youtube']} size="lg" />
          </a>
          <a href="https://www.facebook.com/arevistarad/">
            <FontAwesomeIcon icon={['fab', 'facebook']} size="lg" />
          </a>
          <a href="https://www.instagram.com/arevistarad/">
            <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
          </a>

        </div>

        {/* <a href="">Termos</a> */}
        <span>&copy; RAD 2021</span>
      </article>
    </footer>
  );
}
