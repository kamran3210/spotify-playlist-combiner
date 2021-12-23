import { XIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil"
import { selectedPlaylistsState } from "../../atoms/selectedPlaylistsAtom";

function SelectedPlaylists({ perPage }) {
    const libraryHeight = 3.125 * perPage - 0.125;

    const [selectedPlaylists, setSelectedPlaylists] = useRecoilState(selectedPlaylistsState);
    function removePlaylist(playlist) {
        let newSelectedPlaylists;
        newSelectedPlaylists = selectedPlaylists.filter((p) => p.id !== playlist.id);
        setSelectedPlaylists(newSelectedPlaylists);
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 content-start overflow-y-auto p-1" style={{height: `${libraryHeight}rem`}}>
            {selectedPlaylists.map((playlist) => (
                <div className="flex flex-row bg-blue-600 px-2 py-1 w-full rounded-full"
                    key={playlist.id}>
                    <p className="truncate w-5/6 text-lg text-center">
                        {playlist.name}&nbsp; {/* Hacky way to give an otherwise empty p tag some line height */}
                    </p>
                    <button className="w-4 ml-2" onClick={() => removePlaylist(playlist)}>
                        <XIcon className="w-full"/>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default SelectedPlaylists
