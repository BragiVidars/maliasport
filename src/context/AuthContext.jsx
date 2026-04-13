import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, hasFirebaseConfig } from '../lib/firebase'

const AuthContext = createContext(null)
const googleProvider = auth ? new GoogleAuthProvider() : null

if (googleProvider) {
  googleProvider.setCustomParameters({ prompt: 'select_account' })
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(!hasFirebaseConfig)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signIn')

  useEffect(() => {
    if (!auth) return undefined

    const unsubscribe = onAuthStateChanged(auth, nextUser => {
      setUser(nextUser)
      setAuthReady(true)
    })

    return unsubscribe
  }, [])

  function openAuthModal(mode = 'signIn') {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  async function signInUser(email, password) {
    if (!auth) throw new Error('Firebase auth er ekki stillt.')
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function signUpUser(name, email, password) {
    if (!auth) throw new Error('Firebase auth er ekki stillt.')

    const credentials = await createUserWithEmailAndPassword(auth, email, password)

    if (name) {
      await updateProfile(credentials.user, { displayName: name })
      setUser({ ...credentials.user, displayName: name })
    }

    return credentials
  }

  async function signOutUser() {
    if (!auth) return
    await signOut(auth)
  }

  async function signInWithGoogleUser() {
    if (!auth || !googleProvider) throw new Error('Firebase auth er ekki stillt.')
    return signInWithPopup(auth, googleProvider)
  }

  async function sendReset(email) {
    if (!auth) throw new Error('Firebase auth er ekki stillt.')
    return sendPasswordResetEmail(auth, email)
  }

  const value = useMemo(() => ({
    user,
    authReady,
    authAvailable: hasFirebaseConfig,
    authModalOpen,
    authMode,
    setAuthModalOpen,
    setAuthMode,
    openAuthModal,
    signInUser,
    signUpUser,
    signInWithGoogleUser,
    signOutUser,
    sendReset,
  }), [authMode, authModalOpen, authReady, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}