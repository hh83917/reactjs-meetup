import React from "react";
import PropTypes from 'prop-types';
import fetchJsonp from "fetch-jsonp";

class Fetch extends React.Component {
  constructor() {
    super();
    this.state = { data: "" };
  }

  componentDidMount() {
    this.setState({ data: this.props.loading() });
    fetchJsonp(this.props.url)
      .then(res => res.json())
      .then(
        res => {
          if (res.data.errors)
            return this.setState({
              data: this.props.error(res.data.errors[0].message)
            });
          this.setState({ data: this.props.done(res.data) });
        },
        res => this.setState({ data: this.props.error() })
      );
  }

  render() {
    return this.state.data;
  }
}

Fetch.propTypes = {
    url: PropTypes.string.isRequired,
    loading: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
};

export default Fetch;
