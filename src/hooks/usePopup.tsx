import { createContext, useContext, useState } from "react"
import type { Question } from "../components/app/questions/questions"

type PopupContextProps = {
    questions: Question[],
    setQuestions: (questions: Question[]) => void
}

const PopupContext = createContext<PopupContextProps>({ questions: [], setQuestions: () => { } })

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
    const [questions, setQuestions] = useState<Question[]>([])

    return (
        <PopupContext.Provider value={{ questions, setQuestions }}>
            {children}
        </PopupContext.Provider>
    )
}

const usePopup = (): PopupContextProps => {
    return useContext(PopupContext)
}

export { PopupProvider, usePopup }  