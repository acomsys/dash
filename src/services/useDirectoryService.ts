import { getDashInitialState, useDashStore } from "../store/dash-store";
import { trpc } from "../utils/trpc";

export const useDirectoryService = () => {
    const { dashUpdate, addMessage } = useDashStore((store) => ({
        dashUpdate: store.dashUpdate,
        addMessage: store.addMessage,
    }));

    const get = trpc.useQuery(["dash.get"], {
        onSuccess: (data) => {
            dashUpdate(data ?? getDashInitialState());
        }
    });
    
    const push = trpc.useMutation(["dash.push.directory"], {
        onSuccess: (data) => {
            dashUpdate(data ?? getDashInitialState());
        },
        onError: (data) => {
            addMessage(data.message);
        }
    });

    return { get, push }
}