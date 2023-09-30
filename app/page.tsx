import styles from "./page.module.css";
import Image from "next/image";
import Button from "./components/Button/Button";

export default function Home() {
  return (
    <main>
      <header>
        <div className="title_and_logo">
          <Image
            src="/mazu-logo.svg"
            alt="Mazu main logo"
            width={100}
            height={100}
            className={styles.mainLogo}
          ></Image>
          <h1 className="main-title">Mazu</h1>
        </div>
        <h3 className="subtitle">
          The Hitchhiker&apos;s Guide to Whale Watching
        </h3>
      </header>

      <article className={styles.quote}>
        <p>
          It was a bewildering route for anyone who was not accustomed to face
          Nature in her wildest moods
        </p>
        <p className="author">~ Sir Arthur Conan Doyle</p>
      </article>
      <nav className="button-container">
        <Button link="/maps" type="secondary" text="See the map"></Button>
        <Button link="/about" type="secondary" text="About this project"></Button>
      </nav>
    </main>
  );
}
