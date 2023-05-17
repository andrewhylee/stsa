// // @ts-nocheck
// import { component$ } from "@builder.io/qwik";
// import { routeAction$, Form, server$ } from "@builder.io/qwik-city";
// // const { spawn } = require("child_process");
// import { spawn } from "child_process";

// export const useAddUser = routeAction$(async (data, requestEvent) => {
//   // This will only run on the server when the user submits the form (or when the action is called programatically)

//   let userID = "helllo";

//   const waitFor = (delay) =>
//     new Promise((resolve) => {
//       userID = data.firstName + data.lastName;
//       console.log("DREWS requestEvent", requestEvent);
//       setTimeout(resolve, delay);
//     });

//   await waitFor(2000);

//   return {
//     success: true,
//     userID,
//   };
// });

// export const formActionTest2 = routeAction$(async (data1, requestEvent) => {
//   let dataToSend = new Promise((resolve) => {
//     let finalData;
//     // spawn new child process to call the python script
//     const python = spawn("/usr/bin/python3", ["script1.py", "random-arg-1"]);
//     // collect data from script
//     python.stdout.on("data", function (data) {
//       console.log("Pipe data from python script ...", data.toString());
//       finalData = data.toString();
//     });
//     // in close event we are sure that stream from child process is closed
//     python.on("close", (code) => {
//       console.log(`child process close all stdio with code ${code}`);
//       // send data to browser
//       resolve(finalData);
//     });
//     // resolve(finalData);
//   });

//   return {
//     success: true,
//     userID: await dataToSend,
//   };
// });

// // const blah = server$(() => {
// //   console.log(process.cwd());
// //   let dataToSend;
// //   // spawn new child process to call the python script
// //   const python = spawn("/usr/bin/python3", ["script1.py", "random-arg-1"]);
// //   // collect data from script
// //   python.stdout.on("data", function (data) {
// //     console.log("Pipe data from python script ...");
// //     dataToSend = data.toString();
// //   });
// //   // in close event we are sure that stream from child process is closed
// //   python.on("close", (code) => {
// //     console.log(`child process close all stdio with code ${code}`);
// //     // send data to browser
// //   });
// //   return {
// //     success: true,
// //     userID: dataToSend,
// //   };
// // });

// export default component$(async () => {
//   // const action = useAddUser();
//   const action = formActionTest2();
//   // const action = blah();
//   // const testjson = action.value?.success && JSON.parse(action.value?.userID);
//   const teststring = action.value?.userID;

//   return (
//     <div class="container">
//       <h1>Landing Page</h1>
//       <Form action={action}>
//         <input name="firstName" />
//         <input name="lastName" />
//         <button type="submit">Add user</button>
//       </Form>
//       {action.value?.success && (
//         // When the action is done successfully, the `action.value` property will contain the return value of the action
//         <>
//           <p>User {action.value.userID} added successfully</p>
//           <p>BRUH {teststring}</p>
//           {console.log(JSON.parse(teststring))}
//         </>
//       )}
//       {/* <div id="hello"></div>
//         <form>
//           <label for="stocks">
//             Please place a comma separated list of Stocks you wish to find the
//             sentiment of:
//           </label>
//           <br></br>
//           <input type="textbox" name="stocks" value={stocknames.value}></input>
//           <br></br>
//           <button type="submit">Click to Submit</button>
//           <button
//             type="button"
//             onClick$={() => testServer(stocknames.value)}
//           ></button>
//         </form> */}
//     </div>
//   );
// });
