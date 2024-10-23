import React from "react";
import styles from "@/styles/Input.module.scss";

type InputProps = {
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  type: string;
  min?: string;
  max?: string;
};

export function Input({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
  min,
  max,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
        min={min}
        max={max}
      />
    </div>
  );
}
