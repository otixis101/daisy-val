import styles from "./Confetti.module.css"

export default function Confetti() {
  return (
    <div className={styles.confetti}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.confettiPiece}
          style={{ backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)` }}
        />
      ))}
    </div>
  )
}

