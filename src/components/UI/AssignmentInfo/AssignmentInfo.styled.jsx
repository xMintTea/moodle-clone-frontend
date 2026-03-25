import styled from "styled-components"


export const AssignmentInfoBlock = styled.div.attrs({ className: "card" })`
    padding: 24px;
    margin-bottom: 24px;
`


export const AssignmentInfoFooterBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
`



export const UpTextField = styled.p`
    font-size: 14px;
    color: #666;
`

export const MidTextField = styled.p`
    font-weight: 500;
`

export const DeadlineTextField = styled.p`
    font-size: 14px;
    color: #ff9800;
`


export const AssignmentGradeBlock = styled.div`
    display: flex;align-items: center;
    gap: 12px;

    span {
        fontSize: 20px;
    }
`

export const GradeTextField = styled.p`
    font-size: 14px;
    color: #666;
`


export const AssignmentInfoFooterDateBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    span {
        font-size: 20px;
    }
`




export const AssignmentInfoHeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
`

export const AssignmentNameInfoBlock = styled.div`
    flex: 1;

    h1 {
        font-size: 28px;
        margin-bottom: 8px;
    }

    p {
        color: #666
    }
`
