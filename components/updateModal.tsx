import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { getCategories, updateProduct } from "../services/productEndPoints";
import styles from "../styles/updateModal.module.css";
import { Modal, Button } from "react-bootstrap";

export default function UpdateModal({ product }: any) {
  const [showModal, setShowModal] = useState(false);
  const [titleButton, setTitleButton] = useState(true);
  const [priceButton, setPriceButton] = useState(true);
  const [stockButton, setStockButton] = useState(true);
  const [categoriesButton, setCategoriesButton] = useState(true);
  const [descriptionButton, setDescriptionButton] = useState(true);
  const [imageButton, setImageButton] = useState(true);
  const [categories, setCategories]: any = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  const handleClickCategories = async () => {
    try {
      setCategoriesButton(!categoriesButton);
      if (!categories.length) {
        const response = await getCategories();
        setCategories(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: any) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const submit = async (values: any) => {
    await updateProduct(product.id, values);
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Update product
      </Button>

      <div>
        <Formik
          initialValues={{
            title: "",
            price: "",
            stock: "",
            categories: "",
            description: "",
            image: "",
          }}
          onSubmit={submit}
        >
          <Form className="w-50">
            <Modal show={showModal} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Product Title
                  </label>
                  <div className="d-flex">
                    <Field
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder={product.title}
                      disabled={titleButton}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-warning ms-2"
                      onClick={() => setTitleButton(!titleButton)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price(USD)
                  </label>
                  <div className="d-flex">
                    <Field
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder={product.price}
                      disabled={priceButton}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-warning ms-2"
                      onClick={() => setPriceButton(!priceButton)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <div className="d-flex">
                    <Field
                      type="number"
                      name="stock"
                      className="form-control"
                      placeholder={product.stock}
                      disabled={stockButton}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-warning ms-2"
                      onClick={() => setStockButton(!stockButton)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="categories" className="form-label">
                    Categories
                  </label>
                  <div className="d-flex">
                    {categoriesButton ? (
                      <Field
                        type="text"
                        name="categories"
                        className="form-control"
                        placeholder={product.categories}
                        disabled={true}
                      />
                    ) : (
                      <Field
                        component="select"
                        name="categories"
                        id="categories"
                        className="form-control"
                      >
                        <option hidden>{product.categories}</option>
                        {categories?.map((category: any) => (
                          <option value={category.categories} key={category.id}>
                            {category.categories}
                          </option>
                        ))}
                      </Field>
                    )}

                    <button
                      type="button"
                      className="btn btn-outline-warning ms-2"
                      onClick={handleClickCategories}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <div className="d-flex">
                    <Field
                      type="text"
                      name="description"
                      className="form-control"
                      placeholder={product.description}
                      disabled={descriptionButton}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-warning ms-2"
                      onClick={() => setDescriptionButton(!descriptionButton)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <label htmlFor="image" className="form-label">
                  Product Image
                </label>
                <div className="d-flex">
                  {imageButton ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.img}
                    />
                  ) : (
                    <div className="d-flex flex-column justify-content-center">
                      <input
                        type="file"
                        onChange={handleChange}
                        accept=".jpg, .jpeg, .png"
                        className="m-3"
                      />
                      <img
                        src={imageSrc.length ? imageSrc : product.image}
                        alt="product"
                        className={styles.img}
                      />
                      {imageSrc.length ? (
                        <>
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
                  )}
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-warning ms-2 mt-5"
                      onClick={() => setImageButton(!imageButton)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-info">
                  Update Product
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose}
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Formik>
      </div>
    </>
  );
}
