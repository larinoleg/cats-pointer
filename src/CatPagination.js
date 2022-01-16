import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const CatPagination = () => {
  let [params] = useSearchParams();
  const page = Number(params.get("p") ?? "1");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const nextPage = page + 1;
  const prvPage = page - 1;
  const urlCat = `/?p=${nextPage}`;
  const urlCat2 = `/?p=${prvPage}`;

  const navigate = useNavigate();

  const displayItems = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      const href = `/${item.slug}`;
      return (
        <div id="cat">
          <div id="name">
            {" "}
            <a href={href}> {item.name} </a>{" "}
          </div>
          <img src={item.image_url} />
        </div>
      );
    });

  useEffect(() => {
    fetch(`https://cats-api.strsqr.cloud/cats?p=${page}`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    const pageCount = 10;

    const changePage = ({ selected }) => {
      console.log("abc");
      setPageNumber(selected);
      navigate(`?p=${selected + 1}`);
    };

    return (
      <div className="App">
        {/* <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}
        /> */}
        <div className="button">
          <a href={urlCat}>
            <button type="button">next</button>
          </a>
        </div>

        <div className="button">
          <a href={urlCat2}>
            <button type="button">previous</button>
          </a>
        </div>

        {displayItems}
      </div>
    );
  }
};

export default CatPagination;
