import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Styles from "./about.css?inline";

export default component$(() => {
  useStylesScoped$(Styles);

  return (
    <article>
      <h2>This is STSA : Stock Twitter Sentiment Analzyer</h2>

      <p>
        This website can get you sentiment of the a given stock on the Twitter
        social media platform
      </p>
    </article>
  );
});
