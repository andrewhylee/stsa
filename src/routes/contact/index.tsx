import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <div>
        <h5>
          For any inquiries, please contact me at
          haeyang.lee77@myhunter.cuny.edu
        </h5>
        <div id="hello"></div>
        <form action="/api/submit">
          <label for="stocks">
            Please place a comma separated list of Stocks you wish to find the
            sentiment of:
          </label>
          <br></br>
          <input type="textbox" name="stocks"></input>
          <br></br>
          <button type="submit">Click to Submit</button>
        </form>
        {/* prettier-ignore */}
        {/* <py-config>
            packages = ["matplotlib", "pandas", "snscrape", "vaderSentiment"]
        </py-config> */}
        {/* prettier-ignore */}
        {/* <py-script output="hello" src="/testscript.py">
        </py-script>
        <link
          rel="stylesheet"
          href="https://pyscript.net/latest/pyscript.css"
        />
        <script defer src="https://pyscript.net/latest/pyscript.js"></script> */}
      </div>
    </>
  );
});
