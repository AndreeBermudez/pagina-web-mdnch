import { useState } from "react";

interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage: number;
  }

export const usePagination = <T>({data,itemsPerPage}:UsePaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLastItem =  itemsPerPage * currentPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem)

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    return{
        currentPage,
        currentItems,
        totalPages,
        handleChangePage
    }
};
