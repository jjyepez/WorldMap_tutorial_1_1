import React from "react";
import "./css/Sidebar.css";

export default function Sidebar(props) {
  return (
    <div
      className="Sidebar"
      style={{
        flexDirection: "column",
        backgroundColor: "#FFF",
        padding: ".5rem",
        ...(props.style || {})
      }}
    >
      {props.children}
    </div>
  );
}
