import styles from "./PaymentModal.module.scss";

interface PaymentModalProps {
  isPaymentOpen: boolean;
  onClose: () => void;
}
const PaymentModal = ({ isPaymentOpen, onClose }: PaymentModalProps) => {
  if (!isPaymentOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Your Payments</h2>
      </div>
    </div>
  );
};

export default PaymentModal;
