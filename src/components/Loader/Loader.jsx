import { FidgetSpinner } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.Wrapper}>
      <FidgetSpinner
        backgroundColor={"#28435B"}
        visible={true}
        height="100"
        width="100"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};

export default Loader;
