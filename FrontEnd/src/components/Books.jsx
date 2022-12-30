import styled from "styled-components";
// import { popularProducts } from "../components/data";
import Book from "./Book";



const Books = ({ data }) => {
  let popularProducts = data;
  return (
    // <section className="">
      <div className="row justify-content-center align-item-center">
        {popularProducts.map((item, index) => (
          <Book item={item} key={item.id} />
        ))}
      </div>
    // </section>

  );
};

export default Books;