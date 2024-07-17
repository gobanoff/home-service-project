import styles from "./AboutUs.module.scss";
const AboutUs = () => {
  return (
    <div className={styles.aboutus}>
      <h1>Apie Mus</h1>
      <p className={styles.musuUp}>
        Esame profesionalų komanda, teikianti įvairias paslaugas jūsų namams.
        Mūsų tikslas – suteikti jums patogumą ir aukštos kokybės paslaugas, kad
        jūsų namai būtų tvarkingi, saugūs ir jaukūs.
      </p>
      <p className={styles.musu}>Mūsų paslaugos apima:</p>
      <div className={styles.middle}>
        <ul>
          <li>Valymo paslaugos</li>
          <li>Elektriko paslaugos</li>
          <li>Perkraustymo paslaugos</li>
          <li>Dažymo paslaugos</li>
          <li>Santechniko paslaugos</li>
          <li>Taisymo paslaugos</li>
        </ul>
        <img
          src="https://t4.ftcdn.net/jpg/03/06/99/87/240_F_306998742_5awR6uVsZ8dRNdHHnj0tnm4sGUDBAxQ5.jpg"
          alt=""
        />
        <img
          src="https://t4.ftcdn.net/jpg/03/05/47/61/240_F_305476114_rMj4TOLvaXvjYQAqbym4YT5njmqFMGY4.jpg"
          alt=""
        />
        <img
          src="https://onecallinsurance.co.uk/assets/images/home_emergency.jpg"
          alt=""
        />
      </div>
      <p className={styles.musuDown}>
        Mes dirbame su profesionaliais ir patikimais specialistais, kurie yra
        pasiruošę jums padėti bet kuriuo metu. Mūsų komanda yra įsipareigojusi
        teikti aukščiausios kokybės paslaugas ir užtikrinti klientų
        pasitenkinimą.
      </p>
    </div>
  );
};

export default AboutUs;
