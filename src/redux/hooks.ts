import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

/*
Imports: Brings in necessary hooks from react-redux and types from your store module.
Custom Hooks: Defines custom hooks (useAppDispatch, useAppSelector, useAppStore) that are typed with your application's specific types (AppDispatch, RootState, AppStore). These hooks ensure type safety and better developer experience when interacting with the Redux store in your React components.

While AppStore and useStore might seem underutilized in your example, they provide a strong foundation for type safety and scalability in larger applications. Their use ensures that as your application grows and you add more features, middleware, and complex interactions, you maintain robust type safety across your Redux store and related functionalities.
*/