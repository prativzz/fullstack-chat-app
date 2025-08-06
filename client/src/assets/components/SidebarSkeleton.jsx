import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 bg-white/70 backdrop-blur-md border-r border-zinc-200 flex flex-col transition-all duration-200 shadow-md">
      {/* Header */}
      <div className="border-b border-zinc-200 w-full px-4 py-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-zinc-700" />
          <span
            className="font-semibold text-zinc-800 text-sm hidden lg:block"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton List */}
      <div className="overflow-y-auto w-full py-4 px-2 space-y-4">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 animate-pulse px-2"
          >
            {/* Avatar */}
            <div className="rounded-full bg-zinc-200 w-12 h-12 shadow-sm" />

            {/* Text Skeleton (for lg screens) */}
            <div className="hidden lg:flex flex-col gap-2">
              <div className="h-4 w-28 bg-zinc-200 rounded" />
              <div className="h-3 w-16 bg-zinc-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
