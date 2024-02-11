import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./DisplayVendors.css";
import { Accordion, Button } from "react-bootstrap";
import axios from "axios";
import Btn from "@mui/material/Button";
import SwipeRightAltTwoToneIcon from "@mui/icons-material/SwipeRightAltTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteModalPopup from "../../Components/ModalPopup/DeleteModalPopup";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

function DisplayVendors() {
  const navigate = useNavigate();
  const [vendorsList, setVendorsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const openModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteBtn = () => {
    setIsModalOpen(false);
    deleteProduct(deleteId);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3030/products/" + productId
      );
      if (response) {
        fetchVendors();
        console.log(`Product with ID ${productId} has been deleted.`);
      }
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://localhost:3030/products");
      setVendorsList(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="HeaderTitle">List of Vendors</h3>
        <Btn className="AddProductBtn" size="small" variant="contained" color="error" onClick={()=>{navigate('/addVendor')}} startIcon={<AddBusinessIcon />}>
          Add Product
        </Btn>
      </div>
      {vendorsList.length > 0 ? (
        vendorsList.map((item, index) => {
          return (
            <div className="mt-3" key={index}>
              <div className="ListofBox">
                <div className="ProductFontSize">
                  <div className="d-flex justify-content-between">
                    <div>Product Name : {item?.name}</div>
                    <div className="btnBlock">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="sm"
                        onClick={() => {
                          navigate("/updateVendor", {
                            state: { id: item.id },
                          });
                        }}
                        className="mx-1 btn btn-outline-primary"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="sm"
                        onClick={() => {
                          openModal(item?.id);
                        }}
                        className="mx-1 btn btn-outline-danger"
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                  <div>Description : {item.description}</div>
                  <div>
                    <Accordion className="mt-3">
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header className="AccordianHeaderFontSize">
                          Vendor Details
                        </Accordion.Header>
                        {item.vendors.map((vendor_D, i) => {
                          return (
                            <div>
                              <Accordion.Body
                                key={i}
                                className={
                                  item.vendors.length - 1 === i
                                    ? ""
                                    : "BorderBottom"
                                }
                              >
                                <div className="VendorFontSize">
                                  <div className="mb-2">
                                    <SwipeRightAltTwoToneIcon /> Vendor Name :{" "}
                                    {vendor_D.nameV}
                                  </div>
                                  <div className="mb-2">
                                    <SwipeRightAltTwoToneIcon /> Is Main :{" "}
                                    {vendor_D.is_main === true ? "Yes" : "No"}
                                  </div>
                                  {vendor_D?.variants?.length > 0 && (
                                    <div className="d-flex">
                                      <div>
                                        {" "}
                                        <SwipeRightAltTwoToneIcon /> Variant :{" "}
                                      </div>
                                      <div className="ps-1">
                                        {vendor_D.variants.map((variant, j) => {
                                          const size = Object.keys(variant)[0];
                                          const value = variant[size];
                                          return (
                                            <div key={j}>
                                              <div>
                                                {size} : {value}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* {item.vendors.length-1 !== i ?<hr/>: ""} */}
                              </Accordion.Body>
                            </div>
                          );
                        })}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div className="ListofBox mt-3">
            <div className="ProductFontSize d-flex justify-content-center">
              <div>No Vendors details Available</div>
            </div>
          </div>
        </div>
      )}
      <DeleteModalPopup
        isOpen={isModalOpen}
        onClose={closeModal}
        deletebtn={deleteBtn}
      />
    </div>
  );
}

export default DisplayVendors;
