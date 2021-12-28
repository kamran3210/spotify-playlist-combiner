import Popper from "./Popper";
import SongCount from "./SongCount";

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
                    <p>Songs: &nbsp; <SongCount /></p>
                </div>
                
                <button className={
                    "px-3 flex items-center justify-center hover:bg-blue-600 cursor-pointer hover:text-blue-200"
                    } >
                    Add to existing playlist
                </button>
                <button className={
                    "px-3 flex items-center justify-center hover:bg-blue-600 cursor-pointer hover:text-blue-200"
                    } >
                    Create new playlist
                </button>
            </div>
        </div>
        
    )
}

export default ActionButtons
