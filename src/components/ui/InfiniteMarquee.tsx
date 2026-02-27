import styles from "./InfiniteMarquee.module.css";

interface InfiniteMarqueeProps {
  items: string[];
  speed?: "slow" | "normal" | "fast";
}

export default function InfiniteMarquee({ items, speed = "normal" }: InfiniteMarqueeProps) {
  return (
    <div className={styles.marqueeContainer}>
      <div className={`${styles.marqueeContent} ${styles[speed]}`}>
        {/* Render items twice to create the seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className={styles.item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
