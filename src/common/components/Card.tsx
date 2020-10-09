import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Card = ({ title, subtitle, children }: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {subtitle && (
          <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
