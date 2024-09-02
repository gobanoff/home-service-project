import styles from "./UpgradeModal.module.scss";

interface UpgradeModalProps {
  isUpgradeOpen: boolean;
  onClose: () => void;
}
const UpgradeModal = ({ isUpgradeOpen, onClose }: UpgradeModalProps) => {
  if (!isUpgradeOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Upgrade Account</h2>
      </div>
    </div>
  );
};

export default UpgradeModal;
