import React from "react";
import PropTypes from "prop-types";

import { CircularProgress } from "material-ui/Progress";

const Loading = ({ size, color }) => (
    <div className='loading'>
        <CircularProgress size={size || 50} color={color || "secondary"} />
    </div>
);

Loading.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}

export default Loading;
