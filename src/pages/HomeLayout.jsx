import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  // console.log("navigation",navigation);
  const isPageLoading = navigation.state === "loading";

  return (
    <div>
      <Header />
      <Navbar />

      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </div>
  );
};

export default HomeLayout;
