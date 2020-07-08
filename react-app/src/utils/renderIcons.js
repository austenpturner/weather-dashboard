// Function to render weather condition icons from Font Awesome Icons

const renderConditionIcon = description => {
    let iconClass = '';
    switch (description) {
        case 'Clouds':
        case 'Fog':
        case 'Squall':
        case 'Tornado':
            return iconClass = 'fas fa-cloud fa-3x';
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            return iconClass = 'fas fa-cloud-rain fa-3x';
        case 'Snow':
            return iconClass = 'far fa-snowflake fa-3x';
        case 'Thunderstorm':
            return iconClass = 'fas fa-bolt fa-3x';
        case 'Clear':
            return iconClass = 'fas fa-sun fa-3x';
        case 'Smoke':
        case 'Haze':
        case 'Ash':
        case 'Dust':
        case 'Sand':
            return iconClass = 'fas fa-smog fa-3x';
    }
};

export default renderConditionIcon;

