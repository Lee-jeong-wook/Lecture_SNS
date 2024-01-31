import { create } from "zustand";

interface State {
    isShowing: boolean;
    text: string;
}

interface SettingFileStore extends State {
    toggleShowing: () => void;
    changeText: (txt: string) => void;
}

const init: State = {
    isShowing: false,
    text: ""
}

const useToastStore = create<SettingFileStore>((set) => ({
    ...init,
    toggleShowing: () => {
        set((state) => ({
            isShowing: !state.isShowing
        }))
    },
    changeText: (txt) => {
        set({ text: txt })
    }
}));
export default useToastStore;
