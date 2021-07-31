import Novidades from './Novidades';
import Newsletter from './Newsletter';
import VideoIntro from './VideoIntro';
import { fetchRevistaLast } from '../../redux/ducks/revistaNovidadeSlice';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/hooks';
import { useState } from 'react';

export interface InterfaceHomePage {
  revistaNovidade: any;
}

const HomePage = (props: InterfaceHomePage) => {
  const dispatch = useAppDispatch();
  const [loadNovidade, setLoadNovidade] = useState<string>(
    props.revistaNovidade.loading
  );
  if (loadNovidade === 'idle' && props.revistaNovidade.loading === 'idle') {
    dispatch(fetchRevistaLast());
    setLoadNovidade('waiting');
  }
  if (props.revistaNovidade.loading === 'success' && loadNovidade !== 'success')
    setLoadNovidade('success');

  return (
    <>
      <VideoIntro />
      {loadNovidade === 'success' && props.revistaNovidade.revista_id !== 0 && (
        <Novidades
          revista_id={props.revistaNovidade.revista_id}
          revista_title={props.revistaNovidade.revista_title}
          revista_edition={props.revistaNovidade.revista_edition}
          revista_img={props.revistaNovidade.revista_img}
        />
      )}\
      <Newsletter />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  revistaNovidade: state.revistaNovidade,
});

export default connect(mapStateToProps)(HomePage);
