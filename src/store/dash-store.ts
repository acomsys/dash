// This file is inspired from this source https://bit.ly/3SP6VvC

import { useLayoutEffect } from 'react'
import create, { StoreApi, UseBoundStore } from 'zustand'
import createContext from 'zustand/context'
import { Dash } from '../models/Dash';
import { TreeNode } from '../models/TreeNode';
import { trpc } from '../utils/trpc';

let store: UseBoundStore<StoreApi<DashStore>>;

export const getDashInitialState = (): Dash => ({
    spaces: [],
})

export const getDefaultInitialState = () => ({
    lastUpdate: Date.now(),
    dash: getDashInitialState(),
    light: false,
    count: 0,
    messages: [],
})

const zustandContext = createContext<StoreApi<DashStore>>();

export const Provider = zustandContext.Provider
export const useDashStore = zustandContext.useStore

export type DashInitialState = {
    lastUpdate: number;
    count: number;
    light: boolean;
    dash: Dash;
    messages: string[];
}

export type DashStore = DashInitialState & {
    tick: (lastUpdate: number, light: boolean) => void;
    dashUpdate: (dash: Dash) => void;
    addMessage: (message: string) => void;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const initializeStore = (preloadedState = {}) => {
    return create<DashStore>((set, get) => ({
        ...getDefaultInitialState(),
        ...preloadedState,
        addMessage: (message: string) => {
            set((state) => ({
                ...state,
                messages: [...state.messages, message],
            }));
        },
        dashUpdate: (dash: Dash) => {
            set({
                dash: dash,
            })
        },
        tick: (lastUpdate: number, light: boolean) => {
            set({
                lastUpdate,
                light: !!light,
            })
        },
        increment: () => {
            set({
                count: get().count + 1,
            })
        },
        decrement: () => {
            set({
                count: get().count - 1,
            })
        },
        reset: () => {
            set({
                count: getDefaultInitialState().count,
            })
        },
    }))
}

export function useCreateStore(serverInitialState: DashInitialState) {
    // Server side code: For SSR & SSG, always use a new store.
    if (typeof window === 'undefined') {
        return () => initializeStore(serverInitialState)
    }
    // End of server side code

    // Client side code:
    // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
    const isReusingStore = Boolean(store)
    store = store ?? initializeStore(serverInitialState)
    // When next.js re-renders _app while re-using an older store, then replace current state with
    // the new state (in the next render cycle).
    // (Why next render cycle? Because react cannot re-render while a render is already in progress.
    // i.e. we cannot do a setState() as that will initiate a re-render)
    //
    // eslint complaining "React Hooks must be called in the exact same order in every component render"
    // is ignorable as this code runs in same order in a given environment (i.e. client or server)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
        // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
        // states on CSR page navigation or not. I have chosen not to, but if you choose to,
        // then add `serverInitialState = getDefaultInitialState()` here.
        if (serverInitialState && isReusingStore) {
            store.setState(
                {
                    // re-use functions from existing store
                    ...store.getState(),
                    // but reset all other properties.
                    ...serverInitialState,
                },
                true // replace states, rather than shallow merging
            )
        }
    })

    return () => store
}
