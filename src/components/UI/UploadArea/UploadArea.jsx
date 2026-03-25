import { useState } from "react";


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
            <span style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}>📤</span>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
            />
            <label htmlFor="file-upload" style={{ color: '#1976d2', cursor: 'pointer' }}>
            Click to upload
            </label>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
            or drag and drop
            </p>
            {fileName && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '12px' }}>
                Selected: {fileName}
                </p>
            )}
        </div>
    )
}