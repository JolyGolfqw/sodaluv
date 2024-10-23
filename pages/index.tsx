import styles from "@/styles/Home.module.scss";
import { UserCard } from "@/components/UserCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <UserCard />
    </div>
  );
}
