import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../redux/hooks';
import { fetchCommentChildsById } from '../../redux/ducks/commentChildSlice';
import { RootState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import ComentariosChild from './ComentariosChild';
import { useFormik } from 'formik';

export interface InterfaceComentarios {
  comment_content: string;
  comment_date: string;
  downvotes: number;
  fk_revistas: number;
  fk_users: number;
  id: number;
  upvotes: number;
  username: any;
  id_revista: any;
  isLogged: boolean;
  actorVote: number;
  commentChild?: any
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

const Comentarios = (props: InterfaceComentarios) => {
  const id_comentario = props.id;
  const revistaId = props.id_revista;
  const [load, setLoad] = useState('idle');
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [upvotesIconColor, setUpvotesIconColor] = useState('black');
  const [downvotesIconColor, setDownvotesIconColor] = useState('black');
  const [message, setMessage] = useState('');
  const [loadCommentChilds, setLoadCommentChild] = useState('idle')
  const [submitColor, setSubmitColor] = useState('auth-input-white');
  const [loadComments, setLoadComments] = useState<string>(
    props.commentChild.loading
  );

  let anonimoInitialState = null;
  if (props.isLogged) anonimoInitialState = false;
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
      })
      .catch((error: string) => {
        setMessage(error);
        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      });
  };

  if (props.isLogged === true) {
    if (load === 'idle') {
      setLoad('firstRun');
      if (props.actorVote != null) {
        if (props.actorVote == 1) {
          setUpvotes(1);
          setUpvotesIconColor('red');
        } else if (props.actorVote == 0) {
          setDownvotes(-1);
          setDownvotesIconColor('red');
        }
      }
    }
  }

  const [votes, setVotes] = useState(props.upvotes - props.downvotes);

  const handleUpvote = () => {
    if (upvotes === 1) {
      setUpvotesIconColor('red');
      return;
    }
    const endpoint = `https://${API_IP}/index.php/votes/1/${id_comentario}`;
    const axios = require('axios').default;
    axios
      .post(
        endpoint,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        }
      )
      .then((response: any) => {
        if (upvotes === 1) {
          setUpvotes(0);
          setUpvotesIconColor('black');
          setVotes(votes - 1);
        } else if (upvotes === 0) {
          if (downvotes === -1) {
            setVotes(votes + 2);
            setDownvotes(0);
            setDownvotesIconColor('black');
          } else if (downvotes === 0) {
            setVotes(votes + 1);
          }

          setUpvotes(1);
          setUpvotesIconColor('red');
          return;
        }
      })
      .catch((error: string) => {
        // console.log('comentarAnonimo ->', error);
        return error;
      });
  };
  const handleDownvote = () => {
    if (downvotes === -1) {
      setDownvotesIconColor('red');
      return;
    }

    const endpoint = `https://${API_IP}/index.php/votes/0/${id_comentario}`;
    const axios = require('axios').default;
    axios
      .post(
        endpoint,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        }
      )
      .then((response: any) => {
        if (downvotes === -1) {
          setDownvotes(0);
          setDownvotesIconColor('black');
          setVotes(votes + 1);
        } else if (downvotes === 0) {
          if (upvotes === 1) {
            setVotes(votes - 2);
            setUpvotes(0);
            setUpvotesIconColor('black');
          } else if (upvotes === 0) setVotes(votes - 1);

          setDownvotes(-1);
          setDownvotesIconColor('red');
          return;
        }
      })
      .catch((error: string) => {
        console.log('comentarAnonimo ->', error);
      });
  };
  const dispatch = useAppDispatch();
  const fetchCommentChilds = () => {
    if (loadCommentChilds === 'idle') {
      dispatch(fetchCommentChildsById({ id: props.id }))
      setLoadCommentChild('runned')
    }
  }
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
        if (props.isLogged === false) comentarAnonimo(comentario);
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

  const user = (props.username === null) ? 'Anónimo' : props.username

  return (
    <article className="comentarios_pad">
      <div className="comentarios">
        <div>
          <p className="commentarios_user">{user}</p>
          <p>{props.comment_content}</p>
          <p className="commentarios_icons">
            <span>
              <span className="pe-1 votes">{votes}</span>
              {props.isLogged ? (
                <>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    size="2x"
                    color={upvotesIconColor}
                    onClick={handleUpvote}
                    className='vote-cursor'
                  />

                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    color={downvotesIconColor}
                    onClick={handleDownvote}
                    className='vote-cursor'
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faChevronUp} size="2x" color="black" />
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    color="black"
                  />
                </>
              )}
            </span>
            {/* <span
              className="comentarios-responder"
              onClick={fetchCommentChilds}
            >
              Responder
            </span> */}
          </p>
        </div>
      </div>
      {message && (<p>message</p>)}
      {/* {props.commentChild.loading === 'success' &&
        props.commentChild.commmentChildsList.map(
          (commentParent: any) => {
            return (
              <ComentariosChild
                id={commentParent.id}
                comment_content={commentParent.comment_content}
                comment_date={commentParent.comment_date}
                downvotes={commentParent.downvotes}
                fk_revistas={commentParent.fk_revistas}
                fk_users={commentParent.fk_users}
                upvotes={commentParent.upvotes}
                key={commentParent.id}
                username={commentParent.username}
                id_revista={revistaId}
              />
            );
          }
        )} */}
      {/* {props.commentChild.loading === 'success' && (
        { responderAParent }
      )} */}
    </article>

  );
}


const mapStateToProps = (state: RootState) => ({
  commentParents: state.commentParents,
  revistaIndividual: state.revistaIndividual,
  commentChild: state.commentChild
});

export default connect(mapStateToProps)(Comentarios);
