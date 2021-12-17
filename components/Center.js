import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Image } from "next/image";

function Center() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className="flex flex-row items-center justify-center min-h-[70vh]">
        <div className="m-10 p-10 border-2 border-gray-100">
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
        </div>
        <div className="m-10">
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
        </div>
        <div className="m-10">
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
          <p>playlist</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-white text-7xl mb-10">
          Spotify Set Operations
        </h1>
        <p className="mb-5 text-white text-sm font-medium">
          Merge your Spotify playlists using set operations! You can do unions, intersections and differences!
        </p>
        <button className="flex p-4 items-center text-4xl rounded-full outline-none ring-2 ring-white hover:ring-gray-200 text-white hover:text-gray-200"
          onClick={() => signIn("spotify", {callbackUrl: "/"})}>
          <img src="images/spotify.svg" className="w-8"/>
          <p className='pl-2 pr-2 text-2xl font-medium'>
            Login with Spotify
          </p>
        </button>
      </div>
    )
  };
}

export default Center;
