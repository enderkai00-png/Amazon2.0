import React from 'react';

interface State { hasError: boolean; error?: Error | null }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You could log to an external service here
    // console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:20}}>
          <h2>Ha ocurrido un error en la aplicación</h2>
          <pre style={{whiteSpace:'pre-wrap', color:'#b00020'}}>{String(this.state.error)}</pre>
          <p>Revisa la consola del navegador para más detalles.</p>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
