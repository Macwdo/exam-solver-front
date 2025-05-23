import { usePopup } from "@/hooks/usePopup"
import { TableHeader, Table, TableRow, TableHead } from "../../ui/table"
import { TableBody } from "../../ui/table"
import { TableCell } from "../../ui/table"

export type Alternative = {
    letter: string,
    text: string
}

export type ExamAnswer = {
    number: number,
    question: string,
    alternatives: Alternative[],
    answer: Alternative
}



const Questions = () => {
    return (
        <Table className="border-1 border-zinc-200 bg-white" >
            <TableHeader>
                <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Alternative</TableHead>
                </TableRow>
            </TableHeader>
            <QuestionsTable />
        </Table>
    )
}

const QuestionsTable = () => {
    const { examAnswers } = usePopup()

    return (
        <TableBody>
            {examAnswers.map((item, i) => (
                <TableRow key={i}>
                    <TableCell >{item.number}</TableCell>
                    <TableCell>{item.answer.letter}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default Questions