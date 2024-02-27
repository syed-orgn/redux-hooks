// Add this code as a separate script file (e.g., calculate-relative-time.js)
function calculateRelativeTime(releaseTime) {
    const now = new Date();
    const diffMs = now - releaseTime;
    const minutes = Math.round(diffMs / (1000 * 60));
  
    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (minutes < 120) {
      return "1 hour ago";
    } else {
      // Handle other time ranges as needed
      return `${Math.floor(minutes / 60)} hours ago`;
    }
  }
  