import styles from "./MyAccountPage.module.scss";
import EmailForm from "../components/common/EmailForm";

const MyAccountPage = () => {
  return (
    <div className={styles.accountContainer}>
      <h1>MyAccount Page1</h1> <EmailForm />
    </div>
  );
};

export default MyAccountPage;
