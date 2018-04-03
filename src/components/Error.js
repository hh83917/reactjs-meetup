import React from "react";
import PropTypes from "prop-types";

const Error = ({ error, message }) => (
  <div>
    {message ? <div>{error}</div> : "Error fetching information."}
    {error && <div>{error}</div>}
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.string
};

export default Error;
