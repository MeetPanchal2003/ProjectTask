import React, { useEffect, useState } from "react";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./AddandUpdateVendors.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessModalPopup from "../../Components/ModalPopup/SuccessModalPopup";

const AddandUpdateVendors = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    vendors: [
      {
        nameV: "",
        is_main: false,
        variants: [{ Variant: "", Variant_Number: "" }],
      },
    ],
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    vendors: Yup.array().of(
      Yup.object().shape({
        nameV: Yup.string().required("Vendor name is required"),
        is_main: Yup.boolean(),
        variants: Yup.array().of(
          Yup.object().shape({
            Variant: Yup.string().required("Variant name is required"),
            Variant_Number: Yup.number()
              .required("Number is required")
              .min(0, "Number must be a positive number"),
          })
        ),
      })
    ),
  });

  const getProductById = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/products/" + location.state.id
      );
      setIsUpdate(true);

      // Map over vendors and transform the variants array within each vendor
      const transformedVendors = response.data.vendors.map((vendor) => ({
        ...vendor,
        variants: vendor.variants.map((variantObj) => ({
          Variant: Object.keys(variantObj)[0], // Extracting the key as Variant
          Variant_Number: Object.values(variantObj)[0], // Extracting the value as Variant_Number
        })),
      }));

      console.log({
        id: response.data.id || "",
        name: response.data.name || "",
        description: response.data.description || "",
        vendors: transformedVendors,
      });

      setInitialValues({
        id: response.data.id || "",
        name: response.data.name || "",
        description: response.data.description || "",
        vendors: transformedVendors,
      });
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  // const getProductById = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3030/products/" + location.state.id
  //     );
  //     setIsUpdate(true);

  //     setInitialValues({
  //       name: response.data.name || "",
  //       description: response.data.description || "",
  //       vendors: response.data.vendors || [
  //         {
  //           nameV: "",
  //           is_main: false,
  //           variants: [{ Variant: "", Variant_Number: "" }],
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("Error fetching product by id:", error);
  //   }
  // };

  useEffect(() => {
    if (location.state && location.state.id) {
      getProductById();
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (isUpdate) {
        const Productid = location.state.id;

        const UpdatetransformedValues = {
          id: Productid,
          name: values.name,
          description: values.description,
          vendors: values.vendors.map((vendor) => ({
            nameV: vendor.nameV,
            is_main: vendor.is_main == undefined ? false : vendor.is_main,
            variants: vendor.variants.map((variant) => ({
              [variant.Variant]: variant.Variant_Number,
            })),
          })),
        };

        // AddProduct(transformedValues);
        const response = axios.put(
          `http://localhost:3030/products/${Productid}`,
          UpdatetransformedValues
        );

        if (response) {
          // alert("Product Updated successfully.");
          openModal("Product Updated successfully.");
          
        }
      } else {
        const respo = axios.get("http://localhost:3030/products");
        respo.then((res) => {
          var PID =
            (res.data.length === 0
              ? 0
              : JSON.parse(res.data[res.data.length - 1].id)) + 1;

          const transformedValues = {
            id: `${PID}`,
            name: values.name,
            description: values.description,
            vendors: values.vendors.map((vendor) => ({
              nameV: vendor.nameV,
              is_main: vendor.is_main == undefined ? false : vendor.is_main,
              variants: vendor.variants.map((variant) => ({
                [variant.Variant]: variant.Variant_Number,
              })),
            })),
          };

          const response = axios.post(
            "http://localhost:3030/products/",
            transformedValues
          );

          if (response) {
            openModal("Product added successfully.");
          }
        });
      }
    } catch (error) {
      console.error(
        "There was a problem with the " +
          (isUpdate ? "update" : "add") +
          " operation:",
        error
      );
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/VendorList");
    setModalMessage("");
  };

  return (
    <div className="container">
      <div className="FormArea p-3">
        <div className="text-center pb-3 BorderBottom">
          <h2>{isUpdate ? "Update Vendor" : "Add Vendor"}</h2>
        </div>
        {console.log(location.state)}
        {isUpdate
          ? initialValues.name && (
              <Formik
                initialValues={initialValues} // Set initialValues here
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="p-3 mb-3">
                        <Row className="mb-3">
                          <Form.Group as={Col} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12" controlId="name">
                            <Form.Label className="my-1">Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Enter Name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group as={Col} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12" controlId="description">
                            <Form.Label className="my-1">Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={1}
                              placeholder="Enter Description"
                              name="description"
                              value={values.description}
                              onChange={handleChange}
                              isInvalid={
                                touched.description && errors.description
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.description}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <FieldArray name="vendors">
                          {({ push, remove }) => (
                            <div>
                              {values.vendors.map((vendor, vendorIndex) => (
                                <div
                                  key={vendorIndex}
                                  className="p-3 border rounded border-black mb-3"
                                >
                                  <div className="d-flex justify-content-end">
                                    {values.vendors.length > 1 && (
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => remove(vendorIndex)}
                                      >
                                        <DeleteIcon />
                                      </Button>
                                    )}
                                  </div>

                                  <Row className="mb-3">
                                    <Form.Group
                                      as={Col}
                                      // className="col-lg-9"
                                      className="col-lg-9 col-md-9 col-xs-12 col-sm-12 col-12"
                                      controlId={`vendors.${vendorIndex}.nameV`}
                                    >
                                      <Form.Label className="my-1">Vendor Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name={`vendors.${vendorIndex}.nameV`}
                                        value={vendor.nameV}
                                        placeholder="Enter Vendor Name"
                                        onChange={handleChange}
                                        isInvalid={
                                          touched.vendors &&
                                          touched.vendors[vendorIndex] &&
                                          touched.vendors[vendorIndex].nameV &&
                                          errors.vendors &&
                                          errors.vendors[vendorIndex] &&
                                          errors.vendors[vendorIndex].nameV
                                        }
                                      />
                                      <Form.Control.Feedback
                                       type="invalid">
                                        {touched.vendors &&
                                          touched.vendors[vendorIndex] &&
                                          touched.vendors[vendorIndex].nameV &&
                                          errors.vendors &&
                                          errors.vendors[vendorIndex] &&
                                          errors.vendors[vendorIndex].nameV}
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                      as={Col}
                                      className="col-lg-3 FormalignItem col-md-3 col-xs-12 col-sm-12 col-12 mt-3"
                                      controlId={`vendors.${vendorIndex}.is_main`}
                                    >
                                      <Form.Check
                                        type="checkbox"
                                        label="Is Main"
                                        name={`vendors.${vendorIndex}.is_main`}
                                        checked={vendor.is_main}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Row>
                                  <FieldArray
                                    name={`vendors.${vendorIndex}.variants`}
                                  >
                                    {({
                                      push: pushVariant,
                                      remove: removeVariant,
                                    }) => (
                                      <div>
                                        {vendor.variants.map(
                                          (variant, variantIndex) => (
                                            <div
                                              key={variantIndex}
                                              className="row mb-3"
                                            >
                                              <Form.Group
                                                as={Col}
                                                className="col-lg-5 col-md-5 col-xs-12 col-sm-12 col-12"
                                                controlId={`vendors.${vendorIndex}.variants.${variantIndex}.Variant`}
                                              >
                                                <Form.Label className="my-1">Variant</Form.Label>
                                                <Form.Select
                                                  name={`vendors.${vendorIndex}.variants.${variantIndex}.Variant`}
                                                  value={variant.Variant}
                                                  onChange={handleChange}
                                                  isInvalid={
                                                    touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant
                                                  }
                                                >
                                                  <option value="">
                                                    Select Variant
                                                  </option>
                                                  <option value="XS">XS</option>
                                                  <option value="SM">SM</option>
                                                  <option value="L">L</option>
                                                  <option value="XL">XL</option>
                                                  <option value="XXL">
                                                    XXL
                                                  </option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                  {touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant}
                                                </Form.Control.Feedback>
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                className="col-lg-5 col-md-5 col-xs-12 col-sm-12 col-12"
                                                controlId={`vendors.${vendorIndex}.variants.${variantIndex}.Variant_Number`}
                                              >
                                                <Form.Label className="my-1">Number</Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  placeholder="Enter Number"
                                                  name={`vendors.${vendorIndex}.variants.${variantIndex}.Variant_Number`}
                                                  value={variant.Variant_Number}
                                                  onChange={handleChange}
                                                  isInvalid={
                                                    touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number
                                                  }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                  {touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number}
                                                </Form.Control.Feedback>
                                              </Form.Group>

                                              <Col className="col-lg-2 FormalignItem justify-content-center mt-3">
                                                {vendor.variants.length - 1 !==
                                                variantIndex ? (
                                                  <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                      removeVariant(
                                                        variantIndex
                                                      )
                                                    }
                                                  >
                                                    {/* <DeleteIcon /> */}
                                                    Remove
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                      pushVariant({
                                                        Variant: "",
                                                        Variant_Number: "",
                                                      })
                                                    }
                                                  >
                                                    Add Variant
                                                  </Button>
                                                )}
                                              </Col>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </FieldArray>
                                </div>
                              ))}
                              <div className="d-flex justify-content-center">
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    push({
                                      Vendor_Name: "",
                                      is_Main: false,
                                      variants: [
                                        { Variant: "", Variant_Number: "" },
                                      ],
                                    })
                                  }
                                >
                                  Add Vendor
                                </Button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <hr />
                      <Row>
                        <Col className="col-lg-6 d-flex justify-content-center">
                          <Button type="reset" variant="outline-danger" onClick={()=>{navigate('/')}}>
                            Cancel Data
                          </Button>
                        </Col>
                        <Col className="col-lg-6 d-flex justify-content-center">
                          <Button type="submit" variant="outline-primary">
                            Update Data
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            )
          : isUpdate == false &&
            !location.state && (
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  vendors: [
                    {
                      nameV: "",
                      is_main: false,
                      variants: [{ Variant: "", Variant_Number: "" }],
                    },
                  ],
                }} // Set initialValues here
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => {
                  console.log("Add");
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="p-3 mb-3">
                        <Row className="mb-3">
                          <Form.Group as={Col} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12" controlId="name">
                            <Form.Label className="my-1">Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Enter Name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group as={Col} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12" controlId="description">
                            <Form.Label className="my-1">Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={1}
                              name="description"
                              placeholder="Enter Description"
                              value={values.description}
                              onChange={handleChange}
                              isInvalid={
                                touched.description && errors.description
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.description}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <FieldArray name="vendors">
                          {({ push, remove }) => (
                            <div>
                              {values.vendors.map((vendor, vendorIndex) => (
                                <div
                                  key={vendorIndex}
                                  className="p-3 border rounded border-black mb-3"
                                >
                                  <div className="d-flex justify-content-end">
                                    {values.vendors.length > 1 && (
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => remove(vendorIndex)}
                                      >
                                        <DeleteIcon />
                                      </Button>
                                    )}
                                  </div>

                                  <Row className="mb-3">
                                    <Form.Group
                                      as={Col}
                                      // className="col-lg-9"
                                      className="col-lg-9 col-md-9 col-xs-12 col-sm-12 col-12"
                                      controlId={`vendors.${vendorIndex}.nameV`}
                                    >
                                      <Form.Label className="my-1">Vendor Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name={`vendors.${vendorIndex}.nameV`}
                                        value={vendor.nameV}
                                        placeholder="Enter Vendor Name"
                                        onChange={handleChange}
                                        isInvalid={
                                          touched.vendors &&
                                          touched.vendors[vendorIndex] &&
                                          touched.vendors[vendorIndex].nameV &&
                                          errors.vendors &&
                                          errors.vendors[vendorIndex] &&
                                          errors.vendors[vendorIndex].nameV
                                        }
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {touched.vendors &&
                                          touched.vendors[vendorIndex] &&
                                          touched.vendors[vendorIndex].nameV &&
                                          errors.vendors &&
                                          errors.vendors[vendorIndex] &&
                                          errors.vendors[vendorIndex].nameV}
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                      as={Col}
                                      className="col-lg-3 FormalignItem col-md-3 col-xs-12 col-sm-12 col-12 mt-3"
                                      controlId={`vendors.${vendorIndex}.is_main`}
                                    >
                                      <Form.Check
                                        type="checkbox"
                                        label="Is Main"
                                        name={`vendors.${vendorIndex}.is_main`}
                                        checked={vendor.is_main}
                                        onChange={handleChange}
                                      />
                                    </Form.Group>
                                  </Row>
                                  <FieldArray
                                    name={`vendors.${vendorIndex}.variants`}
                                  >
                                    {({
                                      push: pushVariant,
                                      remove: removeVariant,
                                    }) => (
                                      <div>
                                        {vendor.variants.map(
                                          (variant, variantIndex) => (
                                            <div
                                              key={variantIndex}
                                              className="row mb-3"
                                            >
                                              <Form.Group
                                                as={Col}
                                                className="col-lg-5 col-md-5 col-xs-12 col-sm-12 col-12"
                                                controlId={`vendors.${vendorIndex}.variants.${variantIndex}.Variant`}
                                              >
                                                <Form.Label className="my-1">Variant</Form.Label>
                                                <Form.Select
                                                  name={`vendors.${vendorIndex}.variants.${variantIndex}.Variant`}
                                                  value={variant.Variant}
                                                  onChange={handleChange}
                                                  isInvalid={
                                                    touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant
                                                  }
                                                >
                                                  <option value="">
                                                    Select Variant
                                                  </option>
                                                  <option value="XS">XS</option>
                                                  <option value="SM">SM</option>
                                                  <option value="L">L</option>
                                                  <option value="XL">XL</option>
                                                  <option value="XXL">
                                                    XXL
                                                  </option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                  {touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant}
                                                </Form.Control.Feedback>
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                className="col-lg-5 col-md-5 col-xs-12 col-sm-12 col-12"
                                                controlId={`vendors.${vendorIndex}.variants.${variantIndex}.Variant_Number`}
                                              >
                                                <Form.Label className="my-1">Number</Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  placeholder="Enter Number"
                                                  name={`vendors.${vendorIndex}.variants.${variantIndex}.Variant_Number`}
                                                  value={variant.Variant_Number}
                                                  onChange={handleChange}
                                                  isInvalid={
                                                    touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number
                                                  }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                  {touched.vendors &&
                                                    touched.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    touched.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number &&
                                                    errors.vendors &&
                                                    errors.vendors[
                                                      vendorIndex
                                                    ] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex] &&
                                                    errors.vendors[vendorIndex]
                                                      .variants[variantIndex]
                                                      .Variant_Number}
                                                </Form.Control.Feedback>
                                              </Form.Group>

                                              <Col className="col-lg-2 FormalignItem justify-content-center mt-3">
                                                {vendor.variants.length - 1 !==
                                                variantIndex ? (
                                                  <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                      removeVariant(
                                                        variantIndex
                                                      )
                                                    }
                                                  >
                                                    {/* <DeleteIcon /> */}
                                                    Remove
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                      pushVariant({
                                                        Variant: "",
                                                        Variant_Number: "",
                                                      })
                                                    }
                                                  >
                                                    Add Variant
                                                  </Button>
                                                )}
                                              </Col>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </FieldArray>
                                </div>
                              ))}
                              <div className="d-flex justify-content-center ">
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    push({
                                      Vendor_Name: "",
                                      is_Main: false,
                                      variants: [
                                        { Variant: "", Variant_Number: "" },
                                      ],
                                    })
                                  }
                                >
                                  Add Vendor
                                </Button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <hr />
                      <Row>
                        <Col className="col-lg-6 d-flex justify-content-center">
                          <Button type="reset" variant="outline-danger" onClick={()=>{navigate('/')}}>
                            Cancel Data
                          </Button>
                        </Col>
                        <Col className="col-lg-6 d-flex justify-content-center">
                          <Button type="submit" variant="outline-primary">
                            Submit Data
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            )}
      </div>
      <SuccessModalPopup
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default AddandUpdateVendors;
