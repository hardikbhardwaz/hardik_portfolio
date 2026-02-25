import React from 'react';

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'black', color: 'red', zIndex: 999999, padding: '2rem', overflow: 'auto' }}>
            <h2>GLOBAL REACT CRASH</h2>
            <pre style={{ fontSize: '10px' }}>{this.state.error?.toString()}</pre>
            <pre style={{ fontSize: '10px', marginTop: '1rem' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
