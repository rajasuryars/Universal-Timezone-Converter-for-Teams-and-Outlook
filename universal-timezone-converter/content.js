(function() {
    // Regex to capture time with optional minutes and a timezone abbreviation.
    // It matches formats like "11 PM IST", "11:00 PM IST", "11:00 pm ist", etc.
    const timeRegex = /\b(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*([A-Za-z]{2,4})\b/i;

    // Mapping of timezone abbreviations to UTC offsets (in hours, fractional allowed)
    const timezoneOffsets = {
        'IST': 5.5,  // Indian Standard Time (UTC+5:30)
        'EST': -5,   // Eastern Standard Time (UTC-5)
        'EDT': -4,   // Eastern Daylight Time (UTC-4)
        'CST': -6,   // Central Standard Time (UTC-6)
        'CDT': -5,   // Central Daylight Time (UTC-5)
        'MST': -7,   // Mountain Standard Time (UTC-7)
        'MDT': -6,   // Mountain Daylight Time (UTC-6)
        'PST': -8,   // Pacific Standard Time (UTC-8)
        'PDT': -7    // Pacific Daylight Time (UTC-7)
        // Add additional time zones if needed.
    };

    // Set the target timezone here. Users can change this value to any supported timezone.
    const targetTz = "CDT"; // Change this value to your desired target timezone.
    
    // Get the target timezone offset from the mapping.
    const targetOffset = timezoneOffsets[targetTz];

    // Create a tooltip element for displaying the conversion.
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = 10000;
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    // Function to convert the detected time string from its source timezone to the target timezone.
    function convertTime(timeString) {
        const match = timeRegex.exec(timeString);
        if (!match) {
            return null;
        }
        let hour = parseInt(match[1], 10);
        let minute = match[2] ? parseInt(match[2], 10) : 0;
        let period = match[3].toUpperCase();
        let srcTz = match[4].toUpperCase();

        // Convert 12-hour time to 24-hour time.
        if (period === "AM") {
            if (hour === 12) {
                hour = 0;
            }
        } else if (period === "PM") {
            if (hour !== 12) {
                hour += 12;
            }
        }

        // Ensure the source timezone is recognized.
        if (!(srcTz in timezoneOffsets)) {
            return null;
        }

        // Calculate total minutes from midnight for the input time.
        let inputMinutes = hour * 60 + minute;

        // Convert offsets to minutes.
        let sourceOffsetMinutes = timezoneOffsets[srcTz] * 60;
        let targetOffsetMinutes = targetOffset * 60;

        // Convert the input time to UTC minutes:
        // UTC time = local time - (source timezone offset)
        let utcMinutes = inputMinutes - sourceOffsetMinutes;

        // Convert UTC minutes to the target time:
        // Target time = UTC time + (target timezone offset)
        let targetMinutes = utcMinutes + targetOffsetMinutes;

        // Normalize the minutes to be within the range of 0 to 1440 (a full day).
        targetMinutes = ((targetMinutes % 1440) + 1440) % 1440;

        let targetHour = Math.floor(targetMinutes / 60);
        let targetMinute = targetMinutes % 60;

        // Convert from 24-hour to 12-hour format for display.
        let targetPeriod = targetHour >= 12 ? "PM" : "AM";
        let hour12 = targetHour % 12;
        if (hour12 === 0) {
            hour12 = 12;
        }
        let minuteStr = targetMinute < 10 ? "0" + targetMinute : targetMinute;

        return `${hour12}:${minuteStr} ${targetPeriod} ${targetTz}`;
    }

    // When hovering, check if the element's text contains a time string.
    function handleMouseOver(event) {
        const targetElem = event.target;
        if (targetElem.nodeType !== Node.ELEMENT_NODE) return;
        const text = targetElem.innerText;
        if (!text) return;

        // Search for a time string in the element’s text.
        const match = timeRegex.exec(text);
        if (match) {
            const fullMatch = match[0];
            const convertedTime = convertTime(fullMatch);
            if (convertedTime) {
                tooltip.innerText = `${fullMatch} converts to ${convertedTime}`;
                // Position the tooltip near the cursor.
                tooltip.style.left = event.pageX + 'px';
                tooltip.style.top = event.pageY + 'px';
                tooltip.style.display = 'block';
            }
        }
    }

    // Hide the tooltip when the mouse leaves the element.
    function handleMouseOut() {
        tooltip.style.display = 'none';
    }

    // Attach event listeners to handle hover events.
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
})();
