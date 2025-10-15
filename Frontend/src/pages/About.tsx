import React from 'react'

export default function About(){
  return (
    <div className="prose max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">About Transcript Assistant</h2>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 Project Overview</h3>
        <p className="text-gray-700 leading-relaxed">
          Transcript Assistant is an AI-powered web application that revolutionizes how you interact with YouTube video content. 
          By leveraging advanced natural language processing and vector embeddings, our platform transforms passive video watching 
          into an interactive learning experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-green-700 mb-3">🚀 Key Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Smart Transcript Extraction:</strong> Automatically fetch and process YouTube video transcripts</li>
            <li>• <strong>AI-Powered Q&A:</strong> Ask questions and get intelligent answers from video content</li>
            <li>• <strong>Vector Search:</strong> Advanced semantic search using Google's Gemini embeddings</li>
            <li>• <strong>Real-time Processing:</strong> Instant responses powered by Gemini 2.5 Flash</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-purple-700 mb-3">⚡ Technology Stack</h3>
          <div className="text-gray-600">
            <p><strong>Backend:</strong> FastAPI, Python, LangChain</p>
            <p><strong>Frontend:</strong> React, TypeScript, Tailwind CSS</p>
            <p><strong>AI:</strong> Google Gemini 2.5 Flash, Gemini Embeddings</p>
            <p><strong>Database:</strong> ChromaDB Vector Store</p>
            <p><strong>APIs:</strong> YouTube Transcript API</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">📝 How It Works</h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3">
            <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
            <p><strong>Upload:</strong> Enter a YouTube video ID to fetch its transcript using the YouTube Transcript API</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
            <p><strong>Process:</strong> The transcript is split into chunks and converted to vector embeddings using Gemini</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
            <p><strong>Store:</strong> Embeddings are stored in ChromaDB for fast semantic similarity searches</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
            <p><strong>Query:</strong> Ask questions and get AI-generated answers based on relevant transcript segments</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">🎓 Perfect For</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p>• <strong>Students:</strong> Extract key information from educational videos</p>
            <p>• <strong>Researchers:</strong> Quickly find specific topics in long presentations</p>
            <p>• <strong>Content Creators:</strong> Analyze competitor videos and trending topics</p>
          </div>
          <div>
            <p>• <strong>Professionals:</strong> Get insights from webinars and training videos</p>
            <p>• <strong>Learners:</strong> Create interactive study sessions from any YouTube content</p>
            <p>• <strong>Anyone:</strong> Turn passive video consumption into active learning</p>
          </div>
        </div>
      </div>
    </div>
  )
}
