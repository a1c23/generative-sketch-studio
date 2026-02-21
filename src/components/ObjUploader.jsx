export default function ObjUploader({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className="obj-uploader">
      <label className="btn-ghost btn-ghost-full obj-upload-label">
        Upload .OBJ
        <input
          type="file"
          accept=".obj"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}
