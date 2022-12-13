import { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import auth from '~/utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login: NextPage = () => {
  const password = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('firebaseConfig', auth.firebaseConfig)
    console.log('登録', email.current?.value, password.current?.value)
    if (!email.current?.value || !password.current?.value) {
      return
    }
    const cred = await signInWithEmailAndPassword(
      auth.auth,
      email.current.value,
      password.current.value
    )
    const id = await cred.user?.getIdToken()
    // set cookie
    document.cookie = `token=${id}`
    // save cookie to local storage
    localStorage.setItem('token', id)
  }

  useEffect(() => {
    // If cookie is set in local storage, redirect to home page
    if (localStorage.getItem('token')) {
      window.location.href = '/markdown'
    }
  }, [])
  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" ref={email} />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" ref={password} />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </form>
    </div>
  )
}

export default Login
