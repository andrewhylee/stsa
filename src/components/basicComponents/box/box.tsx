import { component$, QRL, useSignal } from "@builder.io/qwik";
// import styles from "./box.module.scss";
import "./box.scss";

interface BoxProps {
  text?: string;
  label?: string;
  placeholder?: string;
  onEnter: QRL<(inputStockValue: string) => void>;
}

const Box = component$<BoxProps>(
  ({
    text = "",
    label = "Default Label",
    placeholder = "Type here...",
    onEnter,
  }: BoxProps) => {
    const stockInput = useSignal<string>(text);
    return (
      <>
        <div class="textbox">
          <div class="textbox-box">
            <div class="textbox-face textbox-side"></div>
            <div class="textbox-face textbox-bottom"></div>
            <div class="textbox-face textbox-top"></div>
            <div class="textbox-field">
              <div class="textbox-label">{label}</div>
              <input
                class="textbox-text"
                type="text"
                placeholder={placeholder}
                autoFocus
                value={stockInput.value}
                onChange$={(event) => {
                  const value = event.target.value;
                  stockInput.value = value;
                }}
              />
            </div>
            <button
              class="textbox-action"
              type="submit"
              onClick$={() => onEnter(stockInput.value)}
            >
              <div class="textbox-face textbox-side"></div>
              <div class="textbox-face textbox-top"></div>
              <div class="textbox-face textbox-bottom"></div>
              <svg viewBox="0 0 24 24">
                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default Box;
