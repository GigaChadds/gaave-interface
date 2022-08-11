import styles from "./index.module.scss";
import { VscChromeClose } from "react-icons/vsc";
import { coinMap } from "../../utils/constants/token";
import { ActionType, GraphQLAaveCrypto_Balance } from "../StakingTable";
import { useState } from "react";
import Image from "next/image";
import useDeposit from "../../hooks/useDeposit";
import useWithdraw from "../../hooks/useWithdraw";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const Modal = ({
  campaignId,
  selectedToken,
  selectedTokenBalance,
  selectedTokenAddress,
  selectedTokenStakedAmount,
  closeModal,
  actionType,
}: {
  campaignId: number;
  selectedToken: string;
  selectedTokenBalance: number;
  selectedTokenAddress: string;
  selectedTokenStakedAmount: number;
  closeModal: () => void;
  actionType: ActionType;
}) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<number>(0.0);

  const {
    transactionHash: depositTxnHash,
    isDepositing,
    error: depositError,
    write: depositWrite,
    reset: depositReset,
    prepareOverridesArgs: depositPrepareOverridesArgs,
  } = useDeposit();

  const {
    transactionHash: withdrawTxnHash,
    isWithdrawing,
    error: withdrawError,
    write: withdrawWrite,
    reset: withdrawReset,
    prepareOverridesArgs: withdrawPrepareOverridesArgs,
  } = useWithdraw();

  const handleProceed = async () => {
    console.log({
      campaignId,
      selectedToken,
      selectedTokenBalance,
      selectedTokenAddress,
      selectedTokenStakedAmount,
      actionType,
    });
    if (amount <= 0) return;
    if (actionType == ActionType.DEPOSIT) {
      // Deposit
      const overridesArgs = await depositPrepareOverridesArgs(
        campaignId as unknown as number,
        selectedTokenAddress,
        String(amount),
        address!!
      );
      if (depositWrite) {
        depositWrite({
          recklesslySetUnpreparedArgs: [
            campaignId,
            selectedTokenAddress,
            ethers.utils.parseEther(String(amount)),
          ],
          recklesslySetUnpreparedOverrides: overridesArgs,
        });
      }
    } else {
      // Withdrawal
      const overridesArgs = await withdrawPrepareOverridesArgs(
        campaignId as unknown as number,
        selectedTokenAddress,
        String(amount),
        address!!
      );
      if (withdrawWrite) {
        withdrawWrite({
          recklesslySetUnpreparedArgs: [
            campaignId,
            selectedTokenAddress,
            ethers.utils.parseEther(String(amount)),
          ],
          recklesslySetUnpreparedOverrides: overridesArgs,
        });
      }
    }
  };

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
          <span
            onClick={() =>
              setAmount(
                actionType === ActionType.DEPOSIT
                  ? selectedTokenBalance
                  : selectedTokenStakedAmount
              )
            }
          >
            Max:{" "}
            {actionType === ActionType.DEPOSIT
              ? selectedTokenBalance
              : selectedTokenStakedAmount}
          </span>
        </div>

        <div className={styles.actionable}>
          <button type="button" onClick={handleProceed}>
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
