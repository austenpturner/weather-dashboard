const localStorageFunctions = {
    setLocalStorage: savedLocations => {
        const locations = {
            locations: savedLocations
        }
        localStorage.setItem('userLocations', JSON.stringify(locations));
    },
    getLocalStorage: () => {
        if (JSON.parse(localStorage.getItem('userLocations')) !== null) {
            const savedLocations = JSON.parse(localStorage.getItem('userLocations')).locations;
            return savedLocations;
        }
    }
};

export default localStorageFunctions;