import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ChatbotCard() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">🤖</span>
          <h2 className="text-xl font-bold">Chatbot</h2>
        </div>
        <p className="text-gray-600 mb-4">Talk to your AI assistant for support, questions, or a friendly chat.</p>
      </div>
      <button
        onClick={() => router.push('/chat')}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Start Chat
      </button>
    </div>
  );
}