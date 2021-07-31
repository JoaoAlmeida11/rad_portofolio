export default function Newsletter() {
  return (
    <section>
      <h1 className="abside">Subscrever Newsletter</h1>
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
