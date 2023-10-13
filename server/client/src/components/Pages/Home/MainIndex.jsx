// MainIndex.js
import Recommendations from './Recommendations'; // Import the Recommendations component
import '../../css/MainIndex.css'; // Import your CSS file

const MainIndex = () => {
    return (
        <div className="main-index"> {/* Apply the styles from MainIndex.css */}
            <h1>Main Index Page</h1>
            <div className="main-index-container"> {/* Apply styles for the container */}
                {/* Add your content here */}
                <Recommendations /> {/* Render the Recommendations component here */}
            </div>
        </div>
    );
};

export default MainIndex;
