import { useMemo } from "react"


export const useAssignmentDates = (dueDate) => {
    return useMemo(() => {
        const now = new Date();
        const due = new Date(dueDate);

        if (isNaN(due.getTime())) {
            console.warn("Invalid dueDate provided to useAssignmentDates");
            return {
                isOverdue: false,
                daysUntilDue: 0
            };
        }

        const isOverdue = due < now;
        const diffTime = due.getTime() - now.getTime()
        const daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            isOverdue,
            daysUntilDue
        };
    }, [dueDate])
}