import { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/consts";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { UserContext } from "@/context/UserContext";
import styles from "./Login.module.scss";
import { loginUser } from "@/components/user/api";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await loginUser({ email, password });
        login(response);
        navigate(ROUTES.HOME);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = () => {
    const formErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "Field is required";
    } else if (!emailPattern.test(email)) {
      formErrors.email = "Invalid email or password";
    }

    if (!password) {
      formErrors.password = "Field is required";
    } else if (password.length < 8) {
      formErrors.password = "Invalid email or password";
    }

    return formErrors;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.input}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <Button type="submit">Log in</Button>
        <div className={styles.link}>
          <Link to={ROUTES.REGISTER} className={styles.signUp}>
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
