import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Layout from "../../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/newproduct.module.css";
import { getCategories, postProduct } from "../../services/productEndPoints";
import Router from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";

export default function NewProduct(categories: any) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const submit = async (values: any) => {
    setMessage("Form submitted");
    await postProduct(values);
    setSubmitted(true);
    Router.push("/store");
  };

  function handleChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: any) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <Layout>
      <div>
        <div>
          <MdOutlineArrowBack
            onClick={() => Router.back()}
            className={styles.backBtn}
          />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>
          <Formik
            initialValues={{
              title: "",
              price: 0,
              stock: 0,
              categories: "",
              description: "",
              image: [],
            }}
            validationSchema={yup.object({
              title: yup.string().required("Product name is required"),
              price: yup.number().positive("Value must be greater than 0"),
              stock: yup.number().positive("Value must be greater than 0"), //Will we be able to add
              categories: yup.string().required("Category is required"),
              description: yup.string().required("Description is required"),
            })}
            onSubmit={submit}
          >
            <Form className="w-50">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Product Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="LOGITECH Wireless Mouse..."
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price {"(USD)"}
                </label>
                <Field type="number" name="price" className="form-control" />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <Field name="stock" type="number" className="form-control" />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categories" className="form-label">
                  Categories
                </label>
                <Field
                  component="select"
                  name="categories"
                  id="categories"
                  className="form-control"
                >
                  <option hidden>Choose category...</option>

                  {categories.categories?.map((category: any) => (
                    <option value={category.categories} key={category.id}>
                      {category.categories}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="categories"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Product description ..."
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Product Image
                </label>
                <br />
                <input
                  type="file"
                  onChange={handleChange}
                  accept=".jpg, .jpeg, .png"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-danger"
                />
                <br />
                {imageSrc.length ? (
                  <>
                    <img
                      src={imageSrc}
                      alt={imageSrc}
                      className={styles.imgUpload}
                    />
                    <br />
                    <label htmlFor="image" className="form-label">
                      <Field
                        type="checkbox"
                        name="image"
                        id="image"
                        value={imageSrc}
                      />
                      Confirm Image
                    </label>
                  </>
                ) : null}
              </div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await getCategories();

  return {
    props: {
      categories: res,
    },
  };
}
