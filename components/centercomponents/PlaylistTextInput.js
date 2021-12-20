import { useRecoilState } from "recoil";
import { selectedPlaylistsState } from "../../atoms/selectedPlaylistsAtom";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useState } from "react";

function PlaylistTextInput() {
    
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    const [selectedPlaylists, setSelectedPlaylists] = useRecoilState(selectedPlaylistsState);
    function addToSelectedPlaylists(playlist) {
        // If the playlist isn't already selected
        let newSelectedPlaylists;
        if (!selectedPlaylists.map((p) => p.id).includes(playlist.id)) {
            newSelectedPlaylists = [...selectedPlaylists, playlist]
            setSelectedPlaylists(newSelectedPlaylists);
        // Tell user the playlist has already been added
        } else {
            alert("Playlist already added!") // TODO: replace with better notification 
        }
    }

    // Value of the URL/ID user input
    const [inputValue, setInputValue] = useState("");

    // Input Field handler
    const handleUserInput = (e) => {
        setInputValue(e.target.value);
    };

    // Reset Input Field handler
    const resetInputField = () => {
        setInputValue("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Parse user input: extract the id from a valid Spotify URL, otherwise inrterpret input as the ID
        let playlistId;
        try {
            const url = new URL(inputValue);
            if (url.hostname === "open.spotify.com" && url.pathname.startsWith("/playlist/")) {
                playlistId = url.pathname.replace("/playlist/", "");
            }
        } catch (error) {
            if (error.message && error.message.includes("Invalid URL")) {
                playlistId = inputValue;
            } else {
                throw error;
            }
        }

        // Attempt to get the playlist from Spotify API
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getPlaylist(playlistId).then((data) => {
                addToSelectedPlaylists(data.body)
                resetInputField();
            }).catch((error) => {
                // If the playlist wasn't found, notify the user
                if (error.message && error.message.includes("Invalid playlist Id")) {
                    alert("Playlist not found!"); // TODO: replace with better notification 
                } else {
                    throw error;
                }
            });
        }
    };

    return (
        <div className="w-full"> 
            <form onSubmit={handleSubmit}>
                <div className="flex rounded-lg bg-gray-800 w-full">
                    {/* Text input field */}
                    <div className="flex-1">
                        <input placeholder="Add playlist by ID or URL" value={inputValue}
                            id="textInput" name="textInput" required onChange={handleUserInput}
                            className="w-full p-2 bg-gray-800 rounded-l-lg border border-white" />
                    </div>
                    {/* Submit button */}
                    <div className="flex">
                        <input type="submit" value="+"
                            className="p-2 justify-center hover:bg-blue-600 cursor-pointer" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaylistTextInput
