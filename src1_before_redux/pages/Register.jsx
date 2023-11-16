import { Forminput, SubmitBtn } from "../components";
import { Form, Link } from "react-router-dom";

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
