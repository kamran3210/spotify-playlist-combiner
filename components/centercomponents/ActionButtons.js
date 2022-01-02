import { useRecoilValue } from "recoil";
import { mergedPlaylistState } from "../../atoms/playlistsAtom";
import ExistingPlaylistModal from "./ExistingPlaylistModal";
import NewPlaylistModal from "./NewPlaylistModal";
import Popper from "./Popper";

const actions = [
    {
        name: "Union", 
        state: 0,
        tooltip: "Include all of the songs from the selected playlists",
    },
    { 
        name: "Intersection", 
        state: 1,
        tooltip: "Include only songs in all of the selected playlists",
    },
    { 
        name: "Difference", 
        state: 2,
        tooltip: "Include songs from the first selected playlist that aren't in any of the others",
    },
    { 
        name: "Symmetric Difference", 
        state: 3,
        tooltip: "Include only songs that are in an odd number of playlists",
    },
];

function ActionButtons() {

    const mergedSet = useRecoilValue(mergedPlaylistState);

    return (
        <div className="flex max-w-[66.6%]">
            {/* Action buttons for each set operation*/}
            <div className="flex bg-gray-800 rounded-lg shadow-lg h-10">

                {actions.map((action) => (
                    <Popper key={action.name} text={action.name} state={action.state} tooltip={action.tooltip} />
                ))}

            </div>

            <div className="flex bg-gray-800 rounded-lg shadow-lg min-h-10 ml-5">
                <div className="px-3 flex items-center justify-center">
                    <p>Songs: {mergedSet.size}</p>
                </div>
                
                <ExistingPlaylistModal perPage={10} />
                
                <NewPlaylistModal />
            </div>
        </div>
        
    )
}

export default ActionButtons
