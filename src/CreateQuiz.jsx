import React, { useState } from 'react';
import axios from 'axios';

export default function CreateQuiz({ onCreated }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/quizzes/generate', {
        topic,
        count: 10,
      });
      onCreated(res.data);
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">✨ Create / Generate Quiz</h2>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. Operating Systems: scheduling, memory..."
        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        onClick={handleGenerate}
        disabled={!topic || loading}
        className={`w-full py-3 rounded-xl text-white font-medium shadow-md transition duration-200 ${
          loading || !topic
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? '⏳ Generating...' : '⚡ Generate with Gemini'}
      </button>
    </div>
  );
}
