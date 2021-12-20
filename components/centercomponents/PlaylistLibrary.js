import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { selectedPlaylistsState } from "../../atoms/selectedPlaylistsAtom";
import { playlistsTotalState } from "../../atoms/playlistsTotalAtom";
import { pageState } from "../../atoms/pageAtom";

function PlaylistLibrary() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    // Amount of playlists to display per page
    const perPage = 10;

    // Store playlists, # of playlists, page number as state
    const [playlists, setPlaylists] = useState([]);
    const [playlistsTotal, setPlaylistsTotal] = useRecoilState(playlistsTotalState); // Global state
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
        <div className="w-full">
            {/* List of playlists */}
            <div className="bg-gray-800 rounded-lg shadow-lg w-full">
                <ul className="divide-y-2 divide-gray-100">
                    {playlists.map((playlist) => (
                        <li key={playlist.id}>
                            <div className={"p-3 hover:bg-blue-600 hover:text-blue-200 cursor-pointer ".concat(isSelected(playlist) ? "bg-blue-600" : "")}
                                onClick={() => togglePlaylist(playlist)}>
                                <p className="truncate text-base">
                                    {playlist.name}&nbsp;
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PlaylistLibrary
