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

  if (Math.ceil(Number(pageCount <= 1))) return null;

  const pages = _.range(1, pageCount + 1);
  let showPages = [];
  switch (currentPage) {
    case 1:
      showPages = [currentPage, currentPage+1, currentPage+2]      
      break;
    case pages.length:
      showPages = [currentPage-2, currentPage-1, currentPage]
      break;
    default:
      showPages = [currentPage-1, currentPage, currentPage+1]
      break;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {currentPage !== 1 ? (
        <li className="page-item">
          <a 
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={()=> onPageChange(1)}>
              <span>Start</span>        
          </a>
        </li>) : null }
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() =>
              onPageChange(currentPage === 1 ? pages.length : currentPage - 1)
            }
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {showPages.map((page) => (
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
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() =>
              onPageChange(currentPage === pages.length ? 1 : currentPage + 1)
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        {currentPage !== pages.length ? (
        <li className="page-item">
          <a 
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={()=> onPageChange(pages.length)}>
              <span>End</span>        
          </a>
        </li>) : null }
      </ul>
    </nav>
  );
}
