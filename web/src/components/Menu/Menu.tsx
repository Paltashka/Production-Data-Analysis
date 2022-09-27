import { menuItems } from "../../utils/menuItems"
import { useAppContext } from "../../context/useAppContext"
import './index.scss'

const Menu = () => {
  const { setActiveTabId, activeTabId } = useAppContext()

  return (
    <div className='menu'>
      {menuItems.map((item, index) => (
        <div
          className='menu__item'
          key={index}
          onClick={() => setActiveTabId(index)}
          style={{
            color: activeTabId === index ? "#0096FF" : undefined
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default Menu