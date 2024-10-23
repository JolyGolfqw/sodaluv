import { useState } from "react";
import styles from "@/styles/PasswordGenerator.module.scss";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import CopySVG from "@/components/icons/CopySVG";

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [avoidRepeats, setAvoidRepeats] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";
    let charSet = "";

    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    let password = "";
    const usedChars = new Set();

    for (let j = 0; j < passwordLength; j++) {
      let randomChar;
      do {
        randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
      } while (avoidRepeats && usedChars.has(randomChar));

      password += randomChar;
      if (avoidRepeats) usedChars.add(randomChar);
    }

    setPasswords([...passwords, password]);
  };

  const handleCopy = (password: string) => {
    navigator.clipboard.writeText(password);
    alert("Пароль скопирован!");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>Генератор паролей</h1>
        <div className={styles.passwordsContainer}>
          <div className={styles.generator}>
            <Input
              id="passwordInput"
              type="number"
              label="Длина пароля:"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              min="4"
              max="32"
            />

            <div className={styles.options}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className={styles.checkbox}
                />
                Использовать прописные буквы
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className={styles.checkbox}
                />
                Использовать строчные буквы
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className={styles.checkbox}
                />
                Использовать цифры
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className={styles.checkbox}
                />
                Использовать символы
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={avoidRepeats}
                  onChange={(e) => setAvoidRepeats(e.target.checked)}
                  className={styles.checkbox}
                />
                Избегать повторения символов
              </label>
            </div>
            <Button onClick={generatePassword}>Сгенерировать пароль</Button>
          </div>

          <div className={styles.passwordList}>
            {passwords.map((password, index) => (
              <div key={index} className={styles.passwordItem}>
                <input
                  type="text"
                  value={password}
                  readOnly
                  className={styles.passwordInput}
                />
                <CopySVG
                  onClick={() => handleCopy(password)}
                  className={styles.copyButton}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
