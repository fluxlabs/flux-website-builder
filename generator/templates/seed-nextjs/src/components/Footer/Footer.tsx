import styles from "./Footer.module.css";

interface FooterProps {
  siteTitle: string;
}

export default function Footer({ siteTitle }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.</p>
        <p>Manifested with Flux.</p>
      </div>
    </footer>
  );
}
