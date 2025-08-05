// extension name: ES7+ React/Redux/React-Native snippets
// write this to make a component: rafce

import React from "react";

const Card = ({ text }) => {
  return (
    <div className="w-48 h-48 bg-red-600 text-white rounded-xl my-3 p-4">
      hello {text}
    </div>
  );
};

export default Card;
