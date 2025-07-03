import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string>('')
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const invokeModel = async (file: File | null) => {
    setIsLoading(true)
    if (!file) {
      setResult('Please select an image file.')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.result === 1) {
        setResult('🧠 The image is AI generated')
      } else {
        setResult('📷 The image is real')
      }
    } catch (error) {
      setResult('Error connecting to backend')
    }
    finally{
      setIsLoading(false)
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
      setResult('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
      setResult('')
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="container">
      <h1 className="title">Real Vs Fake Image Checker</h1>
      <h2 className="subtitle">Upload your Image here</h2>
      <div
        className={`dropzone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="preview" />
        ) : (
          <div>
            <p>Drag & Drop your image here</p>
            <button type="button" className="upload-btn" onClick={handleButtonClick}>
              Or Click to Select
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
      <button
        className="check-btn"
        onClick={() => invokeModel(file)}
        disabled={!file}
      >
        Check
      </button>
      {isLoading ? (
  <div className="result">
    <span className="loader"></span>
    <span style={{ marginLeft: 10 }}>Analyzing image...</span>
  </div>
) : (
  result && <p className="result">{result}</p>
)}
    </div>
  )
}

export default App