import cn from 'clsx';

interface AlertProps {
    children: React.ReactNode;
    variant?: "success" | "error";
    [key: string]: unknown;
}

const variantsClasses = {
    success: "bg-[#e8f5e9] border border-[#4caf50] text-[#2e7d32]",
    error: "bg-[#ffebee] border border-[#f44336] text-[#c62828]"
}

function Alert({children, variant = "success"}: AlertProps) {
    return (
        <div className={cn("p-4 rounded-md mb-5", variantsClasses[variant])}>
            {children}
        </div>
    )
}


export default Alert