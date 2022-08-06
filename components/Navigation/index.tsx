import styles from "./index.module.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GaaveLogo from "../../public/assets/misc/gaave_title.png";
import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav id="Navigation" className={styles.container}>
      <div className={styles.main}>
        <Link href={"/"} passHref>
          <div className={styles.main_logo}>
            <Image src={GaaveLogo} alt="Gaave Logo" layout="fill" />
          </div>
        </Link>

        <div className={styles.connect_button}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
