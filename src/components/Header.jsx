import React from 'react'
import { Container, Logo, LogoutButton } from './index.js'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector(state => state.authReducer.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus, },
    { name: "Signup", slug: "/signup", active: !authStatus, },
    { name: "All Posts", slug: "/all-posts", active: authStatus, },
    { name: "Add Post", slug: "/add-post", active: authStatus, },
  ]
  return (
    <header className='py-3 shadow bg-neutral-900'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map(item => (
              item.active ?
                <li key={item.name}>
                  <button
                    className='inline-bock mx-2 px-6 py-2 rounded-full duration-200  hover:bg-neutral-800 active:bg-neutral-950/40'
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li> : null
            ))}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>

      </Container>
    </header >
  )
}

export default Header