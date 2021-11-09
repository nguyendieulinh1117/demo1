import "./App.css";
import "antd/dist/antd.css";
import { Switch, Route, Link } from "react-router-dom";
import CreateForm from "./CreateForm";
import CreateCatalog from "./CreateCatalog";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Create catalog</Link>
          </li>
          <li>
            <Link to="/product">Create Product</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={CreateCatalog} />
        <Route path="/product" exact component={CreateForm} />
      </Switch>
    </div>
  );
}

export default App;
