import { Component } from 'react';

// import './app.css';

export class App extends Component {
  render() {
    const title = 'reactapp';
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <happynrwl-greeting title={title} />
          <img
            width="300"
            src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png"
            alt=''
          />
        </div>
        <p>
          This is a React app built with <a href="https://nx.dev">Nx</a>.
        </p>
      </div>
    );
  }
}