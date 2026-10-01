import { useState } from 'react'
import Tabs from './components/Tabs.jsx'
import TradePanel from './components/TradePanel.jsx'
import LimitPanel from './components/LimitPanel.jsx'
import { TRADE_MODES } from './constants/swap.js'
import './styles/swap.css'

function App() {
  const [activeTab, setActiveTab] = useState('swap')

  return (
    <main className="app-shell">
      <h1 className="visually-hidden">Token swap and bridge</h1>
      <section className="swap-widget" aria-label="Trade tokens">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        {/* Keep panels mounted so each mode retains its own form and Custom state. */}
        {TRADE_MODES.map(({ id }) => (
          <div key={id} id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`} hidden={activeTab !== id} tabIndex={0}>
            {id === 'limit' ? <LimitPanel /> : <TradePanel mode={id} isActive={activeTab === id} />}
          </div>
        ))}
      </section>
    </main>
  )
}
export default App
