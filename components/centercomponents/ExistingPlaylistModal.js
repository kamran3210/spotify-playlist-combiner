import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mergedPlaylistState } from "../../atoms/playlistsAtom";
import useSpotify from "../../hooks/useSpotify";
import { getAllSongsInPlaylist } from "../../lib/getAllSongsInPlaylist";
import { difference } from "../../lib/setOperations";

export default function ExistingPlaylistModal({ perPage }) {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();

	// Store playlists, # of playlists, page number as state
	const [playlists, setPlaylists] = useState([]); // Store the current page's playlists
	const [page, setPage] = useState(0); // Track the current page
	const [playlistsTotal, setPlaylistsTotal] = useState(0); // Required for page buttons logic
	const [selectedPlaylist, setSelectedPlaylist] = useState();
	const [ignoreDuplicatesChecked, setignoreDuplicatesChecked] = useState(true);
	const mergedSet = useRecoilValue(mergedPlaylistState);
	const [showModal, setShowModal] = useState(false);
	// When page is changed, update playlists library
	useEffect(() => {
		// Get the new pages playlists
		spotifyApi.getUserPlaylists({ limit: perPage, offset: perPage * page }).then((data) => {
			// Store them and update total playlists (in case new playlists are added)
			setPlaylists(data.body.items);
			setPlaylistsTotal(data.body.total);
		}).catch((error) => {
			console.log("Error whilst trying to change page!");
			console.log(error);
		});
	}, [session, spotifyApi, page, perPage]);

	// Add songs to playlist
	function addSongs() {
		if (ignoreDuplicatesChecked) {
			// Don't add duplicate songs
			// Get songs in the target playlist to add songs to
			getAllSongsInPlaylist(selectedPlaylist.id, spotifyApi).then((p) => {
				// Find the songs that aren't duplicates
				let songsToAdd = Array.from(difference([mergedSet, new Set(p.tracks.items.map((i) => i.track.id))]));
				// If there's nothing to add, return
				if (songsToAdd.length === 0) {
					alert("All songs are duplicates!");
					setShowModal(false);
					return;
				}
				// Turn Ids into URIs
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
				pages.forEach((page) => spotifyApi.addTracksToPlaylist(selectedPlaylist.id, page).catch((error) => {
					console.log("Error whilst trying to add songs to existing playlist!");
					console.log(error);
				}));
				alert("added!");

			}).catch((error) => {
				console.log("Error whilst trying to get playlist to check for duplicates!");
				console.log(error);
			});


		// If we are adding duplicate songs
		} else {
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
			pages.forEach((page) => spotifyApi.addTracksToPlaylist(selectedPlaylist.id, page).catch((error) => {
				console.log("Error whilst trying to add songs to existing playlist!");
				console.log(error);
			}));
			alert("added!");
		}
	}

	// Set the selected playlist
	function selectPlaylist(playlist) {
		setSelectedPlaylist(playlist);
	}

	// Check if a playlist is selected, used for colouring buttons
	function isSelected(playlist) {
		return playlist.id === selectedPlaylist?.id
	}

	// Height of playlist library in rem
	const libraryHeight = 3.125 * perPage - 0.125;

	// Check if the next page exists
	function isNextPage() {
		return (page + 1) * perPage < playlistsTotal;
	}
	// Check if the previous page exists
	function isPrevPage() {
		return page > 0;
	}

	function canSave() {
		return mergedSet.size && selectPlaylist
	}

	return (
		<>
			<button
				className="px-3 flex items-center justify-center hover:bg-blue-600 cursor-pointer hover:text-blue-200"
				type="button"
				onClick={() => setShowModal(true)}
			>
				Add to existing playlist
			</button>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative my-6 mx-auto w-2/3">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 text-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">Add to existing playlist</h3>
								</div>

								{/*body*/}
								<div className="relative p-6 flex-auto">

									{/* Playlist Library */}
									<div className="bg-gray-900 rounded-lg shadow-lg w-full mb-2" style={{ height: `${libraryHeight}rem` }}>
										<ul className="divide-y-2 divide-gray-100">
											{playlists.map((playlist) => (
												<li key={playlist.id}>
													<div className={`flow-root p-3 hover:bg-blue-600 cursor-pointer ${isSelected(playlist) ? "bg-blue-600" : "hover:text-blue-200"}`}
														onClick={() => selectPlaylist(playlist)}>
														<span className="float-left truncate text-base">
															{playlist.name}&nbsp; {/* Hacky way to give an otherwise empty p tag some line height */}
														</span>
														<span className="float-right">
															Songs: {playlist.tracks.total}
														</span>
													</div>
												</li>
											))}
										</ul>
									</div>
									{/* Page buttons */}
									<div className="flex justify-end">
										<div className="flex bg-gray-900 rounded-lg shadow-lg">
											{/* Left arrow */}
											<div className={"w-10 ".concat(isPrevPage() ? "hover:bg-blue-600 hover:text-blue-200" : "bg-gray-600")}>
												<button className="p-1" onClick={() => setPage(page - 1)} disabled={!isPrevPage()}>
													<ChevronLeftIcon className="w-full h-full" />
												</button>
											</div>
											{/* Page number */}
											<div className="px-3 flex items-center justify-center">
												<p>{page + 1}</p>
											</div>
											{/* Right arrow */}
											<div className={"w-10 ".concat(isNextPage() ? "hover:bg-blue-600 hover:text-blue-200" : "bg-gray-600")}>
												<button className="p-1" onClick={() => setPage(page + 1)} disabled={!isNextPage()}>
													<ChevronRightIcon className="w-full h-full" />
												</button>
											</div>
									</div>
									</div>

								</div>

								{/*footer*/}
								<div className="flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
									<p className="flex-1 justify-start float-left">Songs to add: {mergedSet.size}</p>

									<span className="flex-1 flex-grow justify-center py-2 mb-1 mr-5 truncate">
										{selectedPlaylist?.name ? selectedPlaylist?.name : "Select a playlist"}
									</span>

									<div className="flex items-center  pb-1 flex-1 justify-end">
										<span>
											<input name="ignoreDuplicates"
												type="checkbox"
												checked={ignoreDuplicatesChecked}
												className="mr-2"
												onChange={() => setignoreDuplicatesChecked(!ignoreDuplicatesChecked)} />
											Don&apos;t add duplicate songs
										</span>

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
