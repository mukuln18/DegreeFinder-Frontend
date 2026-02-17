export default function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 space-y-3 animate-pulse">
      <div className="h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
