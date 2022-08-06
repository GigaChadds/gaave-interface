import { useEffect } from "react";
import CountUp from "react-countup";
import styles from "./index.module.scss";

const ProgressBar = ({
  maxValue,
  currentValue,
}: {
  maxValue: number;
  currentValue: number;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.main} id="something">
        <div
          className={styles.covered}
          style={{
            width: `${
              currentValue / maxValue >= 1
                ? 100
                : (currentValue / maxValue) * 100
            }%`,
            borderRadius: `${
              currentValue / maxValue >= 1 ? "1.5rem" : "1.5rem 0 0 1.5rem"
            }`,
            ["--to-width" as any]: `${
              currentValue / maxValue >= 1
                ? 100
                : (currentValue / maxValue) * 100
            }%`,
          }}
        />
      </div>
      <div className={styles.count}>
        $<CountUp start={0} end={currentValue} decimals={0} duration={2} /> /$
        {maxValue} raised!
      </div>
    </div>
  );
};

export default ProgressBar;
