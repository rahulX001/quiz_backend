import React, { useState } from 'react';
import CreateQuiz from './CreateQuiz';
import TakeQuiz from './TakeQuiz';

export default function App() {
  const [currentQuiz, setCurrentQuiz] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
       Quiz
      </h1>

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        {!currentQuiz ? (
          <CreateQuiz onCreated={(q) => setCurrentQuiz(q)} />
        ) : (
          <TakeQuiz quiz={currentQuiz} />
        )}
      </div>
    </div>
  );
}
