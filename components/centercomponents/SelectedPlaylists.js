import { XIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil"
import { selectedPlaylistsState } from "../../atoms/selectedPlaylistsAtom";

function SelectedPlaylists() {
    const [selectedPlaylists, setSelectedPlaylists] = useRecoilState(selectedPlaylistsState);
    function removePlaylist(playlist) {
        let newSelectedPlaylists;
        newSelectedPlaylists = selectedPlaylists.filter((p) => p.id !== playlist.id);
        setSelectedPlaylists(newSelectedPlaylists);
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 content-start h-full">
            {selectedPlaylists.map((playlist) => (
                <div className="flex flex-row bg-blue-600 px-2 py-1 w-full my-1 rounded-full"
                    key={playlist.id}>
                    <p className="truncate w-4/5 text-lg text-center">
                        {playlist.name}
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
