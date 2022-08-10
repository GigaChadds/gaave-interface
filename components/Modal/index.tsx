import styles from "./index.module.scss";
import { VscChromeClose } from "react-icons/vsc";
import { coinMap } from "../../utils/constants/token";
import { ActionType } from "../StakingTable";
import { useState } from "react";
import Image from "next/image";

const Modal = ({
  selectedToken,
  closeModal,
  actionType,
}: {
  selectedToken: string;
  closeModal: () => void;
  actionType: ActionType;
}) => {
  const [amount, setAmount] = useState<number>(0.0);

  return (
    <>
      <div className={styles.background} onClick={closeModal}></div>
      <div className={styles.container}>
        <div className={styles.close}>
          <VscChromeClose size="100%" onClick={closeModal} />
        </div>
        <div className={styles.header}>
          {actionType}{" "}
          <div className={styles.header_image}>
            <Image
              src={coinMap[selectedToken]}
              alt={selectedToken}
              layout="fill"
            />
          </div>{" "}
          {selectedToken}
        </div>
        <div className={styles.counter}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value as unknown as number)}
          />
          <span onClick={() => setAmount(100)}>Max: 00</span>
        </div>

        <div className={styles.actionable}>
          <button type="button" onClick={() => console.log("lfg")}>
            Proceed
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
