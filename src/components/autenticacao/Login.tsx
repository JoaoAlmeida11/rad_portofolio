import { Dispatch, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { logInAction } from '../../redux/ducks/AuthSlice';
import { connect } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/hooks';

export interface InterfaceLogin {
  login: Dispatch<any>;
  commentParents: any;
  isLogged: any;
}
const API_IP = process.env.REACT_APP_API_IP;

const Login = (props: InterfaceLogin) => {
  const [submitColor, setSubmitColor] = useState('auth-input-white');
  const [message, setMessage] = useState('');

  /* Validates the form fields */
  const validate = (values: any) => {
    let errors = {
      email: '',
      password: '',
    };
    let { email, password } = values;

    if (!email) {
      errors.email = 'Email is required!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Password is required!';
    } else if (/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/i.test(password)) {
      errors.password =
        'Password has to be at least 8 characters, one letter and one number';
    }
    if (errors.email === '' && errors.password === '') return;
    return errors;
  };

  const login = (email: string, password: string) => {
    const endpoint = `https://${API_IP}/index.php/users/login`;
    const axios = require('axios').default;
    axios
      .post(endpoint, {
        password: password,
        email: email,
      })
      .then((response: any) => {
        dispatch(
          logInAction({
            userEmail: response.data.email,
            userName: response.data.user_name,
            userRole: response.data.role,
            userToken: response.data.token,
          })
        );
        window.location.href = '/revistas';
      })
      .catch((error: any) => {
        if (error.code === 401) setMessage('Credenciais Erradas');
        else setMessage("Ocorreu um erro");
        console.log('error ->', error)

        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      });
  };

  if (props.isLogged === true) window.location.href = '/';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      const { email, password } = values;
      try {
        login(email, password);
      } catch (e) {
        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      }
    },
  });

  useEffect(() => {
    if (formik.isSubmitting === true) setSubmitColor('auth-input-yellow');
    else setSubmitColor('auth-input-white');
  }, [formik.isSubmitting]);

  const dispatch = useAppDispatch();

  return (
    <section className="min-page-height login-page">
      <h1 className="abside">Login</h1>
      <form onSubmit={formik.handleSubmit} className="mb-2">
        {message !== '' && <div className='text-center color-danger'>{message}</div>}
        <div>
          <input
            name="email"
            type="email"
            id="emailUtilizador"
            aria-describedby="Email"
            placeholder="Email"
            aria-label="Email do utilizador"
            required
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-center color-danger">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div>
          <input
            name="password"
            aria-describedby="Password"
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-center color-danger">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <input
          type="submit"
          name="submit"
          value="LOGIN"
          disabled={formik.isSubmitting}
          className={`bg-transparency bg-transparency-black ${submitColor}`}
        />
      </form>
      <p className="text-center pb-0 ">Ainda não tens conta?</p>
      <a
        href="/signup/"
        className="bg-transparency bg-transparency-black registate-btn"
      >
        REGISTA-TE
      </a>
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  commentParents: state.commentParents,
  isLogged: state.auth.isLogged,
});

// connects the component to the store
export default connect(mapStateToProps)(Login);
