import styled from "styled-components"




export default function AssignmentDescription( {description} ) {
    return (
        <AssignmentDescriptionBlock>
            <h2>Assignment Description</h2>
            <p>{description}</p>
        </AssignmentDescriptionBlock>
    )
}



const AssignmentDescriptionBlock = styled.div.attrs({className: "card"})`
    padding: 24px;
    margin-bottom: 24px;

    h2 {
        font-size: 20px;
        margin-bottom: 16px;
    }

    p {
        color: #666;
        white-space: pre-line;
        line-height: 1.6;
    }
`