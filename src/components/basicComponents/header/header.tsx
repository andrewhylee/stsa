import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.scss";

export default component$(() => {
  return (
    <header>
      <nav class={styles.nav}>
        <Link href="/">
          <img
            class={styles.logo}
            src="/icons/logo-no-background.svg"
            alt="LOGO"
          />
        </Link>
        <ul class={styles.ul}>
          <li>
            <Link class={styles.link} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link class={styles.link} href="/about">
              About
            </Link>
          </li>
          <li>
            <Link class={styles.link} href="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <Link class={styles.link + " " + styles.signin} href="/signin">
          Sign In
        </Link>
      </nav>

      {/* <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      /> */}
      {/* <script src="js/bodymovin.js" type="text/javascript"></script>
      <script src="js/lottie.js" type="text/javascript"></script> */}
      {/* <script
        src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.11.0/lottie.min.js"
        integrity="sha512-XCthc/WzPfa+oa49Z3TI6MUK/zlqd67KwyRL9/R19z6uMqBNuv8iEnJ8FWHUFAjC6srr8w3FMZA91Tfn60T/9Q=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script> */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.8.0/bodymovin.min.js"></script>
    </header>
  );
});
