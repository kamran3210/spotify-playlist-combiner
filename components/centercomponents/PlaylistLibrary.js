import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedPlaylistsState, playlistsTotalState, playlistsCacheState, pageState } from "../../atoms/playlistsAtom";
import { getAllSongsInPlaylist } from "../../lib/getAllSongsInPlaylist";

function PlaylistLibrary({ perPage }) {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    // Store playlists, # of playlists, page number as state
    const [playlists, setPlaylists] = useState([]); // Store the current page's playlists
    const [page, setPage] = useRecoilState(pageState); // Track the current page
    const setPlaylistsTotal = useSetRecoilState(playlistsTotalState); // Required for page buttons logic
    // When page is changed, update playlists library
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            try {
                // Get the new pages playlists
                spotifyApi.getUserPlaylists({ limit: perPage, offset: perPage * page }).then((data) => {
                    // Store them and update total playlists (in case new playlists are added)
                    setPlaylists(data.body.items);
                    setPlaylistsTotal(data.body.total);
                });
            } catch (error) {
                console.log("Error whilst trying to change page!");
                console.log(error);
                setPage(0);
            }
        }
    }, [session, spotifyApi, page]);

    const [playlistsCache, setPlaylistsCache] = useRecoilState(playlistsCacheState);
    const [selectedPlaylists, setSelectedPlaylists] = useRecoilState(selectedPlaylistsState);
    // Add or remove playlist to the selected playlists from the cache
    function togglePlaylist(playlist) {
        // If the playlist is already selected, remove it
        if (selectedPlaylists.map((p) => p.id).includes(playlist.id)) {
            setSelectedPlaylists(selectedPlaylists.filter((p) => p.id !== playlist.id));
        // Otherwise add it
        } else {
            // If the playlist is not in the cache, add it to the cache
            if (!playlistsCache[playlist.id]) {
                getAllSongsInPlaylist(playlist.id, spotifyApi).then((p) => {
                    let newCache = {...playlistsCache};
                    newCache[p.id] = p;
                    setPlaylistsCache(newCache);
                    // And then add it to the selected playlists
                    setSelectedPlaylists([...selectedPlaylists, p]);
                }).catch((error) => {
                    console.log("Error whilst trying to get all songs in playlist whilst toggling playlist!");
                    console.log(error)
                });
            // Otherwise, simply add it from the cahce
            } else {
                setSelectedPlaylists([...selectedPlaylists, playlistsCache[playlist.id]]);
            }
        }
    }

    // Check if a playlist is selected, used for colouring buttons
    function isSelected(playlist) {
        return selectedPlaylists.map((p) => p.id).includes(playlist.id)
    }
    
    // Height of playlist library in rem
    const libraryHeight = 3.125 * perPage - 0.125; 

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