import { Pagination, ThemeProvider } from "flowbite-react";

function Paginations() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Pagination
          theme={customTheme}
          className="border-verdeD"
          currentPage={currentPage}
          totalPages={max}
          onPageChange={onPageChange}
        />
      </ThemeProvider>
    </>
  );
}

export default Paginations;