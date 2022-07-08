import React from "react";
import "./styles.css";

interface IInput {
  input: any
  setInput : Function
}

export default function InputPostalCode({ input, setInput }: IInput) {
  const handleChange = (e:any) => {
    var numbers = /^[0-9]+$/;
    if (e.match(numbers)) {
      setInput(e);
    } else {
      setInput("");
    }
  };

  return (
    <div className="wrapper-input">
      <input
        value={input}
        autoComplete="postal-code"
        onChange={(e) => handleChange(e.target.value)}
        name="postal"
        maxLength={5}
        minLength={5}
        placeholder="Postal Code"
      />
    </div>
  );
}
