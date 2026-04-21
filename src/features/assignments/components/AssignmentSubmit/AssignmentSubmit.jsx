import { useState } from "react";
import FormWrapper from "../../../../components/UI/FormWrapper/FormWrapper.jsx";
import UploadArea from "../../../../components/UI/UploadArea/UploadArea.jsx";
import { Form } from "react-router";
import api from "../../../../api.js"
import { useMutation } from "@tanstack/react-query";


export default function AssignmentSubmit( {isOverdue, pageId, setSubmittion} ) {

    const [submissionText, setSubmissionText] = useState("");
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    const userId = 1


    const mutation = useMutation({
        mutationFn: async ({pageId, userId, file}) => {
            let fileId = null;

            if (file) {
                const formData = new FormData();
                formData.append('uploaded_file', file);
                const fileResponse = await api.post('/files', formData);
                fileId = fileResponse.data.id;
                console.log(fileResponse.data)
            }


            const submissionPayload = { user_id: userId, comment: submissionText}; // может быть и другие поля
            const submissionResponse = await api.post(`/pages/${pageId}/submittions/`, submissionPayload);
            const submissionId = submissionResponse.data.id;


            if (fileId) {
                await api.put(`/pages/submittions/${submissionId}/files/${fileId}`);
            }

            setSubmittion(submissionResponse.data)
            return submissionResponse.data;
        },
        onSuccess: (data) => {
            setFile(null)
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const handleSubmit = () => {
        mutation.mutate({pageId, file, userId});
    };

    return (
        <>

            <FormWrapper label="Upload File">
                <UploadArea setFile={setFile} />
            </FormWrapper>
            
            <FormWrapper label="Submission Comments (Optional)">
                <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Add any comments about your submission..."
                    className="form-textarea"
                />
            </FormWrapper>

            <div className="button-wrapper">
                <button onClick={handleSubmit} className="btn btn-primary">
                Submit Assignment
                </button>
                <button className="btn btn-secondary">
                Save Draft
                </button>
            </div>

            {isOverdue && (
                <div className="alert alert-error overdue-warning">
                <strong>Note:</strong> This assignment is overdue. Late submissions may receive a grade penalty.
                </div>
            )}
        </>
    )
}