import Questions from "./components/app/questions/questions"
import service from "@/services/index"
import { useEffect, useState } from "react"
import { PopupProvider, usePopup } from "./hooks/usePopup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { AlertCircle, CheckCircle, Circle, Loader2 } from "lucide-react"
import type { Exam, Status } from "@/services/types"




const Popup = () => {
    return (
        <div className={`w-[400px] h-[200px]`}>
            <PopupProvider>
                <div className={`w-full h-full flex flex-col p-4 border-2 bg-zinc-100 `}>
                    <PopupHeader />
                    <Questions />
                </div>
            </PopupProvider>
        </div>
    )
}

const PopupHeader = () => {
    return (
        <div className="py-2 flex flex-row gap-2">
            <div className="flex flex-row gap-2 items-center justify-center">
                <KeySelector />
            </div>
        </div>
    )
}

const KeySelector = () => {
    const { setExamAnswers } = usePopup()
    const [exams, setExams] = useState<Exam[]>([])

    useEffect(() => {
        const fetchKeys = async () => {
            setExams(await service.getExams())
        }
        fetchKeys()
    }, [])

    const onKeyChange = async (examId: string) => {
        if (examId === "no-items") {
            setExamAnswers([])
            return
        }

        const exam = await service.getExam(examId);
        const shouldSendDocument = exam.status === "not_started" || exam.status === "failed"
        if (shouldSendDocument) {
            const document = await service.getDocument()
            await service.sendDocument(document, examId)
            setExamAnswers([])
        }

        if (exam.status === "processing") setExamAnswers([]);
        if (exam.status === "completed" && exam.answer) {
            setExamAnswers(exam.answer)
        };

    }

    const getStatusIcon = (status: Status) => {
        switch (status) {
            case "not_started":
                return <Circle className="w-6 h-6 text-gray-500" />

            case "processing":
                return <Loader2 className="w-6 h-6 animate-spin" />

            case "completed":
                return <CheckCircle className="w-6 h-6 text-green-500" />

            case "failed":
                return <AlertCircle className="w-6 h-6 text-red-500" />
        }
    }

    return (
        <Select onValueChange={(e) => onKeyChange(e)}>
            <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select a key" />
            </SelectTrigger>
            <SelectContent>
                {exams.length === 0 && <SelectItem value="no-items">No items found</SelectItem>}
                {exams.map((exam, index) => <SelectItem key={index} value={exam.id}>{getStatusIcon(exam.status)} {exam.name}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}



export default Popup