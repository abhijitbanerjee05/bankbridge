import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const TransactionsPagination = ({currentPage, totalPages, handlePageClick} : {currentPage : number, totalPages : number, handlePageClick : (page : number) => void}) => {
  return (
    <Pagination>
                <PaginationContent>
                    {currentPage > 1 &&
                        <PaginationItem onClick={() => handlePageClick(currentPage - 1)}>
                            <PaginationPrevious href="#" />
                        </PaginationItem>}

                    {currentPage - 2 > 0 &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>}

                    {currentPage - 1 > 0 &&
                        <PaginationItem onClick={() => handlePageClick(currentPage - 1)}>
                            <PaginationLink href="#">{currentPage - 1}</PaginationLink>
                        </PaginationItem>}

                    <PaginationItem onClick={() => handlePageClick(currentPage)}>
                        <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
                    </PaginationItem>

                    {currentPage + 1 <= totalPages &&
                        <PaginationItem onClick={() => handlePageClick(currentPage + 1)}>
                            <PaginationLink href="#">{currentPage + 1}</PaginationLink>
                        </PaginationItem>}

                    {currentPage + 2 < totalPages &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>}

                    {currentPage !== totalPages &&
                        <PaginationItem onClick={() => handlePageClick(currentPage + 1)}>
                            <PaginationNext href="#" />
                        </PaginationItem>}
                </PaginationContent>
            </Pagination>
  )
}

export default TransactionsPagination