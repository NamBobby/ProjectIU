import React, { useState, useEffect } from 'react';

function Pagination() {
    const [pages] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    const [currentPage, setCurrentPage] = useState(1);
    const [displayPages, setDisplayPages] = useState([]);

    useEffect(() => {
        updatePagination();
    }, []);

    const updatePagination = () => {
        let pageDisplay = [];

        if (pages.length <= pages.length) {
            pageDisplay = [...pages];
        } else if (currentPage <= 3) {
            pageDisplay = [pages[0], pages[1], pages[2], pages[3], pages[4], pages[pages.length - 1]];
        } else if (currentPage >= pages.length - 2) {
            pageDisplay = [pages[0], pages[pages.length - 5], pages[pages.length - 4], pages[pages.length - 3], pages[pages.length - 2], pages[pages.length - 1]];
        } else {
            pageDisplay = [pages[0], pages[currentPage - 2], pages[currentPage - 1], pages[currentPage], pages[currentPage + 1], pages[pages.length - 1]];
        }

        setDisplayPages(pageDisplay);
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            updatePagination();
        }
    };

    const handleNextClick = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
            updatePagination();
        }
    };

    return (
        <div className="fullpage">
            <div className="pagination">
                <span className="page" onClick={() => setCurrentPage(1)}><i class='bx bx-chevrons-left' ></i></span>
                <span href="#" className="prev" onClick={handlePrevClick}><i class='bx bx-left-arrow-alt' ></i></span>
                {displayPages.map((page) => {
                    if (page === 1 || page === pages.length || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                            <span key={page} className={currentPage === page ? "page active" : "page"} onClick={() => setCurrentPage(page)}>
                                {page}
                            </span>
                        )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                            <span key={page} className="ellipsis">
                                ...
                            </span>
                        )
                    } else {
                        return null;
                    }
                })}
                <span href="#" className="next" onClick={handleNextClick}><i class='bx bx-right-arrow-alt'></i></span>
                <span className="page" onClick={() => setCurrentPage(pages.length)}><i class='bx bx-chevrons-right' ></i></span>
            </div>
        </div>
    );
}

export default Pagination;

