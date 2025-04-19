export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Docker Arrange. Built for learning purposes.
        </p>
      </div>
    </footer>
  )
}
