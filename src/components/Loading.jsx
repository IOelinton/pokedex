import React from "react";
import "../styles/loading.css";

export default function Loading() {
  return (
    <div className="loading-area ">
      <div class="lds-ellipsis ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
