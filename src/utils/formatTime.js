export function formatTime(timestamp){
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  }
  
  