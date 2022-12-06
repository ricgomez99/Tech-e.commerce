import { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { createUser } from "../services/userEndPoints";
import * as yup from "yup";

export default function SignIn(){
    const [submitted,setSubmitted] = useState(false);

    const handleSubmit = async (values: any) => {
        alert("Registered successfully");
        await createUser(values)
        setSubmitted(true);
     
      };

    return (
        <div>
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
            <div className="mb-3">
                <Field
                  type="text"
                  name="email"
                  placeholder="user@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username..."
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password..."
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
                <button type="submit" value="Login">Register!</button>
            </Form>
            </Formik>
        </div>
    )
}