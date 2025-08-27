import type { NextPage } from "next";
import { Provider } from "react-redux";



import Desktop from "../components/screens/desktop";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { store } from "../store/store";

const Home: NextPage = () => {
  return (

    <Provider store={store}>
      <div>hi</div>
      <Desktop/>

    </Provider>
      // <Provider store={store}>
      //   {/* <PersistGate loading={<LoadingScreen />} persistor={persistor}> */}
      //     <Desktop />
      //   {/* </PersistGate> */}
      // </Provider>
    // </ErrorBoundary>
  );
};




export default Home;
