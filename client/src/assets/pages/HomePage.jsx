import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center pt-20 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[calc(100vh-6rem)] border border-gray-200">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
