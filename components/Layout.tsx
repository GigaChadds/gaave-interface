import styles from "../styles/Layout.module.scss";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className={styles.container}>
      <Navigation />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
