import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => {
  return (
    <footer>
      <div class={"section dark " + styles.footer}>
        <div class="container ">
          <p>Stock Twitter Sentiment Analyzer (STSA)</p>
          <p>Copyright 2023 © Drew Lee </p>
        </div>
      </div>
    </footer>
  );
});
