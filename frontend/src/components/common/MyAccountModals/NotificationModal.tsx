import styles from "./NotificationModal.module.scss";

interface NotificationModalProps {
  isNotificationOpen: boolean;
  onClose: () => void;
}
const NotificationModal = ({
  isNotificationOpen,
  onClose,
}: NotificationModalProps) => {
  if (!isNotificationOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Notifications</h2>
      </div>
    </div>
  );
};

export default NotificationModal;
