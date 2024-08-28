import styles from "./SettingsModal.module.scss";

interface SettingsModalProps {
  isSettingsOpen: boolean;
  onClose: () => void;
}
const SettingsModal = ({ isSettingsOpen, onClose }: SettingsModalProps) => {
  if (!isSettingsOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Privacy Settings</h2>
      </div>
    </div>
  );
};

export default SettingsModal;
