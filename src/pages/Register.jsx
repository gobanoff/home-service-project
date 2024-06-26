import Input from "@/components/common/Input";
import styles from "./Register.module.scss";
import Button from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/consts";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";


const Register = () => {
  const { register } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      register(name, email, password);
      navigate(ROUTES.LOGIN);
    }

  };
  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Register</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className={styles.input}
        />   {errors.name && <p className={styles.error}>{errors.name}</p>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className={styles.input}
        />    {errors.email && <p className={styles.error}>{errors.email}</p>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className={styles.input}
        />  {errors.password && <p className={styles.error}>{errors.password}</p>}
        <Button type="submit">Register</Button>
        <div className={styles.link}>
          <Link to={ROUTES.LOGIN} className={styles.logIn}>
            Already have an account? Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
