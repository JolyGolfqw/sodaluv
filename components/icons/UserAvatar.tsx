import React from "react";
import styles from "@/styles/UserAvatar.module.scss";

type UserAvatarProps = {
  name: string;
};

export default function UserAvatar({ name }: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={styles.avatarContainer}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.avatarCircle}
      >
        <circle cx="19" cy="19" r="19" fill="#3B75A2" />
      </svg>
      <span className={styles.avatarText}>{initial}</span>
    </div>
  );
}
