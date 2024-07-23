import styles from "./EmailForm.module.scss";
import { useState, ChangeEvent, FormEvent } from "react";
import Input from "./Input";
import Button from "./Button";

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const EmailForm = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    to: "",
    subject: "",
    text: "",
    html: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("Email sent successfully");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        style={{ marginTop: "2rem" }}
        type="email"
        name="to"
        placeholder="Gavėjo el. paštas"
        value={emailData.to}
        onChange={handleChange}
        required
      />
      <Input
        style={{ marginTop: "2rem" }}
        type="text"
        name="subject"
        placeholder="Tema"
        value={emailData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        style={{
          marginTop: "2rem",
          borderRadius: "0.5rem",
          height: "5rem",
          padding: "1rem",
        }}
        name="text"
        placeholder="El. laiško tekstas"
        value={emailData.text}
        onChange={handleChange}
      />
      <textarea
        style={{
          marginTop: "2rem",
          borderRadius: "0.5rem",
          height: "5rem",
          padding: "1rem",
        }}
        name="html"
        placeholder="El. laiško HTML turinys"
        value={emailData.html}
        onChange={handleChange}
      />
      <Button
        style={{ marginTop: "2rem", height: "4rem", borderRadius: "0.5rem" }}
        type="submit"
      >
        Siųsti el. laišką
      </Button>
    </form>
  );
};

export default EmailForm;
