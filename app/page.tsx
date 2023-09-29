import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

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
      <nav>
        <button>See the map</button>
        <button>About this project</button>
      </nav>
    </main>
  );
}
