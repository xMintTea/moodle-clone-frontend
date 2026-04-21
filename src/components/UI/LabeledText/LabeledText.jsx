import "./LabeledText.css"


function LabeledText({label, value, children}) {
    return (
        <>
        <p className="labeled-text-label">{label}</p>
        <p className="labeled-text-value">
            {children !== undefined ? children : value}
        </p>
        </>
    )

}

export default LabeledText