import _ from "lodash";

type Params = {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => {};
};

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
}: Params) {
  const pageCount = items / pageSize;

  if (Math.ceil(Number(pageCount === 1))) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              onClick={() => onPageChange(page)}
              className="page-link"
              href="#"
              style={{ cursor: "pointer" }}
            >
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
