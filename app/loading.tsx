export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      </div>
      <p className="mt-6 text-gray-600 font-medium">Loading financial data...</p>
    </div>
  );
}
