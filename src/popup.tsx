import Questions from "./components/app/questions/questions"
import { getDocument, getKeys, getQuestions, sendDocument } from "./services"
import { useEffect, useState } from "react"
import { PopupProvider, usePopup } from "./hooks/usePopup"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import type { Key, Status } from "./services"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"



const KeySelector = () => {
    const { setQuestions } = usePopup()
    const [keys, setKeys] = useState<Key[]>([])

    useEffect(() => {
        const fetchKeys = async () => {
            const keys = await getKeys()
            setKeys(keys)
        }
        fetchKeys()
    }, [])

    const onKeyChange = async (key: string) => {

        const document = await getDocument()

        await sendDocument(document, key)
        const { questions } = await getQuestions(key);
        setQuestions(questions)

    }
    const getStatusIcon = (status: Status) => {
        switch (status) {
            case "not_started":
                return <Loader2 className="w-6 h-6 animate-spin" />

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
                {keys.length === 0 && <SelectItem value="no-keys">No keys found</SelectItem>}
                {keys.map((key, index) => (
                    <SelectItem key={index} value={key.key}>{key.name} {getStatusIcon(key.status)}</SelectItem>
                ))}
            </SelectContent>
        </Select>
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

export default Popup