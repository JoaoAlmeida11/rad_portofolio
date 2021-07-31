// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { RootState } from '../../redux/rootReducer';
// import Comentarios from './Comentarios';
// import { useAppDispatch } from '../../redux/hooks';
// import { fetchThreadsAll } from '../../redux/ducks/threadsSlice';
// export interface InterfaceThreads {
//   threads: any;
//   isLogged: boolean;
// }
// export interface InterfaceComments {
//   id: number;
//   comment_content: string;
//   fk_users: number;
//   fk_parent: number;
//   fk_revistas: number;
//   comment_date: string;
//   upvotes: number;
//   downvotes: number;
//   username: any;
// }
// export interface ParamTypes {
//   params: any;
// }
// const Threads = (props: InterfaceThreads) => {
//   const { params } = useParams<ParamTypes>();
//   console.log('params ->', params)
//   const { revistaId, threadsId } = params;
//   console.log('params threadsId ->', threadsId);
//   const [loading, setLoading] = useState(props.threads.loading);

//   const dispatch = useAppDispatch();

//   if (loading === 'idle') {
//     setLoading('waiting');
//     dispatch(fetchThreadsAll(threadsId));
//   }

//   return (
//     <section>
//       {props.threads.loading === 'success' &&
//         props.threads.commentList.map((commentParent: InterfaceComments) => {
//           console.log('comentParentsStore.commentParentsList.map');
//           console.log('commentParent ->', commentParent);
//           console.log('commentParent.id ->', commentParent.id);
//           return (
//             <Comentarios
//               id={commentParent.id}
//               comment_content={commentParent.comment_content}
//               comment_date={commentParent.comment_date}
//               downvotes={commentParent.downvotes}
//               fk_revistas={commentParent.fk_revistas}
//               fk_users={commentParent.fk_users}
//               upvotes={commentParent.upvotes}
//               key={commentParent.id}
//               username={commentParent.username}
//               id_revista={{ revistaId }}
//               isLogged={props.isLogged}
//             />
//           );
//         })}
//     </section>
//   );
// };

// const mapStateToProps = (state: RootState) => ({
//   isLogged: state.auth.isLogged,
//   // commentChild: state.commentChild
// });

// // connects the component to the store
// export default connect(mapStateToProps)(Threads);

export default function Threads() {
  return <p>Ya</p>
};