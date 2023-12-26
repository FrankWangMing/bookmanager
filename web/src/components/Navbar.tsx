import React, { useEffect } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
  Avatar
} from '@material-tailwind/react'
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import { viewmodel } from '../model'
import {
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon
} from '@heroicons/react/20/solid'

const colors = {
  blue: 'bg-blue-50 text-blue-500',
  orange: 'bg-orange-50 text-orange-500',
  green: 'bg-green-50 text-green-500',
  'blue-gray': 'bg-blue-gray-50 text-blue-gray-500',
  purple: 'bg-purple-50 text-purple-500',
  teal: 'bg-teal-50 text-teal-500',
  cyan: 'bg-cyan-50 text-cyan-500',
  pink: 'bg-pink-50 text-pink-500'
}

const navListMenuItems = [
  {
    color: 'blue',
    icon: FlagIcon,
    title: '去旅行吧',
    description: '定制自己的旅行计划，去旅行吧',
    path: '/travel'
  }
  // {
  //   color: 'orange',
  //   icon: ChatBubbleOvalLeftIcon,
  //   title: 'Press',
  //   description: 'News and writings, press releases, and resources'
  // },
  // {
  //   color: 'green',
  //   icon: UsersIcon,
  //   title: (
  //     <div className="flex items-center gap-1">
  //       Careers{' '}
  //       <Chip
  //         size="sm"
  //         color="green"
  //         variant="ghost"
  //         value="We're hiring!"
  //         className="capitalize"
  //       />
  //     </div>
  //   ),
  //   description: 'We are always looking for talented people. Join us!'
  // },
  // {
  //   color: 'blue-gray',
  //   icon: FolderIcon,
  //   title: 'Legal',
  //   description: 'All the stuff that we dan from legal made us add.'
  // },
  // {
  //   color: 'purple',
  //   icon: RocketLaunchIcon,
  //   title: 'Products',
  //   description: 'Checkout our products that helps a startup running.'
  // },
  // {
  //   color: 'teal',
  //   icon: FaceSmileIcon,
  //   title: 'Icons',
  //   description: 'Set of beautiful icons that you can use in your project.'
  // },
  // {
  //   color: 'cyan',
  //   icon: PuzzlePieceIcon,
  //   title: 'UI Kits',
  //   description: 'High quality UI Kits helps you to 2x faster.'
  // },
  // {
  //   color: 'pink',
  //   icon: GiftIcon,
  //   title: 'Open Source',
  //   description: "List of all our open-source projects, it's all free."
  // }
]

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const renderItems = navListMenuItems.map(
    ({ icon, path, title, description, color }, key) => (
      <a href={`${path}`} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 w-6'
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  )

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              小项目
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:my-0 lg:flex-row lg:p-1">
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          关于我
        </ListItem>
      </Typography>
    </List>
  )
}

function MNavbar() {
  const [openNav, setOpenNav] = React.useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
    console.log(viewmodel.userModel.userInfo)
  }, [])

  return (
    <div className="absolute left-2/4 z-[999] my-4 flex w-full max-w-screen-2xl -translate-x-2/4 flex-wrap items-center px-4 lg:fixed">
      <Navbar className="block w-full max-w-screen-2xl rounded-xl border border-white/80 px-8 py-4 pl-6 pr-2 text-white shadow-2xl shadow-blue-gray-500/10 backdrop-blur-2xl backdrop-saturate-200 lg:py-2.5">
        <div className="flex w-auto items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            <span>MING HOME</span>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            {viewmodel.userModel.userInfo ? (
              <Menu>
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt="candice wu"
                    className="cursor-pointer"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      navigate('/me')
                    }}
                  >
                    <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                    <Typography variant="small" className="font-normal">
                      我的主页
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2">
                    <InboxArrowDownIcon strokeWidth={2} className="h-4 w-4" />
                    <Typography variant="small" className="font-normal">
                      Inbox
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2">
                    <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
                    <Typography variant="small" className="font-normal">
                      Help
                    </Typography>
                  </MenuItem>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem
                    className="flex items-center gap-2 "
                    onClick={() => {
                      navigate('/')
                    }}
                  >
                    <PowerIcon strokeWidth={2} className="h-4 w-4" />
                    <Typography variant="small" className="font-normal">
                      退出登录
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Link to={'/login'}>
                  <Button variant="text" size="sm" color="blue-gray">
                    Sign In
                  </Button>
                </Link>
                <Link to={'/login'}>
                  <Button variant="gradient" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Sign In
            </Button>
            <Button variant="gradient" size="sm" fullWidth>
              Sign Up
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  )
}
export default observer(MNavbar)
