const calculateTime = (unixSunrise) => {
    // Create a new JavaScript Date object based on the timestamp
    let unix_timestamp = unixSunrise;
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
};

const getDecimal = unixNum => {
  const regex = /:/gi; 
  const time = calculateTime(unixNum);
  const decimal = time.replace(regex, ".");
  return parseFloat(decimal);
};

const utilFunctions = {
    getDecimal: unixNum => {
        const regex = /:/gi; 
        const time = calculateTime(unixNum);
        const decimal = time.replace(regex, ".");
        return parseFloat(decimal);
    },
    getTime: hour => {
        const time = getDecimal(hour);
        if (time > 12) {
            return time - 12 + "pm";
        } else if (time === 0 ) {
            return 12 + "am";
        } else {
            return time + "am";
        }
    },
    capLocation: location => {
        const locationWords = location.toLowerCase().split(' ');
        let capLocation = '';
        for (let i = 0; i < locationWords.length; i++) {
            if (i === 1 && locationWords[i].length === 2) {
                const state = locationWords[i].toUpperCase();
                capLocation += ` ${state}`;
                break;
            }
            const splitWord = locationWords[i].split('');
            const capfirst = splitWord[0].toUpperCase();
            splitWord.shift([0]); 
            splitWord.unshift(capfirst);
            const capWord = splitWord.join(''); 
            if (i === 0) {
                capLocation += capWord;
            } else {
                capLocation += ` ${capWord}`;
            }
        }
        return capLocation;
    },
    convertToFahrenheit: temp => {
        const tempF = Math.floor((temp  - 273.15) * 1.8 + 32);
        return tempF;
    },
    convertToMPH: windSpeed => {
        const windSpeedMPH = Math.floor(windSpeed * 2.237);
        return windSpeedMPH;
    }
};

export default utilFunctions;