import BadgeRow from "./BadgeRow";
import styles from "./index.module.scss";
import Badge1 from "../../public/assets/badges/Badge1.png";
import Badge2 from "../../public/assets/badges/Badge2.png";
import Badge3 from "../../public/assets/badges/Badge3.png";
import Badge4 from "../../public/assets/badges/Badge4.png";
import Badge5 from "../../public/assets/badges/Badge5.png";
import Image from "next/image";

const listOfUnclaimedBadges = [
  {
    campaignId: 1,
    title: "Relief for Ukraine",
  },
  {
    campaignId: 2,
    title: "Relief for Taiwan",
  },
  {
    campaignId: 3,
    title: "Relief for Singapore",
  },
  {
    campaignId: 4,
    title: "Relief for Malaysia",
  },
];

const listOfClaimedBadge = [Badge1, Badge2, Badge3, Badge4, Badge5];

const CurrentBadges = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Badges</h2>
        <div>
          <h3>Your badges</h3>
          <ul className={styles.main_existing}>
            {listOfClaimedBadge.map((badge, index: number) => (
              <li key={`Badge_${index}`}>
                <Image src={badge} alt={`Badge_${index}`} layout="fill" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Yet to claim badges</h3>
          <ul className={styles.main_yet_to_claim}>
            {listOfUnclaimedBadges.map((badge) => (
              <li key={`Unclaimed_${badge.campaignId}`}>
                <BadgeRow data={badge} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrentBadges;
