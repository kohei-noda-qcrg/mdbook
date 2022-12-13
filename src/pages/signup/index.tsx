import { NextPage } from 'next'
import { useRef } from 'react'
import auth from '~/utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const SignUp: NextPage = () => {
  const password = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('firebaseConfig', auth.firebaseConfig)
    console.log('登録', email.current?.value, password.current?.value)
    if (!email.current?.value || !password.current?.value) {
      return
    }
    const min_password_length = 6
    if (password.current.value.length < min_password_length) {
      alert(`パスワードは${min_password_length}文字以上で入力してください。`)
      return
    }
    createUserWithEmailAndPassword(
      auth.auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log('user', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('errorCode', errorCode)
        console.log('errorMessage', errorMessage)
      })
  }

  return (
    <div>
      <h1>ユーザ登録</h1>
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
          <button>登録</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
