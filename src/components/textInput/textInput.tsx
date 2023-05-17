import { component$ } from "@builder.io/qwik";

interface textInputProps {
  label?: string;
}

const textInput = component$((props: textInputProps) => {
  return (
    <>
      <label for="stockName">{props.label}</label>
      <input name="stockName" type="text"></input>
    </>
  );
});

export default textInput; //TODO:
