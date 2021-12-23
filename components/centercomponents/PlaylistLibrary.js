import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedPlaylistsState } from "../../atoms/selectedPlaylistsAtom";
import { playlistsTotalState } from "../../atoms/playlistsTotalAtom";
import { pageState } from "../../atoms/pageAtom";

function PlaylistLibrary({ perPage }) {
    const libraryHeight = 3.125 * perPage - 0.125;

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    // Store playlists, # of playlists, page number as state
    const [playlists, setPlaylists] = useState([]);
    const setPlaylistsTotal = useSetRecoilState(playlistsTotalState); // Global state
    const [page, setPage] = useRecoilState(pageState); // Global state

    // When page is changed, update playlists
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            try {
                spotifyApi.getUserPlaylists({ limit: perPage, offset: perPage * page }).then((data) => {
                    setPlaylists(data.body.items);
                    setPlaylistsTotal(data.body.total);
                });
            } catch (error) {
                console.log(error)
                setPage(0);
            }
        }
    }, [session, spotifyApi, page]);

    // Global state
    const [selectedPlaylists, setSelectedPlaylists] = useRecoilState(selectedPlaylistsState);
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

    return (
            // List of playlists
            <div className="bg-gray-800 rounded-lg shadow-lg w-full" style={{height: `${libraryHeight}rem`}}>
                <ul className="divide-y-2 divide-gray-100">
                    {playlists.map((playlist) => (
                        <li key={playlist.id}>
                            <div className={`p-3 hover:bg-blue-600 cursor-pointer ${isSelected(playlist) ? "bg-blue-600" : "hover:text-blue-200"}`}
                                onClick={() => togglePlaylist(playlist)}>
                                <p className="truncate text-base">
                                    {playlist.name}&nbsp; {/* Hacky way to give an otherwise empty p tag some line height */}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default PlaylistLibrary;