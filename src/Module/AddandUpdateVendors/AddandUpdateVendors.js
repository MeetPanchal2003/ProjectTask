import React from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./AddandUpdateVendors.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Check } from "@mui/icons-material";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   vendors: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string().required("Vendor name is required"),
//       variants: Yup.array().of(
//         Yup.object().shape({
//           name: Yup.string().required("Variant name is required"),
//           quantity: Yup.number()
//             .required("Quantity is required")
//             .min(0, "Quantity must be a positive number"),
//         })
//       ),
//     })
//   ),
// });

const AddandUpdateVendors = ({}) => {
  const [inputs, setInputs] = React.useState([
    { Vendor_Name: "", is_Main: false, varients: [] },
  ]);

  const [inputsVariant, setInputsVariant] = React.useState([
    {
      Variant: "",
      Variant_Number: 0,
      VendorIndex: inputs.length === 0 ? 0 : inputs.length - 1,
      UniqNumber: 1,
    },
  ]);

  const handleAddInput = () => {
    setInputs([...inputs, { Vendor_Name: "", is_Main: false ,varients: []}]);
    setInputsVariant([
      ...inputsVariant,
      {
        Variant: "",
        Variant_Number: "",
        VendorIndex: inputs.length === 0 ? 0 : inputs.length,
        UniqNumber: inputsVariant[inputsVariant.length - 1].UniqNumber + 1,
      },
    ]);
  };

  console.log("inputs", inputs, "inputsVariant", inputsVariant);

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;

    const ArrayofVariants = [];

    inputsVariant.map((item) => {
      if (item.VendorIndex === index) {
        const Value = { [item.Variant]: item.Variant_Number };
        ArrayofVariants.push(Value);
      }
    });
    onChangeValue[index]["varients"] = ArrayofVariants;

    setInputs(onChangeValue);
  };

  const handleCheckbox = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = event.target.checked ? true : false;

    // const ArrayofVariants = [];

    // inputsVariant.map((item) => {
    //   if (item.VendorIndex === index) {
    //     const Value = { [item.Variant]: item.Variant_Number };
    //     ArrayofVariants.push(Value);
    //   }
    // });
    // onChangeValue[index]["varients"] = ArrayofVariants;

    setInputs(onChangeValue);
  };

  // const handleDeleteInput = (index) => {
  //   const newArray = [...inputs];
  //   newArray.splice(index, 1);
  //   setInputs(newArray);
  //   const removeVariant = inputsVariant.filter((val) => val.VendorIndex !== index);
  //   // const VendorLIST = 
  //   removeVariant.push({
  //     Variant: "",
  //     Variant_Number: "",
  //     VendorIndex: index,
  //     UniqNumber: inputsVariant[inputsVariant.length - 1].UniqNumber + 1,
  //   });
  //   setInputsVariant(removeVariant);
  // };

  const handleChangeVariant = (indexV, field, value, index) => {
    const newVariantData = [...inputsVariant];
    newVariantData[indexV][field] = value;
    newVariantData[indexV]["VendorIndex"] = index;
    setInputsVariant(newVariantData);
  };

  const handleAddVariantField = (index) => {
    setInputsVariant([
      ...inputsVariant,
      {
        Variant: "",
        Variant_Number: "",
        VendorIndex: index,
        UniqNumber: inputsVariant[inputsVariant.length - 1].UniqNumber + 1,
      },
    ]);
  };

  const handleRemoveVariantField = (index) => {
    const newVariantData = [...inputsVariant];
    newVariantData.splice(index, 1);
    setInputsVariant(newVariantData);
  };

  return (
    <div className="container">
      <div className="FormArea p-3">
        <div className="text-center pb-3">
          <h2>Add Vendors</h2>
        </div>

        <Form>
          <div className="p-3 mb-3">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="Product_Name"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Discription</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  rows={1}
                  name="Product_Discription"
                  placeholder="Enter Discription"
                />
              </Form.Group>
            </Row>

            {inputs.map((item, index) => (
              <div className="p-3 border rounded border-black mb-3" key={index}>
                {/* <div className="d-flex justify-content-end">
                  {inputs.length - 1 !== 0 ? (
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDeleteInput(index);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : (
                    ""
                  )}
                </div> */}
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-lg-9"
                    controlId="formGridEmail"
                  >
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Vendor Name"
                      name="Vendor_Name"
                      value={item.Vendor_Name}
                      onChange={(event) => handleChange(event, index)}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-lg-3 FormalignItem fs-4"
                    id="formGridCheckbox"
                  >
                    <Form.Check
                      type="checkbox"
                      label="Is Main"
                      name="is_Main"
                      value={item.is_Main}
                      onChange={(event) => handleCheckbox(event, index)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  {inputsVariant.map((field, indexV) =>
                    field.VendorIndex === index ? (
                      <div key={indexV} className="row mb-3">
                        <Form.Group
                          as={Col}
                          className="col-lg-4"
                          controlId="formGridEmail"
                        >
                          <Form.Label>Variant</Form.Label>
                          <Form.Control
                            as="select"
                            name="Variant"
                            value={field.value}
                            onChange={(e) =>
                              handleChangeVariant(
                                indexV,
                                "Variant",
                                e.target.value,
                                index
                              )
                            }
                            custom
                          >
                            <option value="">Select Variant</option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          className="col-lg-4"
                          controlId="formGridEmail"
                        >
                          <Form.Label>Number</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Number"
                            name="Variant_Number"
                            value={field.value}
                            onChange={(e) =>
                              handleChangeVariant(
                                indexV,
                                "Variant_Number",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          className="col-lg-4 FormalignItem"
                          controlId="formGridEmail"
                        >
                          {inputsVariant.filter(
                            (val) => val.VendorIndex === index
                          )[
                            inputsVariant.filter(
                              (val) => val.VendorIndex === index
                            ).length - 1
                          ].UniqNumber === field.UniqNumber ? (
                            <Button
                              variant="primary"
                              onClick={() => {
                                handleAddVariantField(index);
                              }}
                            >
                              Add Variant
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleRemoveVariantField(index);
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </Form.Group>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </Row>
              </div>
            ))}
            <Row>
              <Form.Group
                as={Col}
                className="col-lg-12 d-flex justify-content-center"
                controlId="formGridEmail"
              >
                <Button variant="primary" onClick={() => handleAddInput()}>
                  Add Vendors
                </Button>
              </Form.Group>
            </Row>
          </div>
          <hr></hr>
          <Row>
              <Form.Group
                as={Col}
                className="col-lg-6 d-flex justify-content-center"
                controlId="formGridEmail"
              >
                <Button variant="outline-danger" onClick={() => handleAddInput()}>
                  Cancle Data
                </Button>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-lg-6 d-flex justify-content-center"
                controlId="formGridEmail"
              >
                <Button variant="outline-primary" onClick={() => handleAddInput()}>
                  Submit Data
                </Button>
              </Form.Group>
            </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddandUpdateVendors;
