import Link from "next/link";

export default function Pagination({ totalPages, page }) {
  return (
    <div className="flex items-center justify-center">
      <div className="btn-group">
        {page > 1 && (
          <Link href={`/prompts/${page - 1}`} className="btn btn-outline">
            Previous page
          </Link>
        )}

        {page < totalPages && (
          <Link href={`/prompts/${page + 1}`} className="btn btn-outline">
            Next page
          </Link>
        )}
      </div>
    </div>
  );
}
