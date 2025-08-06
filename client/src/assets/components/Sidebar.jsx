import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const isUserOnline = (userId) => {
    if (typeof onlineUsers?.[0] === "string") {
      return onlineUsers.includes(userId);
    }
    if (typeof onlineUsers?.[0] === "object") {
      return onlineUsers.some((u) => u._id === userId);
    }
    return false;
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 bg-white/70 backdrop-blur-md border-r border-zinc-200 flex flex-col transition-all duration-200 shadow-md">
      {/* Header */}
      <div className="relative w-full px-10 py-6">
        <div className="flex items-center gap-3 translate-x-3">
          <Users className="size-5 text-zinc-700 drop-shadow-md" />
          <span
            className="hidden lg:block text-[16px] font-semibold text-zinc-800 tracking-tight"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Contacts
          </span>
        </div>

        {/* 🔘 Online Filter Toggle */}
        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 px-3 lg:px-0">
          <input
            type="checkbox"
            id="onlineToggle"
            className="accent-green-500"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          <label htmlFor="onlineToggle" className="cursor-pointer">
            Show Online Only
          </label>
        </div>

        {/* Underline */}
        <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 opacity-80 rounded-full animate-pulse" />
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-3 space-y-2 px-3">
        {filteredUsers.map((user) => {
          const online = isUserOnline(user._id);
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200 group ${
                selectedUser?._id === user._id
                  ? "bg-zinc-100 shadow-inner"
                  : "hover:bg-zinc-50"
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={
                    user.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt={user.name}
                  className="size-12 object-cover rounded-full shadow-sm border border-zinc-200"
                />
                {online && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate text-zinc-800 text-sm">
                  {user.fullName}
                </div>
                <div className="text-xs text-zinc-500">
                  {online ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
