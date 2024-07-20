// next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UserProfilePage = async (props) => {
  const { lang } = props.params;
  const session = await getServerSession(authOptions);
  console.log("[UserProfilePage.jsx] session = ", session);

  if (!session) {
    redirect("/" + lang);
  }
  const userId = session.user.id;
  console.log("[UserProfilePage.jsx] userId = ", userId);

  return (
    <section>
      <div className="container">UserProfilePage</div>
    </section>
  );
};

export default UserProfilePage;
