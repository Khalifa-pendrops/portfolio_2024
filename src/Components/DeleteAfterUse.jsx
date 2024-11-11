import React, { useState } from "react";
import PropTypes from "prop-types";

const DeleteAfterUse = (props) => {
//   const [change, setChange] = useState("Good Morning");
//   const [quantity, setQuantity] = useState(0);

//   const handleQuantity = () => {
//     setQuantity(quantity);
//   };

//   const handleAdd = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleAddTwo = () => {
//     setQuantity(quantity + 2);
//   };

//   const handleAddThree = () => {
//     setQuantity(quantity + 3);
//   };

//   const handleReset = () => {
//     alert("Cart was reset!");
//     setTimeout(() => {
//       setQuantity(0);
//     }, 5000);
//   };

  return (
    <div>
      {/* <h1>
        Cart Quantity: <span>{quantity}</span>
      </h1>
      <h1>Greet: {change}</h1>
      <h1>
        Hello {props.name} a.k.a {props.heroName}
      </h1>
      {props.children}
      <button onClick={() => setChange("Good bye!")}>Click</button>

      <div className="text-danger">
        <button className="px-2" onClick={handleQuantity}>
          Cart Quantity
        </button>
        <button className="px-2" onClick={handleAdd}>
          Add to Cart
        </button>
        <button className="px-2" onClick={handleAddTwo}>
          +2
        </button>
        <button className="px-2" onClick={handleAddThree}>
          +3
        </button>
        <button className="px-2" onClick={handleReset}>
          Reset Cart
        </button>
      </div> */}

          <h1>Hello parent greetParent={props.children }</h1>
      <button className="px-3 text-danger">Click</button>
    </div>
  );
};

DeleteAfterUse.propTypes = {
  name: PropTypes.string.isRequired,
  heroName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DeleteAfterUse;
