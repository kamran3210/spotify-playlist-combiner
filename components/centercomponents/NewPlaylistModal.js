import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mergedPlaylistState } from "../../atoms/playlistsAtom";
import useSpotify from "../../hooks/useSpotify";
import { getAllSongsInPlaylist } from "../../lib/getAllSongsInPlaylist";
import { difference } from "../../lib/setOperations";

export default function NewPlaylistModal({ perPage }) {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();

	// Store playlists, # of playlists, page number as state
	const mergedSet = useRecoilValue(mergedPlaylistState);
	const [showModal, setShowModal] = useState(false);
    const [nameInputValue, setNameInputValue] = useState("");
    const [descriptionInputValue, setDescriptionInputValue] = useState("");

    // Input Field handler
    const handleNameInput = (e) => {
        setNameInputValue(e.target.value);
    };

    const handleDescriptionInput = (e) => {
        setDescriptionInputValue(e.target.value);
    };

    // Reset Input Field handler
    const resetInputField = () => {
        setNameInputValue("");
        setDescriptionInputValue("");
    };

	// Add songs to playlist
	function addSongs() {
        let songsToAdd = Array.from(mergedSet);
        // Turn ids into URIs
        const URIs = songsToAdd.map((id) => `spotify:track:${id}`);
        // Split URIs into pages of 100
        const pages = URIs.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index/100);
            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []; // start a new chunk
                }
                resultArray[chunkIndex].push(item);
                return resultArray;
        }, []);
        // Add each page to the playlist
        // pages.forEach((page) => spotifyApi.addTracksToPlaylist(selectedPlaylist.id, page).catch((error) => {
        //     console.log("Error whilst trying to add songs to existing playlist!");
        //     console.log(error);
        // }));
        // alert("added!");
	}

	function canSave() {
		return mergedSet.size && selectPlaylist
	}

	return (
		<>
			<button className={"px-3 flex items-center justify-center hover:bg-blue-600 cursor-pointer hover:text-blue-200"}
				type="button"
				onClick={() => setShowModal(true)} >
                Create new playlist
            </button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative my-6 mx-auto w-2/3">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 text-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">Create a new playlist</h3>
								</div>

								{/*body*/}
								<div className="relative p-6 flex-auto">

                                    <div className="mb-2">
                                        <input placeholder="Name of the new playlist"
                                            value={nameInputValue}
                                            id="textInput"
                                            name="textInput"
                                            onChange={handleNameInput}
                                            className="w-full p-2 bg-gray-900 rounded-lg border border-white" />
                                    </div>
                                    <div className="h-[30rem]">
                                        <textarea placeholder="Description of the new playlist"
                                            value={descriptionInputValue}
                                            id="textInput"
                                            name="textInput"
                                            onChange={handleDescriptionInput}
                                            className="w-full h-full p-2 bg-gray-900 rounded-lg border border-white" />
                                    </div>
									

								</div>

								{/*footer*/}
								<div className="flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
									<p className="flex-1 justify-start float-left">Songs to add: {mergedSet.size}</p>

									<div className="flex items-center  pb-1 flex-1 justify-end">
										<button
											className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
											type="button"
											onClick={() => setShowModal(false)}
										>
											CANCEL
										</button>

										<button
											className={
												`${canSave() ? "bg-emerald-500" : "bg-gray-600"} text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded
												shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 justify-end`
											}
											type="button"
											disabled={!canSave()}
											onClick={() => addSongs()}
										>
											SAVE
										</button>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
