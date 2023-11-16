
import { Forminput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";


export const action = async({request})=> {
 
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

 // console.log(data);  /* email: "muratyonev@gmail.com"password:"48968496" username: "bugrayonev"  */

  try {
     const response =  await customFetch.post("/auth/local/register", data)
    toast.success("Account created successfuly")
    
    return redirect("/login")
  } catch (error) {
      const errorMessage = error?.response?.data?.error?.message || "please double check your crendtials"
      toast.error(errorMessage)
  }

 return null
}

const Register = () => {




  return (
  <section className="h-screen grid place-items-center">
    <Form method="POST" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
      <h4 className="text-center text-3xl font-bold">register</h4>
      <Forminput
          name="username"
          label="username"
          type="text"
        
        />
          <Forminput
          name="email"
          label="email"
          type="email"
         
        />
          <Forminput
          name="password"
          label="password"
          type="password"
          
        />
        <div className="mt-4">
          <SubmitBtn text="register"/>
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
    </Form>
  </section>
  )
}

export default Register
