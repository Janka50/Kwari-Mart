export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-xl font-bold text-blue-600">
          KwariMart
        </h2>

        <p className="text-gray-600 mt-2">
          Connecting customers with trusted local merchants.
        </p>

        <div className="mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} KwariMart. All rights reserved.
        </div>

      </div>
    </footer>
  );
}