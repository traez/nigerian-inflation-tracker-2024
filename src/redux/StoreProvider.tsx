'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

/*
Client-Side Directive: Ensures the code runs on the client side in Next.js.
Imports: Brings in necessary hooks and components.
StoreProvider Component:
Uses useRef to persist the Redux store instance across renders.
Creates the Redux store only once.
Uses the Provider component to make the Redux store accessible to child components.
*/