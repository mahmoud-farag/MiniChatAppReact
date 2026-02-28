import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../../libs/apiConfig';


interface IRealTimeStore {
    onLineUsers: string[];
    socket: Socket | null;
    connect: (isAuthenticated: boolean) => void;
    disconnect: () => void;
    addOnlineUser: (user: string) => void;
    removeOnlineUser: (user: string) => void;
};

const useRealTimeStore = create<IRealTimeStore>((set, get) => ({
    onLineUsers: [],
    socket: null,
    connect: (isAuthenticated: boolean) => {

        if (!isAuthenticated) {
            console.log('User is not authenticated');
            return;
        }

        if (get().socket)
            return;

        const socketClient: Socket = io(BASE_URL);

        socketClient.connect();

        socketClient.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        set({ socket: socketClient });
    },
    disconnect: () => {

        if (!get()?.socket)
            return;

        get().socket?.disconnect();

        set({ socket: null });
    },
    addOnlineUser: (user: string) => set((state: IRealTimeStore) => ({ onLineUsers: [...state.onLineUsers, user] })),
    removeOnlineUser: (user: string) => set((state: IRealTimeStore) => ({ onLineUsers: state.onLineUsers.filter((u: string) => u !== user) })),
}));


export default useRealTimeStore;
