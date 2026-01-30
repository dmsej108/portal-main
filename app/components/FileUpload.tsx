'use client';

interface FileUploadProps {
    fileList: File[] | undefined;
    setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileUpload({ fileList, setFileList }: FileUploadProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const files = e.target.files;
        if (files) {
            console.log(Array.from(files));
            setFileList(Array.from(files) as File[]);
        }
    }
    const handleFileDelete = (file: File) => {
        setFileList((fileList || []).filter((f: File) => f.name !== file.name));
    }
    const handleDeleteAll = () => {
        setFileList([]);
    }
    return (
        <>
        <div className="reg-group">
            <div className="reg-item">
                <div className="btn-file">
                    <input type="file" id="upload-file" hidden onChange={handleFileChange} />
                    <label className="btn-up" htmlFor="upload-file">파일첨부</label>
                </div>
            </div>
        </div>
        <div className="upload-file-box">
            <div className="upload-file-head flex space-between">
                <button type="button" className="btn del-all btn-secondary" onClick={handleDeleteAll}><span className="offscreen">전체파일삭제</span></button>
                <span className="name">파일명</span><span className="volume">용량</span>
            </div>
            <div className="upload-file-list">  
                {fileList && fileList.length > 0 && fileList.map((file: File) => (
                    <div className="upload-file-list-item flex space-between" key={file.name}>
                        <button type="button" className="btn del btn-secondary" onClick={() => handleFileDelete(file)}><span className="offscreen">파일삭제</span></button>
                        <span className="name">{file.name}</span><span className="volume">{formatFileSize(file.size)}</span>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}