import { FC, useState } from 'react'
import { Menu, Layout } from 'antd'
import {
  HomeOutlined,
  TeamOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Logo from '../Logo/Logo'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { LogoContainer } from './styles'

const { Sider } = Layout

const Navbar: FC = () => {
  const { push, pathname } = useRouter()

  const [collapsed, setCollapsed] = useState(false)

  const handleSignOut = () => {
    signOut()
    push('/login')
  }

  const menuItems: ItemType[] = [
    {
      key: '/',
      label: 'Home',
      icon: <HomeOutlined />,
      onClick: () => push('/'),
    },
    {
      key: '/companies',
      label: 'Companies',
      icon: <TeamOutlined />,
      onClick: () => push('/companies'),
    },
    {
      key: '/products',
      label: 'Products',
      icon: <ShoppingOutlined />,
      onClick: () => push('/products'),
    },
    {
      key: 'sign-out',
      label: 'Sign out',
      icon: <LogoutOutlined />,
      onClick: handleSignOut,
    },
  ]

  const openKeys = menuItems
    .filter((item) => item?.key === pathname)
    .map((item) => item?.key as string)

  return (
    <Sider
      collapsible
      width={260}
      breakpoint="lg"
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={openKeys}
        items={menuItems}
      />
    </Sider>
  )
}

export default Navbar
