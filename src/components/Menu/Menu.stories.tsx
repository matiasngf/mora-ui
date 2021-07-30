import React, { useState } from 'react'
import { Button } from '../Button/Button'
// import { Box } from '../Box/Box'
import { MenuItem, Menu } from './Menu'

export default {
  title: 'Components/MenuItem',
  component: Menu,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/o2XarByGc3Ba58PpOk3mYm/Libreria-de-UI?node-id=68%3A96'
    }
  }
}

export const ExampleMenu = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return(
  <>
    <Menu width={40} closedSize={10} closed={toggleMenu}>
      <MenuItem icon="☺" label="Icono"/> 
      <MenuItem icon="☺" label="Icono"/> 
      <MenuItem selected icon="☺" label="Icono"/> 
      <MenuItem icon="☺" label="Icono"/> 
    </Menu>

    <Button mt={4} size="small" onClick={()=>setToggleMenu(!toggleMenu)}>Toggle!</Button>
  </>
  )
  
}
