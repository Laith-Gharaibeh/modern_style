// next.js
// import { redirect } from "next/navigation";
// next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// utilities
import { getDictionary } from "@/utilities/dictionary";
// components
import FormLogin from "@/components/LoginPage/FormLogin";

const LoginPage = async (props) => {
  const { lang } = props.params;
  console.log("[LoginPage.jsx] props = ", props);
  const session = await getServerSession(authOptions);
  console.log("[LoginPage.jsx] session = ", session);

  if (session) {
    redirect("/" + lang);
  }

  // translation
  let pageWords = await getDictionary(lang);
  pageWords = pageWords.pages.login;
  console.log("[LoginPage.jsx] pageWords = ", pageWords);

  return (
    <section className="h-full flex justify-center items-center">
      <div className="container  flex flex-col justify-center items-center">
        <FormLogin lang={lang} pageWords={pageWords} />
      </div>
    </section>
  );
};

export default LoginPage;
