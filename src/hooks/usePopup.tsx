import type { ExamAnswer } from "@/components/app/questions/questions"
import { createContext, useContext, useState } from "react"

type PopupContextProps = {
    examAnswers: ExamAnswer[],
    setExamAnswers: (examAnswers: ExamAnswer[]) => void
}

const PopupContext = createContext<PopupContextProps>({ examAnswers: [], setExamAnswers: () => { } })

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
    const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>([])

    return (
        <PopupContext.Provider value={{ examAnswers, setExamAnswers }}>
            {children}
        </PopupContext.Provider>
    )
}

const usePopup = (): PopupContextProps => {
    return useContext(PopupContext)
}

export { PopupProvider, usePopup }  