"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <div className="flex items-center justify-between">
        <div>
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">
            {error.message || "Failed to load users."}
          </span>
        </div>
        <button onClick={reset} className="btn-primary text-sm px-3 py-1">
          Try again
        </button>
      </div>
    </div>
  );
}
