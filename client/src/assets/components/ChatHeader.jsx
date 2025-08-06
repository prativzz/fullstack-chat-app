import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="relative w-full px-8 py-5 bg-white/70 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      <div className="flex items-center justify-between translate-x-2">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt={selectedUser.fullName}
              className="size-12 rounded-full object-cover shadow-sm border border-zinc-200"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>

          {/* User Info */}
          <div className="leading-tight">
            <h3
              className="text-[16px] font-semibold text-zinc-800 tracking-tight"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              }}
            >
              {selectedUser.fullName}
            </h3>
            <p className="text-sm text-zinc-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <X className="size-6" />
        </button>
      </div>

      {/* iOS-style underline bar */}
     
    </div>
  );
};

export default ChatHeader;
