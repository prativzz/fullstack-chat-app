import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';
import { Trash2 } from 'lucide-react';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    deleteMessage,
    subscribeToMessages,
    unsubscribeToMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
subscribeToMessages();

return()=>unsubscribeToMessages
  }, [selectedUser, getMessages ,subscribeToMessages,unsubscribeToMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === authUser?._id;
          const time = new Date(msg.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={msg._id}
              className={`group flex ${isMe ? 'justify-end' : 'justify-start'} items-center`}
            >
              {/* Sent message: timestamp + delete */}
              {isMe && (
                <div className="flex items-center gap-1 mr-2 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[11px] text-gray-500">{time}</span>
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-[15px] relative ${
                  isMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="sent"
                    className="mt-2 rounded-xl max-w-[220px]"
                  />
                )}
              </div>

              {/* Received message timestamp (hovered) */}
              {!isMe && (
                <div className="ml-2 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[11px] text-gray-500">{time}</span>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
