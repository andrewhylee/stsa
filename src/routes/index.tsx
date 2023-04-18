import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "STSA : Stock Twitter Sentiment Analzyer",
  meta: [
    {
      name: "This is the home page",
      content:
        "This website can get you sentiment of the a given stock on the Twitter social media platform",
    },
  ],
};
