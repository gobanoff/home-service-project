import styles from "./ProfileModal.module.scss";
import * as React from "react";
import { useState } from "react";
import Button from "../Button";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  address: string;
  email: string;
  updateProfile: (name: string, email: string, adress: string) => void;
}
const ProfileModal = ({
  isOpen,
  onClose,
  name,
  email,
  address,
  updateProfile,
}: ProfileModalProps) => {
  const [profileData, setProfileData] = useState({ name, email, address });
  const [showConfirm, setShowConfirm] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
    updateProfile(profileData.name, profileData.email, profileData.address);
    setTimeout(() => {
      setShowConfirm(false);
    }, 4000);
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>Your Personal Data</h2>
        <p className={styles.profileWarning}>(You cannot edit your email)</p>
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Address :</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.saveButton}>
            <Button booking type="submit">
              Edit & Save Your Profile
            </Button>
          </div>
          {showConfirm && (
            <p className={styles.confirmText}>
              You have successfully updated your information
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
