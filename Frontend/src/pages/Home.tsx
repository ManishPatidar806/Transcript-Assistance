import React, { useState } from 'react'
import ApiClient from '../services/api'

export default function Home(){
  const [videoId, setVideoId] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [questionLoading, setQuestionLoading] = useState(false)
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null)
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const [errorLogs, setErrorLogs] = useState<string[]>([])

  const addErrorLog = (error: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setErrorLogs(prev => [`[${timestamp}] ${error}`, ...prev.slice(0, 9)]) // Keep last 10 errors
  }

  const showToast = (message: string, type: 'success'|'error') => {
    setToast({message, type})
    setTimeout(() => setToast(null), 4000) // Auto dismiss after 4s
  }

  const submitUpload = async ()=>{
    if(!videoId.trim()) return showToast('Please enter a YouTube video ID', 'error')
    setUploadLoading(true)
    try {
      console.log('🎬 Starting upload for video ID:', videoId)
      const res = await ApiClient.uploadTranscript(videoId)
      console.log('📤 Upload result:', res)
      
      if(res.success) {
        showToast(`✅ ${res.message}`, 'success')
      } else {
        showToast(`❌ ${res.message}`, 'error')
      }
    } catch (error: any) {
      console.error('💥 Upload failed with error:', error)
      const errorMessage = error.message || error.toString() || 'Unknown error occurred'
      addErrorLog(`Upload Error: ${errorMessage}`)
      showToast(`💥 Upload Failed: ${errorMessage}`, 'error')
    }
    setUploadLoading(false)
  }

  const ask = async ()=>{
    if(!question.trim()) return showToast('Please enter a question', 'error')
    setQuestionLoading(true)
    try {
      console.log('🤔 Asking question:', question)
      const res = await ApiClient.askQuestion(question)
      console.log('🧠 Question result:', res)
      
      if(res.success) {
        setAnswer(res.data)
        showToast(`✅ ${res.message}`, 'success')
      } else {
        showToast(`❌ ${res.message}`, 'error')
      }
    } catch (error: any) {
      console.error('💥 Question failed with error:', error)
      const errorMessage = error.message || error.toString() || 'Unknown error occurred'
      addErrorLog(`Question Error: ${errorMessage}`)
      showToast(`💥 Question Failed: ${errorMessage}`, 'error')
    }
    setQuestionLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-md ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="whitespace-pre-wrap break-words text-sm">{toast.message}</div>
              {toast.type === 'error' && (
                <div className="mt-2 text-xs opacity-80">
                 
                </div>
              )}
            </div>
            <button 
              onClick={() => setToast(null)} 
              className="ml-2 text-white hover:text-gray-200 text-lg leading-none"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Upload Transcript</h2>
        <p className="text-sm text-gray-600 mb-4">Paste a YouTube video ID to fetch and index its transcript.</p>
        <div className="flex gap-2">
          <input 
            value={videoId} 
            onChange={e=>setVideoId(e.target.value)} 
            placeholder="Video ID (eg: dZqa_9H803w)" 
            className="flex-1 border rounded px-3 py-2 disabled:bg-gray-100 disabled:cursor-not-allowed" 
            disabled={uploadLoading}
          />
          <button 
            onClick={submitUpload} 
            disabled={uploadLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[100px]"
          >
            {uploadLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">Ask a Question</h2>
        <p className="text-sm text-gray-600 mb-4">Ask anything about the uploaded transcripts.</p>
        <textarea 
          value={question} 
          onChange={e=>setQuestion(e.target.value)} 
          rows={4} 
          className="w-full border rounded p-2 mb-3 disabled:bg-gray-100 disabled:cursor-not-allowed" 
          disabled={questionLoading}
          placeholder="Enter your question here..."
        />
        <div className="flex gap-2">
          <button 
            onClick={ask} 
            disabled={questionLoading}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-green-400 disabled:cursor-not-allowed min-w-[100px]"
          >
            {questionLoading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
        {answer && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Answer</h3>
            <div className="whitespace-pre-line">{answer}</div>
          </div>
        )}
      </section>

   
    </div>
  )
}
