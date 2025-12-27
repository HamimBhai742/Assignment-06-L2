const BlogPostSkeleton = ({ index = 0 }) => {
  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image / Icon Skeleton */}
      <div className="h-48 rounded-t-2xl bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-400 dark:bg-gray-600" />
      </div>

      <div className="p-6">
        {/* Category + Read Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-5 w-full rounded bg-gray-300 dark:bg-gray-600" />
          <div className="h-5 w-4/5 rounded bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div>
              <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600 mb-1" />
              <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          <div className="h-6 w-6 rounded bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </article>
  );
};

export default BlogPostSkeleton;
