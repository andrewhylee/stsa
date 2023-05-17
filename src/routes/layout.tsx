import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

// import Header from '~/components/starter/header/header';
// import Footer from '~/components/starter/footer/footer';

import Header from "~/components/basicComponents/header/header";
import Footer from "~/components/basicComponents/footer/footer";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <Header />
      <div class="page">
        <main>
          <Slot />
        </main>
      </div>
      <Footer />
    </>
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
