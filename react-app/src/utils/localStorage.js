const localStorageFunctions = {
    setLocalStorage: savedLocations => {
        const locations = {
            locations: savedLocations
        };
        localStorage.setItem('userLocations', JSON.stringify(locations));
    },
    getLocalStorage: () => {
        if (JSON.parse(localStorage.getItem('userLocations')) !== null) {
            return JSON.parse(localStorage.getItem('userLocations')).locations;
        };
    },
    deleteLocalStorage: key => {
        localStorage.removeItem(key);
    },
};

export default localStorageFunctions;