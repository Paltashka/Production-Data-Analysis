import { useEffect } from 'react';
import Chart from './components/Chart';
import Menu from './components/Menu';
import {
  getOrdersByTechnology,
  getOrderDue,
  getPiecesByStatus,
  getEstimate
} from './actions';

import { useAppContext } from './context/useAppContext';

import './App.css';

function App() {
  const { activeTabId, setActiveTab } = useAppContext()

  useEffect(() => {
    (async () => {
      switch (activeTabId) {
        case 0: {
          const result = await getOrdersByTechnology()
          setActiveTab(result)
          break;
        }
        case 1: {
          const result = await getOrderDue()
          setActiveTab(result)
          break;
        }
        case 2: {
          const result = await getPiecesByStatus()
          setActiveTab(result)
          break;
        }
        case 3: {
          const result = await getEstimate()
          setActiveTab(result)
          break;
        }
        default: break
      }
    })()
  }, [activeTabId])

  return (
    <div className='main-app'>
      <Chart />
      <Menu />
    </div>
  );
}

export default App;
