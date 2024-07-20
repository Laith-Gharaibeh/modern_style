/* 
  - register process tasks:
  1- add NextAuth package and login the user
  2- add "Email Verification" to activate the user account
  3- add "Password Reset" to reset the user password
  
  4- (optional) add "PasswordLess" to login the user without password
  

  - users accounts:
  email    : rafatgh@gmail.com 
  password : rafatGh123##

  email    : ahmedku@gmail.com 
  password : ahmedKu123!
*/
// next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// components
import FormRegister from "@/components/RegisterPage/FormRegister";

const RegisterPage = async (props) => {
  const { lang } = props.params;
  console.log("[RegisterPage.jsx] props = ", props);

  const session = await getServerSession(authOptions);
  console.log("[RegisterPage.jsx] session = ", session);

  if (session) {
    redirect("/" + lang);
  }

  return (
    <section className="h-full flex justify-center items-center">
      <div className="container  flex flex-col justify-center items-center">
        <FormRegister lang={lang} />
      </div>
    </section>
  );
};

export default RegisterPage;
