import { Link } from "react-router-dom";
import "./MainLoadingScreen.css";

function MainLoadingScreen() {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>Sorry, the page you are looking for might be in another castle.</p>
      <button>
        <Link to={"/browse"}>Go Home</Link>
      </button>
    </div>
  );
}

export default MainLoadingScreen;
