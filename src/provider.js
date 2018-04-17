import { Component, Children } from 'react';
import PropTypes from 'prop-types';

// Make this better...
const isEmpty = array => !array.length;

const isQueryInDom = query => (
  !isEmpty(window.document.querySelectorAll(query))
);

class Provider extends Component {
  constructor(props) {
    super(props);

    this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    this.observer = null;

    this.state = {
      queries: [],
    };

    this.addQuery = this.addQuery.bind(this);
    this.queryExists = this.queryExists.bind(this);
    this.onChange = this.onChange.bind(this);
    this.watchElement = this.watchElement.bind(this);

    this.observer = new this.MutationObserver(this.onChange);
  }

  getChildContext() {
    return { watchElement: this.watchElement };
  }

  componentDidMount() {
    const {
      config,
      target,
    } = this.props;

    this.observer.observe(target, config);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  onChange() {
    this.state.queries.map(({ callback, query }) => callback(isQueryInDom(query)));
  }

  addQuery(data) {
    return this.setState(({ queries }) => ({
      queries: [data, ...queries],
    }));
  }

  queryExists(query) {
    return !isEmpty(this.state.queries.filter(ex => ex.query === query));
  }

  watchElement({ query, callback }) {
    if (!this.queryExists(query)) {
      this.addQuery({ callback, query });
    }
    callback(isQueryInDom(query));
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  watchElement: PropTypes.func.isRequired,
};
Provider.propTypes = {
  config: PropTypes.object,
  target: PropTypes.object,
};
Provider.defaultProps = {
  config: {
    childList: true,
    subtree: true,
  },
  target: window.document.documentElement,
};


export default Provider;
