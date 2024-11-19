import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSearchengin } from "react-icons/fa";

import css from "./Form.module.css";

const windowEror = () => {
  toast("Enter film name", { position: "top-center" });
};

const Form = ({ getSearchQuery, prevValue }) => {
  const [query, setQuery] = useState(prevValue ?? "");
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputQuery = query.trim();
    if (!inputQuery) {
      windowEror();
      return;
    }
    getSearchQuery(inputQuery);
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="query"
          placeholder="Enter film name"
        />
        <button className={css.button} type="submit">
          <FaSearchengin width={35} color="#55883B" />
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default Form;
