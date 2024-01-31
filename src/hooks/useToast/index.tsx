import { useEffect } from "react";
import useToastStore from "../../store/toast";

export const useToast = () => {
    const {changeText, isShowing, toggleShowing} = useToastStore();

    const showToast = (txt: string) => {
        toggleShowing();
        changeText(txt);
    }

    useEffect(() => {
        if(isShowing){
            const timerId = setTimeout(() => {
                toggleShowing()
                changeText("")

                console.log("3초가 지나 토스트 사라짐")
            }, 3000)

            return () => clearTimeout(timerId)
        }
    }, [isShowing])
}