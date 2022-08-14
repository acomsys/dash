import { useEffect } from 'react';
import shallow from 'zustand/shallow'
import { trpc } from '../utils/trpc';
import { getDashInitialState, useDashStore } from './dash-store'

export const useDashStoreShallow = () => {
    const {
        count,
        increment,
        decrement,
        reset,
        dashUpdate,
        dash,
        addMessage
    } = useDashStore(
        (store) => ({
            count: store.count,
            dash: store.dash,
            increment: store.increment,
            decrement: store.decrement,
            reset: store.reset,
            dashUpdate: store.dashUpdate,
            addMessage: store.addMessage,
        }),
        shallow
    )
    const getDash = trpc.useQuery(["dash.get"]);
    const pushSpace = trpc.useMutation(["dash.push.space"], {
        onSuccess: (data) => {
            dashUpdate(data ?? getDashInitialState());
        },
        onError: (data) => {
            addMessage(data.message);
        }
    });

    useEffect(() => {
        dashUpdate(getDash.data ?? getDashInitialState());
    }, [getDash.data, dashUpdate]);

    return { count, dash, increment, decrement, reset, dashUpdate, pushSpace, addMessage }
}
