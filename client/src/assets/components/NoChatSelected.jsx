import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="max-w-sm w-full px-6 py-10 rounded-2xl shadow-xl bg-white border border-gray-200 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce shadow-inner">
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-800">Welcome to Chatly</h2>
        <p className="text-sm text-gray-500 mt-2">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
