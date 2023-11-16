import { useLoaderData, useLocation, useNavigate } from "react-router-dom";


const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1; // 1,2,3,vs
  });

    const {search,pathname} = useLocation() // url deki search ve pathname alacağız
  //  console.log(search) // ?search=gin&category=all&company=all&order=a-z&price=100000 // buraya page=1 gibi sayıyı dynamic olarak eklemiz lazım
    // console.log(pathname) // /products
  
    const navigate = useNavigate() // url emize page numarasını dynamic ekledikten sonra yönlendirme yapacagız
 
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)  // yeni url imizi oluşturuyoruz
    searchParams.set("page",pageNumber) // yeni url e page:1 gibi page i ekledik
    
    navigate(`${pathname}?${searchParams.toString()}`) // yeni url in son halini url barına  aktardık
    // eger pagenation buttonlarına tıklandıgında  Product.jsx deki loader functionında requestimiz sonunda sayfa numarası olarak yapılacak
  };

  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1
            if(prevPage < 1) prevPage = pageCount

            
            handlePageChange(prevPage)
          }
       }
        >
          Prev
        </button>

        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() =>{
            let nextPage = page + 1
            if(nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          } }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
