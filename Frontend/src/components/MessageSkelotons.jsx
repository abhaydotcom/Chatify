const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-950">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`flex gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0">
              <div className="size-7 sm:size-8 rounded-full bg-gray-800 animate-pulse ring-2 ring-gray-800" />
            </div>

            {/* Message Content Skeleton */}
            <div className="flex flex-col">
              {/* Timestamp Skeleton */}
              <div className={`mb-1 ${idx % 2 === 0 ? "text-left" : "text-right"}`}>
                <div className="h-3 w-12 bg-gray-800 rounded animate-pulse" />
              </div>

              {/* Message Bubble Skeleton */}
              <div
                className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-800"
                } animate-pulse`}
              >
                <div className="h-4 w-32 sm:w-40 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;