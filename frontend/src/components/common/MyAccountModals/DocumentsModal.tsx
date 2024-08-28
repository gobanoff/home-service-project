import styles from "./DocumentsModal.module.scss";

interface DocumentsModalProps {
  isDocumentsOpen: boolean;
  onClose: () => void;
}
const DocumentsModal = ({ isDocumentsOpen, onClose }: DocumentsModalProps) => {
  if (!isDocumentsOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Documents</h2>
      </div>
    </div>
  );
};

export default DocumentsModal;
