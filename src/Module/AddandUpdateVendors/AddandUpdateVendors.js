import React from "react";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./AddandUpdateVendors.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddandUpdateVendors = () => {

  const navigate = useNavigate();

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

  const AddProduct = async (productDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3030/products/",
        productDetails
      );
      if (response) {
        alert("Product add Successfully.");
        console.log(`Product add Successfully.`);
        navigate("/VendorList");
      }
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  return (
    <div className="container">
      <div className="FormArea p-3">
        <div className="text-center pb-3">
          <h2>Add Vendors</h2>
        </div>

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
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const response = axios.get("http://localhost:3030/products");
            // setVendorsList(response.data);
            response.then((res) => {
              console.log(res);
              var PID = (res.data.length === 0 ? 0 :JSON.parse(res.data[res.data.length - 1].id)) + 1;
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

              AddProduct(transformedValues);
            });
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="p-3 mb-3">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={touched.description && errors.description}
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
                              className="col-lg-9"
                              controlId={`vendors.${vendorIndex}.nameV`}
                            >
                              <Form.Label>Vendor Name</Form.Label>
                              <Form.Control
                                type="text"
                                name={`vendors.${vendorIndex}.nameV`}
                                value={vendor.nameV}
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
                              className="col-lg-3 FormalignItem"
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
                          <FieldArray name={`vendors.${vendorIndex}.variants`}>
                            {({ push: pushVariant, remove: removeVariant }) => (
                              <div>
                                {vendor.variants.map(
                                  (variant, variantIndex) => (
                                    <div
                                      key={variantIndex}
                                      className="row mb-3"
                                    >
                                      <Form.Group
                                        as={Col}
                                        className="col-lg-5"
                                        controlId={`vendors.${vendorIndex}.variants.${variantIndex}.Variant`}
                                      >
                                        <Form.Label>Variant</Form.Label>
                                        <Form.Select
                                          name={`vendors.${vendorIndex}.variants.${variantIndex}.Variant`}
                                          value={variant.Variant}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.vendors &&
                                            touched.vendors[vendorIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex].Variant &&
                                            errors.vendors &&
                                            errors.vendors[vendorIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex].Variant
                                          }
                                        >
                                          <option value="">
                                            Select Variant
                                          </option>
                                          <option value="XS">XS</option>
                                          <option value="SM">SM</option>
                                          <option value="L">L</option>
                                          <option value="XL">XL</option>
                                          <option value="XXL">XXL</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                          {touched.vendors &&
                                            touched.vendors[vendorIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex].Variant &&
                                            errors.vendors &&
                                            errors.vendors[vendorIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex].Variant}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group
                                        as={Col}
                                        className="col-lg-5"
                                        controlId={`vendors.${vendorIndex}.variants.${variantIndex}.Variant_Number`}
                                      >
                                        <Form.Label>Number</Form.Label>
                                        <Form.Control
                                          type="number"
                                          name={`vendors.${vendorIndex}.variants.${variantIndex}.Variant_Number`}
                                          value={variant.Variant_Number}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.vendors &&
                                            touched.vendors[vendorIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex]
                                              .Variant_Number &&
                                            errors.vendors &&
                                            errors.vendors[vendorIndex] &&
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
                                            touched.vendors[vendorIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex]
                                              .Variant_Number &&
                                            errors.vendors &&
                                            errors.vendors[vendorIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex]
                                              .Variant_Number}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Col className="col-lg-2 FormalignItem justify-content-center">
                                        {vendor.variants.length - 1 !==
                                        variantIndex ? (
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              removeVariant(variantIndex)
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
                              variants: [{ Variant: "", Variant_Number: "" }],
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
                  <Button type="reset" variant="outline-danger">
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddandUpdateVendors;
