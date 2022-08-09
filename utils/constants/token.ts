import USDCLogo from "../../public/assets/coins/usdc.svg";
import WETHLogo from "../../public/assets/coins/weth.svg";
import USDTLogo from "../../public/assets/coins/usdt.svg";
import WMaticLogo from "../../public/assets/coins/wmatic.svg";
import DaiLogo from "../../public/assets/coins/dai.svg";
import WBTCLogo from "../../public/assets/coins/wbtc.svg";
import AaveLogo from "../../public/assets/coins/aave.svg";

export const coinMap: { [key: string]: any } = {
  DAI: DaiLogo,
  USDC: USDCLogo,
  USDT: USDTLogo,
  WBTC: WBTCLogo,
  AAVE: AaveLogo,
  WETH: WETHLogo,
  "Wrapped Matic": WMaticLogo,
};
