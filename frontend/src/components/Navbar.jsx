export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">Recipe Website</h1>
	  <div>
		{/* Navigation links */}
		<a href="/" className="mr-4 hover:underline">Home</a>
		<a href="/recipes" className="mr-4 hover:underline">Recipes</a>
		<a href="/login" className="mr-4 hover:underline">Login</a>
		<a href="/create-account" className="hover:underline">Create Account</a>
	  </div>
    </nav>
  );
}
