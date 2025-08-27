import React, { useState } from "react";

export default function CalculatorApp(props: any) {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: number) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue(".");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      default:
        return second;
    }
  };

  const handleEqualsClick = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-neutral-900 text-white rounded-2xl overflow-hidden">
      <div className="flex-1 p-4 flex flex-col justify-end">
        <div className="text-right text-5xl font-light mb-4 truncate">
          {displayValue}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button onClick={clearDisplay} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">AC</button>
          <button disabled className="col-span-1 p-4 rounded-lg bg-neutral-700 text-2xl"></button>
          <button disabled className="col-span-1 p-4 rounded-lg bg-neutral-700 text-2xl"></button>
          <button onClick={() => performOperation("/")} className="col-span-1 p-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-2xl">÷</button>

          {/* Row 2 */}
          <button onClick={() => inputDigit(7)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">7</button>
          <button onClick={() => inputDigit(8)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">8</button>
          <button onClick={() => inputDigit(9)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">9</button>
          <button onClick={() => performOperation("*")} className="col-span-1 p-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-2xl">×</button>

          {/* Row 3 */}
          <button onClick={() => inputDigit(4)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">4</button>
          <button onClick={() => inputDigit(5)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">5</button>
          <button onClick={() => inputDigit(6)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">6</button>
          <button onClick={() => performOperation("-")} className="col-span-1 p-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-2xl">−</button>

          {/* Row 4 */}
          <button onClick={() => inputDigit(1)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">1</button>
          <button onClick={() => inputDigit(2)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">2</button>
          <button onClick={() => inputDigit(3)} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">3</button>
          <button onClick={() => performOperation("+")} className="col-span-1 p-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-2xl">+</button>

          {/* Row 5 */}
          <button onClick={() => inputDigit(0)} className="col-span-2 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">0</button>
          <button onClick={inputDecimal} className="col-span-1 p-4 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-2xl">.</button>
          <button onClick={handleEqualsClick} className="col-span-1 p-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-2xl">=</button>
        </div>
      </div>
    </div>
  );
}