
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="container py-5"
      tabIndex={-1}
    >
      <div className="text-center">
        <p className="display-1 fw-bold mb-2">
          404
        </p>

        <h1 className="h2">
          Page not found
        </h1>

        <p className="mt-3">
          The page you are looking for may have been
          moved, deleted, or the address may be
          incorrect.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <Link href="/">
            Return to Home
          </Link>

           <Link href="/support">
            Visit Support
          </Link>
        </div>
      </div>
    </main>
  );
}
