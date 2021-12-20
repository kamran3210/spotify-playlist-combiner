import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Image } from "next/image";
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react"
import PlaylistLibrary from "./centercomponents/PlaylistLibrary";
import SelectedPlaylists from "./centercomponents/SelectedPlaylists";
import PageButtons from "./centercomponents/PageButtons";
import ActionButtons from "./centercomponents/ActionButtons";

function Center() {
    const { data: session, status } = useSession();
    if (session) {
        return (
            <div className="flex flex-col px-5 items-center justify-center w-full min-h-[80vh] text-white">

                <div className="flex w-full justify-center">
                    <ActionButtons />
                </div>

                <div className="flex flex w-full">
                
                    <div className="flex-row flex w-full justify-center">
                        <div className="w-1/3 p-2 flex-col">
                            <div className="flex">
                                <h1 className="text-lg font-medium">
                                    Select playlists:
                                </h1>
                            </div>
                            <div className="flex mb-2 ">
                                <PlaylistLibrary />
                            </div>
                            <div className="flex justify-end">
                                <PageButtons />
                            </div>
                        </div>

                        <div className="w-1/3 p-2 flex-col">
                            <div className="flex">
                                <h1 className="text-lg font-medium">
                                    Selected playlists:
                                </h1>
                            </div>
                            <div className="mb-2">
                                <SelectedPlaylists />
                            </div>
                        </div>
                    </div>

                </div>
                
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
