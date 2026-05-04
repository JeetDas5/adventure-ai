import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingStatus from "./loading-status";
import StoryGame from "./story-game";

const API_BASE_URL = "/api";

function StoryLoader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStory = async (storyId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/stories/${storyId}/complete`,
      );
      console.log("Story data loaded:", response.data);
      setStory(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Story not found.");
      } else {
        setError("Failed to load story.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStory(id);
  }, [id]);

  const createNewStory = () => {
    navigate("/");
  };

  if (loading) {
    return <LoadingStatus message="Loading story..." />;
  }

  if (error) {
    return (
      <div className="story-loader">
        <div className="error-message">
          <h2>Story Not Found</h2>
          <p>{error}</p>
          <button onClick={createNewStory}>Go to Story Generator</button>
        </div>
      </div>
    );
  }

  if (story) {
    return (
      <div className="story-loader">
        <StoryGame story={story} onNewStory={createNewStory} />
      </div>
    );
  }
}

export default StoryLoader;
