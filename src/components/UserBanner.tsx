import { useState, useCallback } from 'react'
import styles from '~/styles/UserBanner.module.css'
import { apiClient } from '~/utils/apiClient'
import type { UserInfo } from '$/types'
import type { ChangeEvent } from 'react'
import Link from 'next/link'
import { pagesPath } from '~/utils/$path'
import { useRecoilState } from 'recoil'
import { isDarkModeState } from '~/recoil/atoms/isDarkMode'
import { Switch } from '@mui/material'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import LightModeIcon from '@mui/icons-material/LightMode'

const UserBanner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState({} as UserInfo)
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState)

  const editIcon = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return

      setUserInfo(
        await apiClient.user.$post({
          headers: { authorization: token },
          body: { icon: e.target.files[0] }
        })
      )
    },
    [token]
  )

  const login = useCallback(async () => {
    const id = prompt('Enter the user id (See server/.env)')
    const pass = prompt('Enter the user pass (See server/.env)')
    if (!id || !pass) return alert('Login failed')

    let newToken = ''

    try {
      newToken = `Bearer ${
        (await apiClient.token.$post({ body: { id, pass } })).token
      }`
      setToken(newToken)
    } catch (e) {
      return alert('Login failed')
    }

    setUserInfo(
      await apiClient.user.$get({ headers: { authorization: newToken } })
    )
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setToken('')
    setIsLoggedIn(false)
  }, [])

  const handleToggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode)
    console.log(isDarkMode)
  }, [isDarkMode])

  return (
    <div>
      <div className={styles.userBanner}>
        <div>
          <Link href={pagesPath.$url()} className={styles.nav}>
            Home
          </Link>
          <Link href={pagesPath.markdown.$url()} className={styles.nav}>
            Markdown
          </Link>
        </div>
        <Switch
          checked={isDarkMode}
          onChange={handleToggleDarkMode}
          checkedIcon={<NightsStayIcon />}
          icon={<LightModeIcon />}
          style={{ color: isDarkMode ? '#737' : '#CC2' }}
        />
        <div className={styles.spacing} />
        <div>
          {isLoggedIn ? (
            <>
              <img src={userInfo.icon} className={styles.userIcon} />
              <span>{userInfo.name}</span>
              <input type="file" accept="image/*" onChange={editIcon} />
              <button onClick={logout}>LOGOUT</button>
            </>
          ) : (
            <button onClick={login}>LOGIN</button>
          )}
        </div>
      </div>
      <div className={styles.padding} />
    </div>
  )
}

export default UserBanner
