import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) return (
      <div style={{background:"#1E2D3E",color:"#ECF2F8",padding:20,fontFamily:"sans-serif",minHeight:"100vh"}}>
        <h2 style={{color:"#EF4444"}}>⚠️ Fehler beim Laden</h2>
        <pre style={{fontSize:12,color:"#F59E0B",whiteSpace:"pre-wrap"}}>{this.state.error?.message}</pre>
        <button onClick={()=>window.location.reload()} style={{marginTop:16,padding:"8px 16px",background:"#F0B429",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>Neu laden</button>
      </div>
    );
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary><App/></ErrorBoundary>
  </React.StrictMode>
)
