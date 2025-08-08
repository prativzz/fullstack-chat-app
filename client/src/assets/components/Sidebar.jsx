import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/SidebarSkeleton";
import { Users, Menu, X } from "lucide-react";
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
    <aside className="h-full w-20 md:w-64 lg:w-72 bg-white/70 backdrop-blur-md border-r border-zinc-200 flex flex-col transition-all duration-200 shadow-md">
      {/* Header */}
      <div className="relative w-full px-4 py-4 md:px-6 md:py-6">
        <div className="flex items-center gap-2 md:gap-3">
          <Users className="size-4 md:size-5 text-zinc-700 drop-shadow-md" />
          <span
            className="hidden lg:block text-sm md:text-base font-semibold text-zinc-800 tracking-tight"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            Contacts
          </span>
        </div>

        {/* Online Filter Toggle */}
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm text-zinc-600 px-2 md:px-0">
          <input
            type="checkbox"
            id="onlineToggle"
            className="accent-green-500 w-3 h-3 md:w-4 md:h-4"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          <label htmlFor="onlineToggle" className="cursor-pointer">
            <span className="hidden md:inline">Show Online Only</span>
            <span className="md:hidden">Online</span>
          </label>
        </div>

        {/* Underline */}
        <div className="absolute bottom-0 left-4 right-4 md:left-6 md:right-6 h-[1px] bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 opacity-80 rounded-full" />
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-2 md:py-3 space-y-1 md:space-y-2 px-2 md:px-3">
        {filteredUsers.map((user) => {
          const online = isUserOnline(user._id);
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-2 md:p-3 flex items-center gap-2 md:gap-3 rounded-lg md:rounded-xl transition-all duration-200 group ${
                selectedUser?._id === user._id
                  ? "bg-zinc-100 shadow-inner"
                  : "hover:bg-zinc-50"
              }`}
            >
              <div className="relative mx-auto md:mx-0">
                <img
                  src={
                    user.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt={user.name}
                  className="size-10 md:size-12 object-cover rounded-full shadow-sm border border-zinc-200"
                />
                {online && (
                  <span className="absolute bottom-0 right-0 size-2 md:size-3 bg-green-500 rounded-full ring-2 ring-white" />
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
