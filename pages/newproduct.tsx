import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Layout from "../components/layout";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCategories, postProduct } from "../services/productEndPoints";
import Router from "next/router";

const NewProduct = (categories: any) => {
  const [message, setMessage] = useState(""); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     price: 0,
  //     stock: 0,
  //     categories: "",
  //     description: "",
  //     image: {},
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //     setMessage("Form submitted");
  //     postProduct(values);
  //     setSubmitted(true);
  //   },
  //   validationSchema: yup.object({
  //     title: yup.string().trim().required("Product name is required"),
  //     price: yup.number().positive("Value must be greater than 0"),
  //     stock: yup.number().positive("Value must be greater than 0"), //Will we be able to add
  //     description: yup.string().trim().required("Description is required"),
  //     // image: yup.string().trim().required("Must add a valid image URL"),
  //   }),
  // });

  const submit = async (values: any) => {
    console.log(values);
    setMessage("Form submitted");
    await postProduct(values);
    setSubmitted(true);
  };

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: any) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <Layout>
      <div>
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
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
              image: {},
            }}
            onSubmit={submit}
          >
            <Form className="w-50">
              <button
                type="button"
                className="btn btn-primary btn-xs mb-5 p-1"
                onClick={() => Router.back()}
              >
                Go Back
              </button>
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
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price {"(USD)"}
                </label>
                <Field type="number" name="price" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">
                  Stock
                </label>
                <Field name="stock" type="number" className="form-control" />
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
                  <option value="default" hidden>
                    Choose category...
                  </option>
                  {categories.categories?.map((category: any) => (
                    <option value={category.categories} key={category.id}>
                      {category.categories}
                    </option>
                  ))}
                </Field>
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
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Product Image
                </label>
                <br />
                <input type="file" onChange={handleOnChange} />
                <br />
                <img src={imageSrc} alt={imageSrc} />
                <br />
                <label htmlFor="image" className="form-label">
                  <Field
                    type="checkbox"
                    name="image"
                    id="image"
                    value={imageSrc}
                  />
                  Confirmar imagen
                </label>
                {/* {formik.errors.image && (
                <div className="text-danger">{formik.errors.image}</div>
              )} */}
              </div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </Form>
          </Formik>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await getCategories();

  return {
    props: {
      categories: res,
    },
  };
}

export default NewProduct;
