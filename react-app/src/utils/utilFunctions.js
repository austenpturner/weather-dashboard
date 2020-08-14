const calculateTime = (unixSunrise) => {
    // Create a new JavaScript Date object based on the timestamp
    let unix_timestamp = unixSunrise;
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // return date.getHours() + ":" + ("0" + date.getMinutes()).substr(-2) + ":" + ("0" + date.getMinutes());
};

const getDecimal = unixNum => {
//   const regex = /:/gi; 
//   const time = calculateTime(unixNum);
//   const decimal = time.replace(regex, ".");
//   return parseFloat(decimal);
  return parseFloat(calculateTime(unixNum).replace(/:/gi, "."));
};

const utilFunctions = {
    getDecimal: getDecimal,
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
            if (i === locationWords.length - 1 && locationWords[i].length === 2) {
                capLocation += ` ${locationWords[i].toUpperCase()}`;
                break;
            }
            const splitWord = locationWords[i].split('');
            const capfirst = splitWord[0].toUpperCase();
            splitWord.shift([0]); 
            splitWord.unshift(capfirst);
            i === 0 ? capLocation += splitWord.join('') : capLocation += ` ${splitWord.join('')}`;
        };
        return capLocation;
    },
    convertToFahrenheit: temp => {
        return Math.floor((temp  - 273.15) * 1.8 + 32);
    },
    convertToMPH: windSpeed => {
        return Math.floor(windSpeed * 2.237);
    }
};

export default utilFunctions;