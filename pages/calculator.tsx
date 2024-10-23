import { useState } from "react";
import styles from "@/styles/Calculator.module.scss";
import { Header } from "@/components/Header";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setInput("");
      setResult("0");
      setHistory("");
      return;
    }

    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      setResult((prev) => prev.slice(0, -1) || "0");
      return;
    }

    if (value === "±") {
      if (input) {
        const lastNumberMatch = input.match(/-?\d+(\.\d+)?$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          let newNumber;

          if (lastNumber.startsWith("(") && lastNumber.endsWith(")")) {
            newNumber = lastNumber.slice(1, -1);
          } else {
            newNumber = `(${parseFloat(lastNumber) * -1})`;
          }

          setInput(input.replace(/-?\d+(\.\d+)?$/, newNumber));
          setResult(newNumber);
        }
      }
      return;
    }

    if (value === "%") {
      if (input) {
        const lastNumberMatch = input.match(/-?\d+(\.\d+)?$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          setInput(input.replace(/-?\d+(\.\d+)?$/, `${lastNumber}%`));
          setResult(`${lastNumber}%`);
        }
      }
      return;
    }

    if (value === "=") {
      try {
        if (input.includes("/0") || input.includes("÷0")) {
          setResult("Невозможно деление на ноль");
        } else {
          let expression = input.replace("×", "*").replace("÷", "/");

          expression = expression.replace(
            /(-?\d+(\.\d+)?)%/g,
            (match, number) => {
              return `${parseFloat(number) * 0.01}`;
            }
          );

          const calcResult = eval(expression);
          setHistory(input);
          setResult(calcResult.toString());
        }
        setInput("");
      } catch {
        setResult("Ошибка");
      }
      return;
    }

    if (input === "" && result !== "0") {
      setInput(result + value);
      setHistory("");
    } else {
      setInput((prev) => prev + value);
    }

    setResult((prev) => (prev === "0" ? value : prev + value));
  };

  return (
    <>
      <Header />

      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.history}>{history}</div>
          <div className={styles.result}>{result}</div>
        </div>
        <div className={styles.buttons}>
          {[
            "C",
            "±",
            "%",
            "÷",
            "7",
            "8",
            "9",
            "×",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "+",
            ".",
            "0",
            "⌫",
            "=",
          ].map((btn) => (
            <button
              key={btn}
              className={`${styles.button} ${
                ["+", "-", "×", "÷", "="].includes(btn)
                  ? styles.operatorButton
                  : ["C", "±", "%"].includes(btn)
                  ? styles.specialButton
                  : styles.numberButton
              }`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
