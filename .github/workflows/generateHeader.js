function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;

    // Convert milliseconds to minutes
    const diffMins = Math.round(diffMs / (1000 * 60));

    if (diffMins === 0) {
        return 'just now';
    } else if (diffMins === 1) {
        return '1 min ago';
    } else {
        return diffMins + ' mins ago';
    }
}

const timestamp = new Date();

module.exports = ` released this ${formatTimeAgo(timestamp)}`;
