import styles from "./index.module.scss";

const UnclaimedYield = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Yield</h2>
        <div>
          <p>You have unclaimed amount of XX yield</p>
          <button type="button" className={styles.button}>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnclaimedYield;
