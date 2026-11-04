'use client';

import './page.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setResult('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(`Upload successful: ${data.url}`);
    } catch (error) {
      setResult(error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="upload-page">
      <div className="upload-box">
        <p className="section-kicker">Admin media upload</p>
        <h1>Upload a photo or video</h1>
        <p className="upload-text">
          This media area is restricted to authenticated administrators and is not public on the website.
        </p>

        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
          />

          <button type="submit" className="btn btn-primary" disabled={!selectedFile || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
          </button>
        </form>

        {result && <p className="upload-result">{result}</p>}

        <div className="admin-back-link">
          <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/login')}>
            Back to admin login
          </button>
        </div>
      </div>
    </main>
  );
}
