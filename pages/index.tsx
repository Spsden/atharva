import type { NextPage } from "next";
import { Provider } from "react-redux";



import Desktop from "../components/screens/desktop";
import store from "../components/utils/processes/store";

const Home: NextPage = () => {
  return (
    <Provider store={store}>
      <Desktop />

    </Provider>
  )
};



export default Home;
