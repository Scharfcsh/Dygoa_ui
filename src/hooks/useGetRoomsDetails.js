


export default async function RoomDetails() {
    try {
        const response = await fetch("http://localhost:3000/api/rooms/details");
        if (!response) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}