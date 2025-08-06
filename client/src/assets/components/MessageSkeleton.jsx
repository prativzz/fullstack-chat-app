const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 px-4 py-6 space-y-6 bg-white/80">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-3 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {/* Avatar */}
          {idx % 2 === 0 && (
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse shrink-0" />
          )}

          {/* Message Bubble Skeleton */}
          <div className="flex flex-col space-y-1">
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            <div className="rounded-2xl px-4 py-4 bg-gray-200 animate-pulse w-[200px]" />
          </div>

          {/* Avatar for sender (if it's a sent message) */}
          {idx % 2 !== 0 && (
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
