import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1/transcript'

const client = axios.create({ baseURL: API_BASE })

type QuestionResponse = { message:string; status:number; success:boolean; data:string }
type TranscriptUploadResponse = { message:string; status:number; success:boolean }

const ApiClient = {
  askQuestion: async (question: string): Promise<QuestionResponse> => {
    try {
      console.log('🚀 Sending question request:', { question, url: `${API_BASE}/ask-question` })
      const res = await client.post('/ask-question', { question })
      console.log('✅ Question response:', res.data)
      return res.data as QuestionResponse
    } catch (error: any) {
      console.error('❌ Question request failed:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      })
      
      if (error.response?.data) {
        return error.response.data as QuestionResponse
      }
      
      // Create detailed error message
      const errorMsg = error.response?.data?.message || 
                      error.response?.statusText || 
                      error.message || 
                      'Network error occurred'
      throw new Error(`API Error (${error.response?.status || 'Unknown'}): ${errorMsg}`)
    }
  },

  uploadTranscript: async (videoId: string): Promise<TranscriptUploadResponse> => {
    try {
      console.log('🚀 Sending upload request:', { videoId, url: `${API_BASE}/upload` })
      const res = await client.post('/upload', { videoId })
      console.log('✅ Upload response:', res.data)
      return res.data as TranscriptUploadResponse
    } catch (error: any) {
      console.error('❌ Upload request failed:', error)
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      })
      
      if (error.response?.data) {
        return error.response.data as TranscriptUploadResponse
      }
      
      // Create detailed error message
      const errorMsg = error.response?.data?.message || 
                      error.response?.statusText || 
                      error.message || 
                      'Network error occurred'
      throw new Error(`API Error (${error.response?.status || 'Unknown'}): ${errorMsg}`)
    }
  }
}

export default ApiClient
