import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Header.module.scss";
import { useUserStore } from "@/store";
import UserAvatar from "./icons/UserAvatar";

export function Header() {
  const router = useRouter();
  const name = useUserStore((state) => state.name);
  console.log(name);

  const navItems = [
    { path: "/", label: "Название" },
    { path: "/", label: "Главная" },
    { path: "/calculator", label: "Калькулятор" },
    { path: "/password-generator", label: "Генератор паролей" },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={router.pathname === item.path ? styles.active : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.userProfile}>
        <span>{name}</span>
        <UserAvatar name={name} />
      </div>
    </header>
  );
}
