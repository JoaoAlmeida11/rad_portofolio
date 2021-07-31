import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comentarios from './Comentarios';
import RevistaPDF from './RevistaPDF';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/rootReducer';
import { fetchCommentParentsAll } from '../../redux/ducks/commentParentsSlice';
import { fetchRevistaById } from '../../redux/ducks/revistaIndividualSlice';

export interface InterfaceRevistaPaginaIndividual {
  commentParents: any;
  logged: boolean;
  revistaIndividual: any;
}
export interface InterfaceCommentParents {
  id: number;
  comment_content: string;
  fk_users: number;
  fk_parent: number;
  fk_revistas: number;
  comment_date: string;
  upvotes: number;
  downvotes: number;
  username: any;
  isLogged: boolean;
  actorVote: number;
}
export interface ParamTypes {
  revistaId: string;
}
const API_IP = process.env.REACT_APP_API_IP;

/* Validates the form fields */
const validate = (values: any) => {
  let errors = {
    comentario: '',
    anonimous: true,
  };
  let { comentario, anonimous } = values;
  if (!comentario) {
    errors.comentario = 'Required!';
  }
  // TODO
  if (errors.comentario === '') return;
  return errors;
};

const RevistaPaginaIndividual = (props: InterfaceRevistaPaginaIndividual) => {
  const [loadRevista, setLoadRevista] = useState<string>(
    props.revistaIndividual.loading
  );
  const [loadComments, setLoadComments] = useState<string>(
    props.commentParents.loading
  );

  const [downloadIconColor, setDownloadIconColor] = useState('white');
  const [submitColor, setSubmitColor] = useState('auth-input-white');

  const logged = props.logged;
  const { revistaId } = useParams<ParamTypes>();
  const dispatch = useAppDispatch();
  const comentParentsStore = props.commentParents;
  const page = comentParentsStore.page;
  const end = comentParentsStore.end;
  const [message, setMessage] = useState('');

  let anonimoInitialState = null;
  if (logged) anonimoInitialState = false;
  else anonimoInitialState = true;
  const [anonimo, setAnonimo] = useState(anonimoInitialState);

  const comentarComConta = (comentario: string, anonimo: boolean) => {
    const endpoint = `https://${API_IP}/index.php/comments/${revistaId}`;
    const axios = require('axios').default;
    axios
      .post(
        endpoint,
        {
          content: comentario,
          anonimous: false,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        }
      )
      .then((response: any) => {
        // @ts-ignore
        dispatch(fetchCommentParentsAll({ revistaId, page }));
        setLoadComments('waiting');
        formik.setSubmitting(false);
        setMessage('submetido com sucesso');
        formik.values.comentario = ''
      })
      .catch((error: string) => {
        console.log('comentarAnonimo ->', error);
        setMessage(error);
        formik.setSubmitting(false);
      });
  };

  const comentarAnonimo = (comentario: string) => {
    const endpoint = `https://${API_IP}/index.php/comments/${revistaId}`;
    const axios = require('axios').default;
    axios
      .post(endpoint, {
        content: comentario,
        anonimous: true,
      })
      .then((response: any) => {
        formik.setSubmitting(false);
        // @ts-ignore
        dispatch(fetchCommentParentsAll({ revistaId, page }));
        setLoadComments('waiting');
        setMessage('submetido com sucesso');
        formik.values.comentario = ''
      })
      .catch((error: string) => {
        setMessage(error);
        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      });
  };

  if (
    loadComments === 'idle' &&
    props.commentParents.loading === 'idle' &&
    loadRevista === 'idle' &&
    props.revistaIndividual.loading === 'idle'
  ) {
    // @ts-ignore
    dispatch(fetchRevistaById({ revistaId }));
    // @ts-ignore
    dispatch(fetchCommentParentsAll({ revistaId, page }));
    setLoadComments('waiting');
    setLoadRevista('waiting');
  }
  if (props.commentParents.loading === 'success' && loadComments !== 'success')
    setLoadComments('success');

  // necessário para definir no textarea
  const textarea_rows = 2;

  const formik = useFormik({
    initialValues: {
      comentario: '',
      anonimo: anonimo,
    },
    validate,
    onSubmit: values => {
      console.log('submiting');
      const { comentario } = values;
      try {
        console.log('anonimous -> ', anonimo);
        if (logged === false) comentarAnonimo(comentario);
        else if (anonimo === true) comentarAnonimo(comentario);
        else if (anonimo === false) comentarComConta(comentario, anonimo);
      } catch (e) {
        console.log('Error creating comment ->', e);
        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      }
    },
  });

  if (message !== '') console.log('error message ->', message);
  useEffect(() => {
    if (formik.isSubmitting === true) setSubmitColor('auth-input-yellow');
    else setSubmitColor('auth-input-white');
  }, [formik.isSubmitting]);

  return (
    <section className="parede pt-0">
      {props.revistaIndividual.loading === 'success' && (
        <>
          <RevistaPDF
            pdf={`/static/media/${props.revistaIndividual.revista_file}`}
          />

          <div className="mb-2">
            <a
              href={`/static/media/${props.revistaIndividual.revista_file}`}
              download
              className="text-download"
            >
              <FontAwesomeIcon
                icon={faFileDownload}
                size="3x"
                color={downloadIconColor}
                onMouseEnter={() => setDownloadIconColor('#faa50a')}
                onMouseLeave={() => setDownloadIconColor('white')}
                className="pe-1"
              />
              Descarregar a revista
            </a>
          </div>
        </>
      )}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="comentario">Comentários</label>
        <textarea
          name="comentario"
          id="comentario"
          placeholder="Junta-te à discussão..."
          rows={textarea_rows}
          value={formik.values.comentario}
          onChange={formik.handleChange}
          required
        ></textarea>
        {!logged && (
          <p>
            Para ficares identificada(o) com o teu nome, tens de comentar com a sessão iniciada.
          </p>
        )}
        {props.logged === false ? (
          <div className="checkbox">
            <input
              type="checkbox"
              // className="checkbox"
              id="anonimous"
              name="anonimous"
              aria-describedby="anonimous"
              aria-label="Escolher se quer anonimous"
              checked
            />
            <label htmlFor="anonimous" className="text-black">
              Anónimo - Inicia sessão para ficares identificada(o).
            </label>
          </div>
        ) : (
          <div className="checkbox">
            <input
              type="checkbox"
              // className="checkbox"
              id="anonimous"
              name="anonimous"
              aria-describedby="anonimous"
              aria-label="Escolher se quer anonimous"
              onChange={e => {
                if (anonimo === true) setAnonimo(false);
                else setAnonimo(true);
              }}
            />
            <label htmlFor="anonimous" className="text-black">
              Quero permanecer anónimo
            </label>
          </div>
        )}

        <input
          type="submit"
          name="submit"
          value="PUBLICAR"
          disabled={formik.isSubmitting}
          className={`bg-transparency bg-transparency-red ${submitColor}`}
        />
      </form>
      {loadComments === 'success' &&
        comentParentsStore.commentParentsList.map(
          (commentParent: InterfaceCommentParents, index: number) => {
            return (
              <Comentarios
                id={commentParent.id}
                comment_content={commentParent.comment_content}
                comment_date={commentParent.comment_date}
                downvotes={commentParent.downvotes}
                fk_revistas={commentParent.fk_revistas}
                fk_users={commentParent.fk_users}
                upvotes={commentParent.upvotes}
                key={index}
                username={commentParent.username}
                id_revista={revistaId}
                isLogged={props.logged}
                actorVote={commentParent.actorVote}
              />
            );
          }
        )}
      {loadComments === 'success' && end === false && (
        <button
          className="bg-transparency bg-transparency-black registate-btn mais-comentarios"
          onClick={() => {
            // @ts-ignore
            dispatch(fetchCommentParentsAll({ revistaId, page }));
            setLoadComments('waiting');
          }}
        >
          Mais comentários
        </button>
      )}
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  commentParents: state.commentParents,
  revistaIndividual: state.revistaIndividual,
  logged: state.auth.isLogged,
});

export default connect(mapStateToProps)(RevistaPaginaIndividual);
