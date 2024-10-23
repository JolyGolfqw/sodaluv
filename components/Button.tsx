// Button.tsx
import React from "react";
import styles from "@/styles/Button.module.scss";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
}
