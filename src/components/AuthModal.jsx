import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

const DEFAULT_FORM = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function AuthModal() {
  const {
    authAvailable,
    authModalOpen,
    authMode,
    setAuthMode,
    setAuthModalOpen,
    signInUser,
    signUpUser,
    signInWithGoogleUser,
    sendReset,
  } = useAuth()

  const [form, setForm] = useState(DEFAULT_FORM)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authModalOpen) {
      setForm(DEFAULT_FORM)
      setError('')
      setMessage('')
      setLoading(false)
    }
  }, [authModalOpen])

  if (!authModalOpen) return null

  function close() {
    setAuthModalOpen(false)
  }

  function set(field, value) {
    setForm(current => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!authAvailable) {
      setError('Firebase innskráning er ekki stillt fyrir þetta verkefni ennþá.')
      return
    }

    if (authMode === 'signUp') {
      if (form.password.length < 6) {
        setError('Lykilorð þarf að vera að minnsta kosti 6 stafir.')
        return
      }

      if (form.password !== form.confirmPassword) {
        setError('Lykilorð passa ekki saman.')
        return
      }
    }

    if (authMode === 'reset' && !form.email) {
      setError('Sláðu inn netfang til að endurstilla lykilorð.')
      return
    }

    setLoading(true)

    try {
      if (authMode === 'signIn') {
        await signInUser(form.email, form.password)
        close()
      }

      if (authMode === 'signUp') {
        await signUpUser(form.name.trim(), form.email, form.password)
        close()
      }

      if (authMode === 'reset') {
        await sendReset(form.email)
        setMessage('Við sendum þér tölvupóst til að endurstilla lykilorð.')
      }
    } catch (submitError) {
      setError(mapAuthError(submitError))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setMessage('')

    if (!authAvailable) {
      setError('Firebase innskráning er ekki stillt fyrir þetta verkefni ennþá.')
      return
    }

    setLoading(true)

    try {
      await signInWithGoogleUser()
      close()
    } catch (submitError) {
      setError(mapAuthError(submitError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal-overlay" onClick={event => event.target === event.currentTarget && close()}>
      <div className="auth-modal">
        <button className="auth-modal__close" onClick={close} aria-label="Loka innskráningu">✕</button>

        <div className="auth-modal__header">
          <p className="auth-modal__eyebrow">Malía Sport reikningur</p>
          <h2 className="auth-modal__title">
            {authMode === 'signIn' && 'Skrá inn'}
            {authMode === 'signUp' && 'Nýskráning'}
            {authMode === 'reset' && 'Endurstilla lykilorð'}
          </h2>
          <p className="auth-modal__subtitle">
            Skráðu þig inn til að halda utan um pöntunina og fara í greiðslu.
          </p>
        </div>

        <div className="auth-modal__switcher">
          <button
            className={`auth-modal__switch${authMode === 'signIn' ? ' auth-modal__switch--active' : ''}`}
            onClick={() => setAuthMode('signIn')}
            type="button"
          >
            Skrá inn
          </button>
          <button
            className={`auth-modal__switch${authMode === 'signUp' ? ' auth-modal__switch--active' : ''}`}
            onClick={() => setAuthMode('signUp')}
            type="button"
          >
            Nýskráning
          </button>
        </div>

        {authMode !== 'reset' && (
          <>
            <button className="auth-modal__google" type="button" onClick={handleGoogleSignIn} disabled={loading}>
              <span className="auth-modal__google-icon" aria-hidden="true">G</span>
              <span>{authMode === 'signUp' ? 'Halda áfram með Google' : 'Skrá inn með Google'}</span>
            </button>
            <div className="auth-modal__divider">
              <span>Eða með netfangi</span>
            </div>
          </>
        )}

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {authMode === 'signUp' && (
            <label className="auth-modal__field">
              <span>Nafn</span>
              <input
                value={form.name}
                onChange={event => set('name', event.target.value)}
                placeholder="Fullt nafn"
                autoComplete="name"
              />
            </label>
          )}

          <label className="auth-modal__field">
            <span>Netfang</span>
            <input
              type="email"
              value={form.email}
              onChange={event => set('email', event.target.value)}
              placeholder="nafn@domain.is"
              autoComplete="email"
              required
            />
          </label>

          {authMode !== 'reset' && (
            <label className="auth-modal__field">
              <span>Lykilorð</span>
              <input
                type="password"
                value={form.password}
                onChange={event => set('password', event.target.value)}
                placeholder="Að minnsta kosti 6 stafir"
                autoComplete={authMode === 'signIn' ? 'current-password' : 'new-password'}
                required
              />
            </label>
          )}

          {authMode === 'signUp' && (
            <label className="auth-modal__field">
              <span>Staðfesta lykilorð</span>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={event => set('confirmPassword', event.target.value)}
                placeholder="Sláðu lykilorðið inn aftur"
                autoComplete="new-password"
                required
              />
            </label>
          )}

          {error && <p className="auth-modal__error">{error}</p>}
          {message && <p className="auth-modal__message">{message}</p>}

          <button className="auth-modal__submit" type="submit" disabled={loading}>
            {loading && 'Vinn...'}
            {!loading && authMode === 'signIn' && 'Skrá inn'}
            {!loading && authMode === 'signUp' && 'Búa til aðgang'}
            {!loading && authMode === 'reset' && 'Senda endurstillingu'}
          </button>
        </form>

        <button className="auth-modal__reset" type="button" onClick={() => setAuthMode(authMode === 'reset' ? 'signIn' : 'reset')}>
          {authMode === 'reset' ? 'Til baka í innskráningu' : 'Gleymt lykilorð?'}
        </button>
      </div>
    </div>
  )
}

function mapAuthError(error) {
  const code = error?.code || ''

  if (code === 'auth/invalid-credential') return 'Netfang eða lykilorð er rangt.'
  if (code === 'auth/email-already-in-use') return 'Netfangið er nú þegar í notkun.'
  if (code === 'auth/account-exists-with-different-credential') return 'Þetta netfang er nú þegar skráð með annarri innskráningaraðferð.'
  if (code === 'auth/invalid-email') return 'Netfangið er ekki gilt.'
  if (code === 'auth/missing-password') return 'Sláðu inn lykilorð.'
  if (code === 'auth/popup-closed-by-user') return 'Google glugganum var lokað áður en innskráning kláraðist.'
  if (code === 'auth/too-many-requests') return 'Of margar tilraunir. Reyndu aftur síðar.'
  if (code === 'auth/user-not-found') return 'Enginn aðgangur fannst með þessu netfangi.'
  if (code === 'auth/weak-password') return 'Lykilorðið er of veikt.'

  return 'Ekki tókst að skrá inn. Athugaðu upplýsingarnar og reyndu aftur.'
}