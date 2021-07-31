import { Dispatch, useState } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../redux/hooks';
import { signUpAction } from '../../redux/ducks/AuthSlice';
export interface InterfaceSignUp {
  signup: Dispatch<any>;
}
const API_IP = process.env.REACT_APP_API_IP;

/* Validates the form fields */
const validate = (values: any) => {
  let errors = {
    nome: '',
    email: '',
    password: '',
  };
  let { nome, email, password } = values;
  if (!nome) {
    errors.nome = 'Required!';
  } else if (values.nome.length > 20) {
    errors.nome = 'Tem de ter 20 ou menos carateres';
  }
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
  if (errors.nome === '' && errors.email === '' && errors.password === '')
    return;
  return errors;
};

const SignUp = (props: InterfaceSignUp) => {
  // const [submitting, setSubmitting] = useState(false);
  const [submitColor, setSubmitColor] = useState('auth-input-white');
  const [message, setMessage] = useState('');

  //   const { isLogged } = props;
  const dispatch = useAppDispatch();

  const signup = (name: string, email: string, password: string) => {
    const endpoint = `https://${API_IP}/index.php/users/create`;
    const axios = require('axios').default;
    axios
      .post(endpoint, {
        nome: name,
        password: password,
        email: email,
      })
      .then((response: any) => {
        dispatch(
          signUpAction({
            userEmail: response.data.email,
            userName: response.data.user_name,
            userRole: response.data.role,
            userToken: response.data.token,
          })
        );
        window.location.href = '/revistas';
      })
      .catch((error: any) => {
        console.log('error signup ->', error)
        if (error.code === 400) setMessage('O email que está a tentar usar já tem conta associada.');
        else {
          console.log('signup email/password ->', error);
          setMessage(error);
        }

        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      });
  };
  // if (isLogged === true) return <Redirect to="" />;

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      const { nome, email, password } = values;
      try {
        signup(nome, email, password);
      } catch (e) {
        console.log('Error singUp');
        console.log(e);
        formik.setSubmitting(false);
        setSubmitColor('auth-input-white');
      }
    },
  });
  if (message !== '') console.log('error message ->', message);
  return (
    <section className="min-page-height signup-page">
      <h1 className="abside">Registar Conta</h1>
      <form onSubmit={formik.handleSubmit}>
        {message !== null && <div className='text-center color-danger'>{message}</div>}
        <div>
          <input
            type="text"
            name="nome"
            id="nomeUtilizador"
            placeholder="Nome"
            aria-label="Nome de utilizador"
            aria-describedby="Nome"
            onChange={formik.handleChange}
            value={formik.values.nome}
            required
          />
          {formik.touched.nome && formik.errors.nome ? (
            <div className="text-center color-danger">
              {formik.errors.nome}
            </div>
          ) : null}
        </div>
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
          value="CRIAR CONTA"
          disabled={formik.isSubmitting}
          className={`bg-transparency bg-transparency-black ${submitColor}`}
        />
      </form>
      <p className="text-center pb-0 ">Já tem conta?</p>
      <a
        href="/login/"
        className="bg-transparency bg-transparency-black registate-btn"
      >
        INICIE SESSÃO AQUI
      </a>
    </section>
  );
};

export default SignUp;
