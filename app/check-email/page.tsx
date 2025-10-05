export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Almost there!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Thank you for signing up. To complete your registration, please check your email inbox and confirm your email address.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          If you don’t see an email, check your spam or junk folder.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
