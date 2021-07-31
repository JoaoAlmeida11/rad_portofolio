import revistaCapaNovidade from '../../img/rad_revista_capa_00.png';
import revistaCapaNovidade01 from '../../img/rad_revista_capa_01.png';
import tituloNovidades from '../../img/titulo-tinta-novidades.png';
export interface InterfaceNovidades {
  revista_id: number;
  revista_title: string;
  revista_edition: number;
  revista_img: string;
}

const Novidades = (props: InterfaceNovidades) => {
  const capa01 = revistaCapaNovidade01;
  return (
    <section>
      <h1>
        <img src={tituloNovidades} alt="NOVIDADES" />
      </h1>
      <img
        className="revista-capa"
        alt="imagem de uma novidade"
        src={`/static/media/${props.revista_img}`}
        onClick={() =>
          window.location.replace(`/revistas/${props.revista_id}/`)
        }
      ></img>
      <a
        role="button"
        href="/revistas/"
        className="bg-transparency bg-transparency-red"
      >
        MAIS REVISTAS
      </a>
    </section>
  );
};

export default Novidades;
