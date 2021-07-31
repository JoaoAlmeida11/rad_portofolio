import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  actorVote?: number;
}

export default function ComentariosChild(props: InterfaceComentarios) {
  const user = (props.username === null) ? 'Anónimo' : props.username

  return (
    <article className="comentarios_child">
      <div className="comentarios">
        <div>
          <p className="commentarios_user">{user}</p>
          <p>{props.comment_content}</p>
        </div>
      </div>
    </article>
  );
}
