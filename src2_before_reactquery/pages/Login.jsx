import { Forminput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";


/* 1.Login.jsx içindeki action functionunda 
userımızı store kaydetmek istiyoruz fakat geleneksel useDispatch hooku "action functionunda " içinde 
çalışmayacgından store.jsx i  App.jsx de import ediyoruz  ve Login router ı içinde   action:loginAction(store), gibi gönderiyoruz
"action functionunda" da  "store" u ikinci bir callback içinde alacağız
export const action = (store) => async({request})=> {   --------gibi------
*/
export const action =
  (store) =>
  async ({ request }) => {
    // inputlardan gelen bilgileri alalım
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);

      store.dispatch(loginUser(response.data)); // store a göndericez
      toast.success("Logged in successfuly");

      return redirect("/"); // redirect i action ve loader functionunda kullanıyoruz.p
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your crendtials";
      toast.error(errorMessage);
    }
    return null;
  };

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAsGuestUser = async()=> {
    const data ={
      identifier: "test@test.com",
      password: "secret"
    }
    try {
      const response = await customFetch.post("/auth/local", data);
      dispatch(loginUser(response.data))
      toast.success("welcome to user")
      navigate("/")
      
    } catch (error) {
      const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your crendtials";
    toast.error(errorMessage);
    }
   
    
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <Forminput
          name="identifier" // tam olarak anlaşılmadı
          label="email"
          type="email"
          // defaultValue="test@test.com"
        />
        <Forminput
          name="password"
          label="password"
          type="password"
          // defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block" onClick={loginAsGuestUser}>
          Guest User
        </button>

        <p className="text-center">
          Not a member yet{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
