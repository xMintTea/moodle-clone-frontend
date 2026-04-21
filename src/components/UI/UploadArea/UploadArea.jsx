import { useState } from "react";
import "./UploadArea.css"

export default function UploadArea( {setFile} ) {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selected_file = e.target.files[0];
            setFileName(selected_file.name);
            setFile(selected_file)
        }
    };

    return (
        <div className="upload-area">
            <span className="upload-icon">📤</span>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-label">
            Click to upload
            </label>
            <p className="upload-hint ">or drag and drop</p>
            {fileName && (
                <p className="upload-filename">
                Selected: {fileName}
                </p>
            )}
        </div>
    )
}