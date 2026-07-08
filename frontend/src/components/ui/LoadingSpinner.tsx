export default function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">

      <div className="text-center">

        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

        <p className="mt-4 text-gray-500">
          Loading...
        </p>

      </div>

    </div>
  );
}