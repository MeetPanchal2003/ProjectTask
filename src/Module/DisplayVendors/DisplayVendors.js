import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./DisplayVendors.css";
import { Accordion ,Button} from "react-bootstrap";
import axios from "axios";
import Btn from "@mui/material/Button";
import SwipeRightAltTwoToneIcon from '@mui/icons-material/SwipeRightAltTwoTone';
import DeleteIcon from "@mui/icons-material/Delete";

function DisplayVendors() {
  const [vendorsList, setVendorsList] = useState([]);

  const [openProduct, setOpenProduct] = useState(null);

  const toggleAccordion = (productId) => {
    setOpenProduct(openProduct === productId ? null : productId);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:3030/products/'+productId);
        if(response){
          alert("Deleted Successfully")
          fetchVendors()
          console.log(`Product with ID ${productId} has been deleted.`);
        }
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  // const deleteProduct = (index) => {
  //   fetch(`http://localhost:3000/products/${index}`, {
  //     method: 'DELETE'
  //   })
  //   .then(response => response.json())
  //   .then(() => {
  //     const updatedProducts = [...vendorsList];
  //     updatedProducts.splice(index, 1);
  //     setVendorsList(updatedProducts);
  //   })
  //   .catch(error => console.error('Error deleting product:', error));
  // };

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
      <h3 className="HeaderTitle">List of Vendors</h3>
      {vendorsList.length > 0
        ? vendorsList.map((item, index) => {
            return (
              <div>
                <div className="ListofBox">
                  <div className="ProductFontSize">
                    <div className="d-flex justify-content-between">
                      <div>Product Name : {item?.name}</div>
                      <div className="">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="sm"
                          className="mx-1 btn btn-outline-primary"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="sm"
                          onClick={()=>{deleteProduct(item?.id)}}
                          className="mx-1 btn btn-outline-danger"
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </div>
                    <div>Description : {item.description}</div>
                    {/* {console.log(item.vendors)} */}
                    <div>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey={index.toString()} key={index}>
                          <Accordion.Header className="AccordianHeaderFontSize">
                            Vendor Details
                          </Accordion.Header>
                          {item.vendors.map((vendor_D, i) => {
                            return (
                              <div>
                              <Accordion.Body key={i} className={item.vendors.length-1 === i ?"": "BorderBottom"}>
                                <div className="VendorFontSize">
                                
                                  <div className="mb-2"><SwipeRightAltTwoToneIcon/> Vendor Name : {vendor_D.nameV}</div>
                                  <div  className="mb-2">
                                  <SwipeRightAltTwoToneIcon/> Is Main :{" "}
                                    {vendor_D.is_main === true ? "Yes" : "No"}
                                  </div>
                                  {vendor_D?.variants?.length > 0 && (
                                    <div className="d-flex">
                                      
                                      <div> <SwipeRightAltTwoToneIcon/> Variant : </div>
                                      <div className="ps-1">
                                      {vendor_D.variants.map((variant, j) => {
                                        const size = Object.keys(variant)[0];
                                        const value = variant[size];
                                        return (
                                          <div key={j}>
                                            <div>{size} : {value}</div>
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
        : "No Product Available"}
    </div>
  );
}

export default DisplayVendors;
