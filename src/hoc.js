import { createElement, Component } from 'react';
import PropTypes from 'prop-types';

const Hoc = query => (ComponentToRender) => {
  class hocComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        inView: false,
      };

      this.inView = this.inView.bind(this);
      context.watchElement({
        callback: this.inView,
        query,
      });
    }

    inView(inView) {
      this.setState({ inView });
    }

    render() {
      const { inView } = this.state;

      return (
        inView ? (
          createElement(ComponentToRender, this.props)
        ) : (
          null
        )
      );
    }
  }

  hocComponent.contextTypes = {
    watchElement: PropTypes.func.isRequired,
  };
  return hocComponent;
};

export default Hoc;
