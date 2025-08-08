import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "../components/SidebarSkeleton";
import { Users, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <>
      <aside
        className={`h-full bg-white/70 backdrop-blur-md border-r border-zinc-200 flex flex-col transition-all duration-300 ease-in-out shadow-lg
          ${isCollapsed ? "w-16" : "w-72"} md:w-72`}
      >
        {/* Header with Toggle */}
        <div className="relative w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
              <Users className="size-5 text-zinc-700 drop-shadow-md" />
              {!isCollapsed && (
                <span
                  className="text-base font-semibold text-zinc-800 tracking-tight"
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Contacts
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="md:hidden p-1 rounded-lg hover:bg-zinc-100 transition"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Online Filter Toggle */}
          {!isCollapsed && (
            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
              <input
                type="checkbox"
                id="onlineToggle"
                className="accent-green-500 w-4 h-4"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
              />
              <label htmlFor="onlineToggle" className="cursor-pointer text-sm">
                Online Only
              </label>
            </div>
          )}
        </div>

        {/* Contact List */}
        <div className="overflow-y-auto w-full py-3 space-y-2 px-2">
          {filteredUsers.map((user) => {
            const online = isUserOnline(user._id);
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-2 flex items-center gap-3 rounded-lg transition-all duration-200 group ${
                  selectedUser?._id === user._id
                    ? "bg-blue-100 shadow-inner"
                    : "hover:bg-zinc-50"
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      user.profilePic ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={user.name}
                    className="size-10 object-cover rounded-full shadow-sm border border-zinc-200"
                  />
                  {online && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>

                {!isCollapsed && (
                  <div className="text-left min-w-0">
                    <div className="font-medium truncate text-zinc-800 text-sm">
                      {user.fullName}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {online ? "Online" : "Offline"}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
