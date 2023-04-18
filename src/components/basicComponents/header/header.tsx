import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.scss";

export default component$(() => {
  return (
    <header>
      <nav class={styles.nav}>
        <Link href="/">
          <img class={styles.logo} src="/icons/chips-bag.png" alt="LOGO" />
        </Link>
        <ul class={styles.ul}>
          <li class={styles.li}>
            <Link href="/">Home</Link>
          </li>
          <li class={styles.li}>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
