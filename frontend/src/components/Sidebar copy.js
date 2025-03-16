import React from "react";
import { Home, List, Plus } from "lucide-react";
import styles from "./styles/Dashboard.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Home size={24} className={styles.icon} />
      <Plus size={24} className={styles.icon} />
      <List size={24} className={styles.icon} />
    </aside>
  );
};

export default Sidebar;
