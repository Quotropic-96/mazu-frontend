import styles from "./page.module.css";
import Image from "next/image";
import Button from "./components/Button/Button";

const Home: React.FC =() => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.titleAndLogo}>
          <Image
            src="/mazu-logo.svg"
            alt="Mazu main logo"
            width={100}
            height={100}
            className={styles.mainLogo}
          ></Image>
          <h1 className={styles.mainTitle}>Mazu</h1>
        </div>
        <h3 className={styles.subtitle}>
          The Hitchhiker&apos;s Guide to Whale Watching
        </h3>
      </header>

      <article className={styles.quote}>
        <p className={styles.quoteText}>
          It was a bewildering route for anyone who was not accustomed to face
          Nature in her wildest moods
        </p>
        <p className={styles.quoteAuthor}>~ Sir Arthur Conan Doyle</p>
      </article>
      <Image
        src="/home-whale.svg"
        alt="Page break motiv"
        width={100}
        height={200}
        className={styles.homeWhaleImage}
      ></Image>
      <nav className={styles.buttonContainer}>
        <Button link="/maps" type="secondary" text="See the map"></Button>
        <Button link="/about" type="secondary" text="About this project"></Button>
      </nav>
      <Image
        src="/break.svg"
        alt="Page break motiv"
        width={50}
        height={100}
        className={styles.pageBreak}
      ></Image>
    </main>
  );
};

export default Home;
