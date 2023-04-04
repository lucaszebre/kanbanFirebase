export async function fetchFirstBoardId(): Promise<string | null> {
    try {
        const response = await fetch('/api/getfirstId');
        
        if (response.ok) {
            const data = await response.json();
            
            return data;
        } else {
            console.error('Error fetching the first board ID:', response.statusText);
            return null;
        }
        } catch (error) {
        console.error('Error fetching the first board ID:', error);
        return null;
        }
    }
