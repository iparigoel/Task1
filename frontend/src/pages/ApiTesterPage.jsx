import { useState } from "react";
import { request } from "../api";
import OutputBox from "../components/OutputBox";

export default function ApiTesterPage() {
  const [songsOutput, setSongsOutput] = useState("Click to fetch songs.");
  const [songsError, setSongsError] = useState(false);
  const [addForm, setAddForm] = useState({ songName: "" });
  const [addOutput, setAddOutput] = useState("Add a song.");
  const [addError, setAddError] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    currentSongName: "",
    newSongName: "",
  });
  const [updateOutput, setUpdateOutput] = useState("Update a song by name.");
  const [updateError, setUpdateError] = useState(false);
  const [deleteForm, setDeleteForm] = useState({ songName: "" });
  const [deleteOutput, setDeleteOutput] = useState("Delete a song by name.");
  const [deleteError, setDeleteError] = useState(false);

  const normalizeSongName = (value) => value.trim().toLowerCase();

  const findSongByName = (songs, songName) => {
    const normalizedInput = normalizeSongName(songName);
    const matches = songs.filter(
      (song) => normalizeSongName(song.songName) === normalizedInput
    );

    if (matches.length === 0) {
      return { error: "No song found with this name." };
    }

    // If duplicates exist, use the first inserted row (lowest id).
    const selectedSong = [...matches].sort((a, b) => a.id - b.id)[0];
    return { song: selectedSong, totalMatches: matches.length };
  };

  const fetchSongs = async () => {
    try {
      const data = await request("/songs/", { method: "GET" });
      setSongsOutput(data);
      setSongsError(false);
    } catch (err) {
      setSongsOutput(err.message);
      setSongsError(true);
    }
  };

  const addSong = async () => {
    const songName = addForm.songName.trim();
    if (!songName) {
      setAddOutput("Song name is required.");
      setAddError(true);
      return;
    }

    try {
      const data = await request("/songs/add", {
        method: "POST",
        body: JSON.stringify({ songName }),
      });
      setAddOutput(data);
      setAddError(false);
    } catch (err) {
      setAddOutput(err.message);
      setAddError(true);
    }
  };

  const updateSong = async () => {
    const currentSongName = updateForm.currentSongName.trim();
    const newSongName = updateForm.newSongName.trim();

    if (!currentSongName || !newSongName) {
      setUpdateOutput("Current song name and new song name are required.");
      setUpdateError(true);
      return;
    }

    try {
      const songs = await request("/songs/", { method: "GET" });
      const { song, error, totalMatches } = findSongByName(songs, currentSongName);

      if (error) {
        setUpdateOutput(error);
        setUpdateError(true);
        return;
      }

      const data = await request(`/songs/update/${song.id}`, {
        method: "PUT",
        body: JSON.stringify({
          songName: newSongName,
        }),
      });
      setUpdateOutput({
        message:
          totalMatches > 1
            ? `Multiple matches found. Updated first match with id ${song.id}.`
            : `Song updated successfully with id ${song.id}.`,
        data,
      });
      setUpdateError(false);
    } catch (err) {
      setUpdateOutput(err.message);
      setUpdateError(true);
    }
  };

  const deleteSong = async () => {
    const songName = deleteForm.songName.trim();
    if (!songName) {
      setDeleteOutput("Song name is required.");
      setDeleteError(true);
      return;
    }

    try {
      const songs = await request("/songs/", { method: "GET" });
      const { song, error, totalMatches } = findSongByName(songs, songName);

      if (error) {
        setDeleteOutput(error);
        setDeleteError(true);
        return;
      }

      await request(`/songs/delete/${song.id}`, { method: "DELETE" });
      setDeleteOutput(
        totalMatches > 1
          ? `Multiple matches found. Deleted first match "${song.songName}" (id ${song.id}).`
          : `Song "${song.songName}" deleted (id ${song.id}).`
      );
      setDeleteError(false);
    } catch (err) {
      setDeleteOutput(err.message);
      setDeleteError(true);
    }
  };

  return (
    <>
      <div className="row two">
        <div className="card">
          <h2>List Songs</h2>
          <button onClick={fetchSongs}>GET /songs/</button>
          <OutputBox data={songsOutput} isError={songsError} />
        </div>

        <div className="card">
          <h2>Add Song</h2>
          <label>Song Name</label>
          <input
            value={addForm.songName}
            onChange={(e) => setAddForm({ ...addForm, songName: e.target.value })}
          />
          <button onClick={addSong}>POST /songs/add</button>
          <OutputBox data={addOutput} isError={addError} />
        </div>
      </div>

      <div className="row two">
        <div className="card">
          <h2>Update Song</h2>
          <label>Current Song Name</label>
          <input
            value={updateForm.currentSongName}
            onChange={(e) =>
              setUpdateForm({ ...updateForm, currentSongName: e.target.value })
            }
          />
          <label>New Song Name</label>
          <input
            value={updateForm.newSongName}
            onChange={(e) =>
              setUpdateForm({ ...updateForm, newSongName: e.target.value })
            }
          />
          <button onClick={updateSong}>PUT /songs/update/{"{id}"}</button>
          <OutputBox data={updateOutput} isError={updateError} />
        </div>

        <div className="card">
          <h2>Delete Song</h2>
          <label>Song Name</label>
          <input
            value={deleteForm.songName}
            onChange={(e) =>
              setDeleteForm({ ...deleteForm, songName: e.target.value })
            }
          />
          <button className="danger" onClick={deleteSong}>
            DELETE /songs/delete/{"{id}"}
          </button>
          <OutputBox data={deleteOutput} isError={deleteError} />
        </div>
      </div>
    </>
  );
}
