import Link from "next/link";
import { useQuery } from "@apollo/client";
import GET_LATES_SIGNS from "../lib/apollo/queries/getLatestSigns";
import Sign from "../components/Sign";
import Loading from "../components/Loading";

function HomePage() {
  const { loading, data } = useQuery(GET_LATES_SIGNS, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="mb-5 text-3xl">Real-World signbook</h1>
      <Link href="/new-sign">
        <button className="p-2 m-auto mt-4 mb-8 border-2 border-purple-800 rounded-lg">Add new sign</button>
      </Link>
      <div>
        {data.signs.map((sign: any) => (
          <Sign key={sign.id} {...sign} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
