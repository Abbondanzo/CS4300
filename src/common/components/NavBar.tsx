import React from "react";

interface Props {
  title: string;
}

const NavBar = ({ title }: Props) => {
  document.title = title;
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <h1>{title}</h1>
    </>
  );
};

export default NavBar;
