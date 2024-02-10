import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import "./DisplayVendors.css";
import Button from "@mui/material/Button";

function DisplayVendors() {
  return (
    <div>
      <h3 className="HeaderTitle">List of Vendors</h3>
      <div>
        <div className="ListofBox">
          <div className="ListFontSize">
            <div className="d-flex justify-content-between">
              <div>Name : Meet Panchal</div>
              <div className="">
                {/* <EditIcon className="EditBtn border border-black rounded pointer">Edit</EditIcon> */}
                <Button
                  variant="contained" color="error"
                  startIcon={<EditIcon/>}
                  className=""
                >
                  Edit
                </Button>
              </div>
            </div>
            <div>variant : Baseball</div>
          </div>
        </div>
      </div>
      <div>
        <div className="ListofBox">
          <div className="ListFontSize">
            <div className="d-flex justify-content-between">
              <div>Name : Meet Panchal</div>
              <div className="">
                {/* <EditIcon className="EditBtn border border-black rounded pointer">Edit</EditIcon> */}
                <Button
                  variant="contained" color="error"
                  startIcon={<EditIcon/>}
                  className=""
                >
                  Edit
                </Button>
              </div>
            </div>
            <div>variant : Baseball</div>
          </div>
        </div>
      </div>
      <div>
        <div className="ListofBox">
          <div className="ListFontSize">
            <div className="d-flex justify-content-between">
              <div>Name : Meet Panchal</div>
              <div className="">
                {/* <EditIcon className="EditBtn border border-black rounded pointer">Edit</EditIcon> */}
                <Button
                  variant="contained" color="error"
                  startIcon={<EditIcon/>}
                  className=""
                >
                  Edit
                </Button>
              </div>
            </div>
            <div>variant : Baseball</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayVendors;
