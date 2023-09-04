import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import ADD_SIGN from "../lib/apollo/queries/addSign";

interface FormState {
  [key: string]: string;
}

function NewSign() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({});
  const [addSign] = useMutation(ADD_SIGN, {
    onCompleted() {
      router.push("/");
    },
  });

  const handleInput = ({ e, name }: { e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; name: string }) => {
    setFormState({
      ...formState,
      [name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="mb-10 text-3xl">Next.js signbook!</h1>
      <div className="grid mb-10 shadow-xl max-w-7xl bg-purple-50 p-7 grid-row-1">
        <div>
          <label htmlFor="nickname" className="mb-2 text-purple-900">
            Nickname
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="Your name"
            onChange={(e) => handleInput({ e, name: "nickname" })}
            className="w-full p-2 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="content" className="mb-2 text-purple-900">
            Leave a message!
          </label>
          <textarea
            id="content"
            placeholder="Leave a message here!"
            className="w-full p-2 rounded-lg"
            onChange={(e) => handleInput({ e, name: "content" })}
          ></textarea>
        </div>
        <div>
          <label htmlFor="nickname" className="mb-2 text-purple-900">
            If you want, write your country name an its emogi flag
          </label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            onChange={(e) => handleInput({ e, name: "country" })}
            className="w-full p-2 rounded-lg"
          />

          <button
            className="p-4 m-auto mt-4 bg-purple-600 rounded-lg text-gray-50"
            onClick={() => addSign({ variables: formState })}
          >
            Submit
          </button>
        </div>
        <Link href="/" passHref className="mt-5 underline">
          <label>Back to the homepage</label>
        </Link>
      </div>
    </div>
  );
}

export default NewSign;
