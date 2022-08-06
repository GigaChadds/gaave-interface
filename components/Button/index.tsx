import styles from "./index.module.scss";
import { MoonLoader } from "react-spinners";

const Button = ({
  handleClick,
  text,
  loading,
}: {
  handleClick: () => void;
  text: string;
  loading: boolean;
}) => {
  return (
    <div className={styles.main}>
      {loading ? (
        <button disabled style={{ textAlign: "left" }}>
          <MoonLoader loading={true} color="white" size={20} />
        </button>
      ) : (
        <button type="button" onClick={handleClick}>
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
