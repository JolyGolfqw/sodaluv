import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/UserCard.module.scss";
import CloseSVG from "@/components/icons/CloseSVG";
import { useUserStore } from "@/store";
import { Input } from "./Input";
import { Button } from "./Button";

export function UserCard() {
  const { setName } = useUserStore();
  const [localName, setLocalName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      if (storedName) {
        setLocalName(storedName);
        setName(storedName);
      }
    }
  }, [setName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleNameSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("name", localName);
    }
    setName(localName);
  };

  return (
    <div className={styles.card}>
      <CloseSVG className={styles.closeButton} />
      <div className={styles.heading}>Начать</div>

      <Input
        id="nameInput"
        type="text"
        value={localName}
        onChange={handleNameChange}
        placeholder="Ваше имя"
        label="Напишите ваше имя"
      />
      <div className={styles.buttons}>
        <Button onClick={handleNameSave} disabled={!localName}>
          Сохранить
        </Button>
        <div className={styles.links}>
          <Link href="/calculator">
            <Button>Открыть калькулятор</Button>
          </Link>
          <Link href="/password-generator">
            <Button>Открыть генератор</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
