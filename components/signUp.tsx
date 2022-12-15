import { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { createUser } from "../services/userEndPoints";
import * as yup from "yup";
import { useRouter } from "next/router";
import styles from "../styles/signUp.module.css";
import Image from "next/image";

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      alert("Registered successfully");
      await createUser(values);
      setSubmitted(true);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  return (
    <div className={styles.card}>
      <Image
        src="/Img/signUp.svg"
        alt="sign up"
        width={350}
        height={100}
        className={styles.image}
      />
      <div className={styles.content}>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={yup.object({
            email: yup.string().required("Email is required."),
            username: yup.string().required("User is required"),
            password: yup.string().required("Password is required"), //Will we be able to add
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={styles.body}>
              <div className={`mb-2 ${styles.input}`}>
                <Field type="text" name="email" placeholder="user@email.com" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorTxt}
                />
              </div>
              <div className={`mb-2 ${styles.input}`}>
                <Field type="text" name="username" placeholder="Username..." />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.errorTxt}
                />
              </div>
              <div className={`mb-2 ${styles.input}`}>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password..."
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorTxt}
                />
              </div>
              <button
                className={styles.registerBtn}
                type="submit"
                value="Login"
              >
                <span>Register</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
