/* ---- Pagination Helpers ---- */
export const getNextPageParam = (lastPage: { page?: number; pageSize?: number; total?: number }) => {
  if (!lastPage || lastPage.page === undefined || lastPage.pageSize === undefined || lastPage.total === undefined) {
    return undefined;
  }
  const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
  return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
};
