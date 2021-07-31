import { useState } from 'react';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

export default function Explora() {
  const [toolkitIcon, setToolkitIcon] = useState(faChevronRight);
  const [entrarAcaoIcon, setEntrarAcaoIcon] = useState(faChevronRight);
  const [captarAtencaoIcon, setCaptarAtencaoIcon] = useState(faChevronRight);
  const [fndamentarArgumentarIcon, setFundamentarArgumentarIcon] =
    useState(faChevronRight);
  const [mobilizarIcon, setMobilizarIcon] = useState(faChevronRight);
  const [atualidadeIcon, setAtualidadeIcon] = useState(faChevronRight);
  const [dicasMelhorComuinicacaoIcon, setDicasMelhorComuinicacaoIcon] =
    useState(faChevronRight);
  const [documentarioIcon, setDocumentarioIcon] = useState(faChevronRight);
  const [livrosIcon, setLivrosIcon] = useState(faChevronRight);
  const [videosIcon, setVideosIcon] = useState(faChevronRight);
  const triggerToolkit = (
    <span>
      Toolkit de Iniciação ao Ativismo{' '}
      <FontAwesomeIcon icon={toolkitIcon} size="1x" color="white" />
    </span>
  );
  const triggerEntrarAcao = (
    <span>
      Entrar em ação{' '}
      <FontAwesomeIcon icon={entrarAcaoIcon} size="1x" color="white" />
    </span>
  );
  const triggerCaptarAtencao = (
    <span>
      Captar a atenção{' '}
      <FontAwesomeIcon icon={captarAtencaoIcon} size="1x" color="white" />
    </span>
  );
  const triggerFundamentarArgumentar = (
    <span>
      Fundamentar e argumentar{' '}
      <FontAwesomeIcon
        icon={fndamentarArgumentarIcon}
        size="1x"
        color="white"
      />
    </span>
  );
  const triggerMobilizar = (
    <span>
      Mobilizar <FontAwesomeIcon icon={mobilizarIcon} size="1x" color="white" />
    </span>
  );
  const triggerAtualidade = (
    <span>
      Atualidade{' '}
      <FontAwesomeIcon icon={atualidadeIcon} size="1x" color="white" />
    </span>
  );
  const triggerDicasMelhorComuinicacao = (
    <span>
      5 Dicas para uma melhor comunicação{' '}
      <FontAwesomeIcon
        icon={dicasMelhorComuinicacaoIcon}
        size="1x"
        color="white"
      />
    </span>
  );
  const triggerDocumentario = (
    <span>
      Documentários{' '}
      <FontAwesomeIcon icon={documentarioIcon} size="1x" color="white" />
    </span>
  );
  const triggerLivros = (
    <span>
      Livros{' '}
      <FontAwesomeIcon icon={livrosIcon} size="1x" color="white" />
    </span>
  );
  const triggerVideos = (
    <span>
      Vídeos <FontAwesomeIcon icon={videosIcon} size="1x" color="white" />
    </span>
  );
  return (
    <section className="min-page-height recomendacoes">
      <h1>Recomendações</h1>
      <div>
        <Collapsible
          trigger={triggerToolkit}
          onOpening={() => setToolkitIcon(faChevronDown)}
          onClosing={() => setToolkitIcon(faChevronRight)}
        >
          <p>
            Este Toolkit de Ativismo destina-se a qualquer pessoa, ativista,
            grupo académico, em qualquer lugar, que esteja à procura de um guia
            prático, sem complicações, para efetuar mudança.
          </p>
          <p>
            Esperamos que este toolkit te seja útil! Para questões adicionais,
            dúvidas existenciais, etc., podes sempre entrar em contacto connosco
            - tentaremos ao máximo responder-te e ajudar-te.
          </p>
        </Collapsible>
        <Collapsible
          trigger={triggerEntrarAcao}
          onOpening={() => setEntrarAcaoIcon(faChevronDown)}
          onClosing={() => setEntrarAcaoIcon(faChevronRight)}
        >
          <p>
            Nós sabemos perfeitamente, por experiência própria, que o mais
            difícil é saber por onde começar. “Temos de fazer um plano? Mas eu
            queria <b className="font-weight-bold font-style-italic">agir</b>!”.
            Pois, é assim, lamentamos desiludir, mas é mesmo necessário fazer um
            planeamento. Mas não te preocupes, nós vamos pôr os passos por
            tópicos - ah em pontinhos é tudo tão mais fácil, não achas?
          </p>
          <p>Seguem-se alguns passos para o desenvolvimento de ações:</p>
          <ol>
            <li>
              Captar a atenção: chamar a atenção das pessoas para o tema em
              questão
            </li>
            <li>Fundamentar e argumentar: esta é a base de qualquer luta</li>
            <li>
              Mobilizar: tentar que as pessoas se envolvam e participem
              ativamente
            </li>
            <li>Atualidade: reagir em tempo real.</li>
          </ol>
        </Collapsible>
        <Collapsible
          trigger={triggerCaptarAtencao}
          onOpening={() => setCaptarAtencaoIcon(faChevronDown)}
          onClosing={() => setCaptarAtencaoIcon(faChevronRight)}
        >
          <p>
            Tu já sabes - vivemos num mundo saturado de estímulos, mensagens,
            conteúdo - por isso, captar a atenção não é uma tarefa fácil. Para
            termos algum sucesso, temos de primeiro provocar (fazer as pessoas
            parar para pensar) e depois inspirar (para que estas queiram dar
            prosseguimento à coisa).
          </p>
          <p>
            Mensagens visuais são muito impactantes e, normalmente, as mais
            privilegiadas pelas pessoas.
          </p>
          <p>
            A criatividade e inovação, adequadas ao teu contexto específico, vão
            ser as tuas principais ferramentas de trabalho.
          </p>
        </Collapsible>
        <Collapsible
          trigger={triggerFundamentarArgumentar}
          onOpening={() => setFundamentarArgumentarIcon(faChevronDown)}
          onClosing={() => setFundamentarArgumentarIcon(faChevronRight)}
        >
          <p>
            Uma das melhores formas de aprender é ensinar, porque é aí que vemos
            os limites do nosso conhecimento e é aí que temos maior necessidade
            de o sustentar, para conseguirmos fazer com que a outra pessoa
            entenda. Tens de conseguir apresentar argumentos concisos, coerentes
            e simples.
          </p>
          <p>Mas como fundamentar a mensagem que queres passar?</p>
          <p>
            Parte do princípio que, como a pessoa não sabe o mesmo que tu, ela
            vai passar por um processo gradual de chegar até onde tu chegaste
            (lembras-te? tu também percorreste esse caminho). Como tal, não
            podes usar determinados conceitos, ou falar de uma maneira como se
            ela já estivesse no teu nível de conhecimento.
          </p>
          <p>
            <b className="font-weight-bold">Uma dica MUITO útil é</b>: criares,
            em conjunto com as pessoas com que te organizas, uma espécie de
            lista dos “argumentos” mais comuns que as pessoas costumam usar em
            oposição à vossa posição - normalmente as pessoas usam sempre as
            mesmas coisas - e depois elaborarem respostas. Tal como os políticos
            fazem antes de debates, podem fazer sessões em que simulam esses
            debates: umas pessoas fazem de si próprias e outra de pessoa que tem
            uma posição contrária. Para além disso, terem esse documento é
            bastante útil para informar e preparar novos membros que ainda estão
            a aprender sobre o assunto. O tempo e a prática ajudam muito neste
            campo. Damos como exempo a lista dos “18 mitos sobre a prostituição”
            da campanha EXIT:
            https://exitprostitution.org/18-mitos-sobre-a-prostituicao/
          </p>
        </Collapsible>
        <Collapsible
          trigger={triggerMobilizar}
          onOpening={() => setMobilizarIcon(faChevronDown)}
          onClosing={() => setMobilizarIcon(faChevronRight)}
        >
          <p>
            Sozinha ou sozinho não fazes nada, então tens que falar com outras
            pessoas, organizar-te com elas, e, em conjunto, tomarem ações para
            atingir um objetivo. Ação coletiva e organizada, em vez de atos
            pontuais e individuais, é capaz de efetuar mudança.
          </p>
          <p>
            Tens de identificar pessoas que se encontrem na mesma situação,
            façam parte da mesma base que tu, e unir-te (e reunir-te - combina
            um encontro, uma reunião, num jardim, por videochamada, etc.) a
            elas.
          </p>
          <p>
            Esta é uma condição essencial e indispensável, para além de que, com
            o envolvimento de outras pessoas, se podem colmatar algumas lacunas
            da nossa parte.
          </p>
        </Collapsible>
        <Collapsible
          trigger={triggerAtualidade}
          onOpening={() => setAtualidadeIcon(faChevronDown)}
          onClosing={() => setAtualidadeIcon(faChevronRight)}
        >
          <p>
            Enquanto estamos na luta, o mundo “ continua a girar”, isto é,
            ocorrem eventos, alteram-se leis, são eleitos outros governos, etc.
            Por vezes, ouve-se falar em backlash. Backlash significa retrocesso.
            Por isso, é fundamental estar atenta ao que se passa nos círculos do
            poder político - através dos media e de outros pontos de contacto
            (por exemplo, a página do Parlamento ou do Governo).
          </p>
          <p>
            Deves tentar ao máximo seguir o desenrolar dos acontecimentos e{' '}
            <b className="font-weight-bold">estar atenta(o)!</b>
          </p>
        </Collapsible>
        <Collapsible
          trigger={triggerDicasMelhorComuinicacao}
          onOpening={() => setDicasMelhorComuinicacaoIcon(faChevronDown)}
          onClosing={() => setDicasMelhorComuinicacaoIcon(faChevronRight)}
        >
          <ol>
            <li>
              <b className="font-weight-bold">
                Está bem informada e preparada.
              </b>
              <br />
              Esta já tentamos explicar-te, basicamente, antes de iniciares uma
              discussão, reserva um tempo para aprenderes algumas respostas aos
              argumentos mais comuns usados em oposição.
            </li>
            <li>
              <b className="font-weight-bold">Coloca questões</b>
              <br />
              Uma das técnicas mais valiosas para criar conversas eficazes é
              fazer perguntas. Por meio de perguntas, podemos encorajar as
              pessoas a compreender melhor a sua posição, instigando a
              introspecção. Uma das melhores coisas sobre fazer perguntas é que
              isso pode impedir alguém de sentir que está a ser julgado, ao
              mesmo tempo que garante que a conversa abranja questões
              desafiadoras e que provoquem emoções.
            </li>
            <li>
              <b className="font-weight-bold">Ouve</b>
              <br />
              Muitas vezes, as conversas podem se tornar frustrantes, quando
              parece que a outra pessoa não está a ouvir, ou simplesmente está a
              falar por cima de nós, então faz um esforço consciente para ouvir
              o que a outra pessoa diz, mesmo que discordes. Podes fazer isso
              esclarecendo a posição da outra pessoa de volta para ela e, claro,
              garantindo um bom contato visual.
            </li>
            <li>
              <b className="font-weight-bold">
                Tem em atenção a linguagem corporal
              </b>
              <br />
              Em muitos aspectos, a nossa linguagem corporal e a maneira como
              dizemos algo são tão importantes quanto aquilo que dizemos. Adota
              uma postura aberta e relaxada. Uma ótima maneira de fazer isso é
              manter as palmas das mãos abertas e os braços ao lado do corpo,
              pois abrir o torso é um sinal de vulnerabilidade e confiança e
              indica que te sentes relaxada(o) na conversa.
            </li>
            <li>
              <b className="font-weight-bold">Tem empatia</b>
              <br />
              Ser empática(o) não significa concordar com o que a pessoa diz, ou
              não desafiá-la. Significa, sim, entender por que é que é aquela a
              sua posiçã e reconhecer que existem razões culturais e
              psicológicas significativas pelas quais as pessoas podem responder
              de determinada maneira. Uma das coisas cruciais a lembrar, quando
              se inicia uma conversa, é que a pessoa com quem estamos a falar
              irá basear a sua opinião sobre o tema que estamos a abordar, nessa
              conversa. Portanto, é importante que sejamos racionais, empáticos
              e equilibrados.
            </li>
          </ol>
        </Collapsible>
        <Collapsible
          trigger={triggerDocumentario}
          onOpening={() => setDocumentarioIcon(faChevronDown)}
          onClosing={() => setDocumentarioIcon(faChevronRight)}
        >
          <a href="/explora/documentarios/" className="text-center">
            Ativismo de bases
          </a>
        </Collapsible>
        <Collapsible
          trigger={triggerLivros}
          onOpening={() => setLivrosIcon(faChevronDown)}
          onClosing={() => setLivrosIcon(faChevronRight)}
        >
          <a href="/explora/livros/" className="text-center">
            Veganismo
          </a>
        </Collapsible>
        <Collapsible
          trigger={triggerVideos}
          onOpening={() => setVideosIcon(faChevronDown)}
          onClosing={() => setVideosIcon(faChevronRight)}
        >
          <a href="/explora/audiovisual/">Trabalho</a>
        </Collapsible>
      </div>
    </section>
  );
}
