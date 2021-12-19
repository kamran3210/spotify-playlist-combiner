import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

function PlaylistLibrary() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    // Get playlists and store as state
    const [playlists, setPlaylists] = useState([]);
    const [playlistsTotal, setPlaylistsTotal] = useState();
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists({ limit: 10 }).then((data) => {
                setPlaylists(data.body.items);
                setPlaylistsTotal(data.body.total);
            });
        }
    }, [session, spotifyApi]);

    // When page is changed, update playlists
    const [page, setPage] = useState(0);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists({ limit: 10, offset: 10 * page }).then((data) => {
                setPlaylists(data.body.items);
                setPlaylistsTotal(data.body.total);
            });
        }
    }, [session, spotifyApi, page]);

    
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    function togglePlaylist(playlist) {
        // If the playlist is already selected, remove it
        let newSelectedPlaylists;
        if (selectedPlaylists.map((p) => p.id).includes(playlist.id)) {
            newSelectedPlaylists = selectedPlaylists.filter((p) => p.id !== playlist.id);
        // Otherwise add it
        } else {
            newSelectedPlaylists = [...selectedPlaylists, playlist]
        }
        setSelectedPlaylists(newSelectedPlaylists);
        
    }

    function isSelected(playlist) {
        return selectedPlaylists.map((p) => p.id).includes(playlist.id)
    }

    function isNextPage() {
        return (page + 1) * 10 < playlistsTotal;
    }

    function isPrevPage() {
        return page > 0;
    }


    return (
        <div className="w-1/3">
            {/* List of playlists */}
            <div className="bg-gray-800 rounded-lg shadow-lg w-full mb-2">
                <ul className="divide-y-2 divide-gray-100">
                    {playlists.map((playlist) => (
                        <li key={playlist.id}
                            className={"p-3 hover:bg-blue-600 hover:text-blue-200 ".concat(isSelected(playlist) ? "bg-blue-600" : "")}
                            onClick={() => togglePlaylist(playlist)}>
                            <p className="truncate">
                                {playlist.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Page arrows */}
            <div className="flex justify-end">
                <div className="flex bg-gray-800 rounded-lg shadow-lg">
                    {/* Left arrow */}
                    <div className={"w-10 ".concat(isPrevPage() ? "hover:bg-blue-600 hover:text-blue-200" : "bg-gray-600")}>
                        <button className="p-1" onClick={() => setPage(page-1)} disabled={!isPrevPage()}>
                            <ChevronLeftIcon className="w-full h-full"/>
                        </button>
                    </div>
                    {/* Right arrow */}
                    <div className={"w-10 ".concat(isNextPage() ? "hover:bg-blue-600 hover:text-blue-200" : "bg-gray-600")}>
                        <button className="p-1" onClick={() => setPage(page+1)} disabled={!isNextPage()}>
                            <ChevronRightIcon className="w-full h-full"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistLibrary
