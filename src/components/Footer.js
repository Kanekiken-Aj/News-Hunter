import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    marginTop: "20px",
  };

  return (
    <footer style={footerStyle} className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="footer-box">
              <p>&copy; {currentYear} News-Hunter. All rights reserved by Achintya.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
