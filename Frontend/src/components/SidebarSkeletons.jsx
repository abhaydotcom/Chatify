import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-gray-800 w-full p-4 lg:p-5">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="p-2 bg-gray-800 rounded-lg animate-pulse">
            <Users className="size-5 lg:size-6 text-gray-600" />
          </div>
          <div className="hidden lg:block flex-1">
            <div className="h-5 w-24 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Online Filter Skeleton */}
        <div className="mt-4 hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-28 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="h-3 w-16 bg-gray-800 rounded animate-pulse ml-auto" />
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 lg:p-3.5 flex items-center gap-3 border-l-4 border-l-transparent">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0 flex-shrink-0">
              <div className="size-11 lg:size-12 rounded-full bg-gray-800 animate-pulse ring-2 ring-gray-700" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="h-4 w-32 bg-gray-800 rounded mb-2 animate-pulse" />
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 animate-pulse" />
                <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;