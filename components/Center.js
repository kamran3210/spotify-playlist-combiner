import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Image } from "next/image";
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react"
import PlaylistLibrary from "./centercomponents/PlaylistLibrary";

function Center() {
    const { data: session, status } = useSession();
    if (session) {
        return (
            <div className="flex flex-row p-5 items-center justify-center w-full min-h-[80vh] text-white">

                    <PlaylistLibrary className="w-full"/>
                
            </div>
        );
    } else {
        return (
            <div className="flex flex-col p-5 items-center justify-center min-h-[70vh] text-white">

                <h1 className="text-7xl mb-10">
                    Spotify Set Operations
                </h1>
                <p className="mb-5 text-sm font-medium">
                    Merge your Spotify playlists using set operations! You can do unions, intersections and differences!
                </p>
                <button className="flex p-4 items-center text-4xl rounded-full outline-none ring-2 ring-white hover:ring-gray-200 hover:text-gray-200"
                    onClick={() => signIn("spotify", { callbackUrl: "/" })}>
                    <img src="images/spotify.svg" className="w-8" />
                    <p className='pl-2 pr-2 text-2xl font-medium'>
                        Login with Spotify
                    </p>
                </button>

            </div>
        )
    };
}

export default Center;
