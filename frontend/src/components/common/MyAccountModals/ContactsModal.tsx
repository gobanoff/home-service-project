import styles from "./ContactsModal.module.scss";

interface ContactsModalProps {
  isContactsOpen: boolean;
  onClose: () => void;
}
const ContactsModal = ({ isContactsOpen, onClose }: ContactsModalProps) => {
  if (!isContactsOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Contacts</h2>
      </div>
    </div>
  );
};

export default ContactsModal;
