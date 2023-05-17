import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import Box from "~/components/basicComponents/box/box";
// import TextInput from "~/components/textInput/textInput";
// import styles from "./home.module.scss";
import "animate.css";
import { tweetsGrabber } from "~/components/tweetsGrabber/tweetsGrabber";
import vader from "vader-sentiment";
import { acceptedStocks } from "~/components/tweetsGrabber/acceptedStocks";

// export const randomServerFetchAction = routeAction$(
//   async (data, requestEvent) => {
//     // This will only run on the server when the user submits the form (or when the action is called programatically)

//     console.log("data DREW ->  ", JSON.stringify(data), requestEvent);
//     const userID = 0.53543;
//     const waitFor = (delay: number) =>
//       new Promise((resolve) => {
//         setTimeout(resolve, delay);
//       });

//     await waitFor(1000);

//     return {
//       success: true,
//       userID,
//     };
//   }
// );

export default component$(() => {
  // const action = randomServerFetchAction();
  const test1 = useSignal<number>(0);
  const stockInput = useSignal<string>("");
  const inputBoxClasses = useSignal<string>("");
  const loaderClasses = useSignal<string>("");
  const loaderWrapperClasses = useSignal<string>("");

  // useTask$(({ track }) => {
  //   track(() => action.value);
  //   if (action.value?.userID) test1.value = action.value?.userID;
  // });

  // const bounceOutCssClasses = () => {
  //   return test1.value % 3 === 1
  //     ? "animate__animated animate__zoomInDown"
  //     : test1.value % 3 === 2
  //     ? "animate__animated animate__bounceOut"
  //     : "show";
  // };

  useTask$(({ track }) => {
    track(() => test1.value);

    // State 1: Stock Symbol submitted
    if (test1.value === 1) {
      inputBoxClasses.value = "animate__animated animate__fadeOut";
      // inputBoxClasses.value =
      // test1.value === 1 ? "animate__animated animate__fadeOut" : "";

      setTimeout(() => {
        test1.value++;
      }, 1000);
    }

    // State 2: Get rid of the Inputbox + Show the Loader
    if (test1.value === 2) {
      loaderClasses.value = "animationWindow";
      loaderWrapperClasses.value =
        "animate__animated animate__fadeIn animate__slow";

      setTimeout(() => {
        test1.value++;
      }, 3000);
    }

    // State 3: Get rid of Loader + Show Final Message
    if (test1.value === 3) {
      loaderWrapperClasses.value = "animate__animated animate__bounceOut";

      setTimeout(() => {
        test1.value++;
      }, 1000);
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => loaderClasses.value);
    if (loaderClasses.value === "animationWindow") {
      let animData = {
        wrapper: document.querySelector(".animationWindow"),
        animType: "svg",
        loop: true,
        prerender: true,
        autoplay: true,
        path: "/json/lego-loader.json",
      };
      let anim = bodymovin.loadAnimation(animData);
      anim.setSpeed(3.4);
    }
  });

  useTask$(({ track }) => {
    track(() => stockInput.value);
  });

  const onEnterOriginal = $((inputStockValue: string) => {
    stockInput.value = inputStockValue;
    if (!acceptedStocks[inputStockValue.toLowerCase()]) {
      alert(
        "Please put one of these stock ticker symbols: " +
          Object.keys(acceptedStocks)
            .map((stockName) => stockName.toUpperCase())
            .join()
      );
      return;
    }
    test1.value++;
  });

  return (
    <>
      <div class="container very-center">
        {/* <h1 class={"bounceOutCssClasses()"}>
        How are people feeling about your favorite stock?
      </h1> */}
        {/* {test1.value === 4 && (
          <h2 class="animate__animated animate__zoomInDown green">
            Good News! <br />
            Your stock ${stockInput.value.toUpperCase()} has {Math.floor((number1 / number2) * 100)}% Positive Sentiment 👍
          </h2>
        )} */}
        {test1.value === 4 &&
          tweetsGrabber(stockInput.value).then((resp) => {
            let totalCount = 0;
            let totalCompoundScore = 0;
            for (const tweet of resp) {
              totalCount++;
              totalCompoundScore +=
                vader.SentimentIntensityAnalyzer.polarity_scores(
                  tweet
                ).compound;
            }
            return (
              <h2 class="animate__animated animate__zoomInDown">
                {totalCompoundScore / totalCount < -0.05 ? (
                  <div class="red">
                    Bad News! <br />
                    Your stock ${stockInput.value.toUpperCase()} has{" "}
                    {Math.floor((totalCompoundScore / totalCount) * -100)}%
                    Negative Sentiment 👇
                  </div>
                ) : totalCompoundScore / totalCount < 0.05 ? (
                  <div class="neutral">
                    Meh News! <br />
                    Your stock ${stockInput.value.toUpperCase()} has a Neutral
                    Sentiment 🥱
                  </div>
                ) : (
                  <div class="green">
                    Good News! <br />
                    Your stock ${stockInput.value.toUpperCase()} has{" "}
                    {Math.floor((totalCompoundScore / totalCount) * 100)}%
                    Positive Sentiment 👍
                  </div>
                )}
              </h2>
            );
          })}

        {test1.value >= 2 && test1.value < 4 && (
          <div class={loaderWrapperClasses.value}>
            <div class={loaderClasses.value}></div>
          </div>
        )}
        {test1.value < 2 && (
          // <Form action={action} class={inputBoxClasses.value}>
          <div class={inputBoxClasses.value}>
            <Box
              text={""}
              label={"Your Favorite Stock Ticker Symbol"}
              placeholder={"Ex: MSFT Type here..."}
              onEnter={onEnterOriginal}
            />
          </div>
        )}

        {/* <h1>
        WAAAABAAAFETTTT {action.value?.userID} helloDREW {test1.value}
      </h1>  */}
      </div>
      {/* <div>
        {test1.value === 4 &&
          tweetsGrabber(stockInput.value).then((resp) =>
            resp.map((tweet: string, idx: number) => (
              <h3 class="green" key={idx}>
                {tweet}
              </h3>
            ))
          )}
      </div> */}
      {/* <div>
        {test1.value === 4 &&
          tweetsGrabber(stockInput.value).then((resp) =>
            resp.map((tweet: string, idx: number) => (
              <h3 class="green" key={idx}>
                {tweet} Compound Score:{" "}
                {
                  vader.SentimentIntensityAnalyzer.polarity_scores(tweet)
                    .compound
                }
              </h3>
            ))
          )}
      </div> */}
      {/* <div>
        {tweetsGrabber("aapl").then((resp) =>
          resp.map((tweet: string, idx: number) => (
            <h3 class="green" key={idx}>
              Compound Score:{" "}
              {vader.SentimentIntensityAnalyzer.polarity_scores(tweet).compound}
            </h3>
          ))
        )}
      </div> */}
      {/* <div>
        {test1.value === 4 &&
          tweetsGrabber(stockInput.value).then((resp) => {
            let totalCount = 0;
            let totalCompoundScore = 0;
            for (const tweet of resp) {
              totalCount++;
              totalCompoundScore +=
                vader.SentimentIntensityAnalyzer.polarity_scores(
                  tweet
                ).compound;
            }
            return <h3 class="green">{totalCompoundScore / totalCount}</h3>;
          })}
      </div> */}

      <br />
      <button
        class="transparent"
        onClick$={() => {
          test1.value = 0;
          stockInput.value = "";
          inputBoxClasses.value = "";
          loaderClasses.value = "";
          loaderWrapperClasses.value = "";
        }}
      >
        Return back to Initial Screen
      </button>
    </>
  );
});
