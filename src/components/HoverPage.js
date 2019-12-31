import React from "react";
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

const HoverPage = ({src, overlay, content}) => {
    return (
        <MDBView hover zoom>
            <img
            src={src}
            className="img-fluid"
            alt=""
            />
            <MDBMask className="flex-center" overlay={overlay}>
                <h1 style={{color:"white", fontWeight:"300", fontSize:"2.0rem"}}>{content}</h1>
            </MDBMask>
        </MDBView>
    );
}

export default HoverPage;