import WhoseStreetsImg from '../../img/documentario-whose-streets.png';
export interface InterfaceDocumentarios {}

export default function Documentarios(props: InterfaceDocumentarios) {
  return (
    <section>
      <h1>Recomendações</h1>
      <img
        alt="imagem do filme Whose streets"
        src={WhoseStreetsImg}
        className="mb-2 img-recomendacoes"
      />
      <p>
        Whose streets : Um aspeto distintivo deste documentário sobre o atual
        movimento Black Lives Matter é o facto de privilegiar o ponto de vista
        de pessoas afro-americanas, pobres e da classe trabalhadora, dos
        subúrbios de St. Louis.
      </p>
      <p>
        Neste documentário, ao contrário de tantos outros que se debruçaram
        sobre estes acontecimentos, não são feitas entrevistas a policias ou
        políticos. Apenas são ouvidas ativistas e cidadãos “normais”, e ditos
        cidadãos normais que se tornaram ativistas. São essas pessoas que nos
        contam e relatam o que viram e sentiram nas semanas após o assassinato
        de Michael Brown, um residente afro-americano de Fergurson (St. Louis),
        que se encontrava desarmado e que foi baleado por um polícia branco.
        Mencionamos a raça e a classe dos intervenientes, pois estas são
        fundamentais para perceber toda esta situação.
      </p>
      <p>
        Por ter sido filmado, nas ruas, na linha da frente dos protestos, este
        documentário capta a magnitude dos consequentes confrontos entre
        manifestantes e polícia - as explosões, o gás lacrimejante, os veículos
        policiais de grau militar. Ao mesmo tempo, o filme transmite-nos a
        raiva, revolta provocada por esta resposta militar desproporcional e
        opressiva. O resultado é um olhar extremamente íntimo sobre estes
        eventos, mas também sore esta luta.
      </p>
    </section>
  );
}
