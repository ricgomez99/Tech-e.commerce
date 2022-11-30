import { useState } from "react";

import { useFormik } from "formik";
import type { NextPage } from "next";
import * as yup from "yup";

import Layout from "../components/layout";
import Footer from "../components/footer";

import "bootstrap/dist/css/bootstrap.min.css";

import { getCategories, postProduct } from "../services/productEndPoints";
import Router from "next/router";

const NewProduct: NextPage = () => {
  const [message, setMessage] = useState(""); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      stock: 0,
      categories: "Desktop",
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      setMessage("Form submitted");
      postProduct(values);
      setSubmitted(true);
    },
    validationSchema: yup.object({
      title: yup.string().trim().required("Product name is required"),
      price: yup.number().positive("Value must be greater than 0"),
      stock: yup.number().positive("Value must be greater than 0"), //Will we be able to add
      description: yup.string().trim().required("Description is required"),
      image: yup.string().trim().required("Must add a valid image URL"),
    }),
  });

  return (
    <Layout>
      <div>
      

        <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
          <div hidden={!submitted} className="alert alert-primary" role="alert">
            {message}
          </div>

          <form className="w-50" onSubmit={formik.handleSubmit}>
            <button type="button" className="btn btn-primary btn-xs mb-5 p-1" onClick={() => Router.back()}>Go Back</button>
            {/*  */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="LOGITECH Wireless Mouse..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && (
                <div className="text-danger">{formik.errors.title}</div>
              )}
            </div>
            {/*  */}
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price {"(USD)"}
              </label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.price && (
                <div className="text-danger">{formik.errors.price}</div>
              )}
            </div>
            {/*  */}
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                className="form-control"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.stock && (
                <div className="text-danger">{formik.errors.stock}</div>
              )}
            </div>
            {/*  */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Product description ..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
            </div>
            {/*  */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Product Image
              </label>
              <input
                type="text"
                name="image"
                className="form-control"
                placeholder="Image URL..."
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.image && (
                <div className="text-danger">{formik.errors.image}</div>
              )}
            </div>
            {/*  */}

            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
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
