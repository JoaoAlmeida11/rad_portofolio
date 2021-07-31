import React from 'react';

export interface InterfaceContactos {}

// !! se if it is to remove
export default function Contactos(props: InterfaceContactos) {
  return (
    <section className="min-page-height signup-page">
      <h1 className="abside">Entra em contacto connosco!</h1>
      <p className="text-center">
        Tens alguma pergunta ou sugestão que nos queiras dar? Entra em contacto
        connosco!
      </p>
      <p className="text-center">Também podes enviar um email para:</p>
      <p className="text-center">revistaradinfo@gmail.com</p>
      <form>
        <div>
          <input
            type="text"
            id="nomeUtilizador"
            placeholder="Nome"
            aria-label="Nome de utilizador"
            aria-describedby="Nome"
          />
        </div>
        <div>
          <input
            type="email"
            id="emailUtilizador"
            aria-describedby="Email"
            placeholder="Email"
            aria-label="Email do utilizador"
            required
          />
        </div>
        <input
          type="submit"
          name="submit"
          value="SUBSCREVER"
          className="bg-transparency bg-transparency-black "
        />
      </form>
    </section>
  );
}
