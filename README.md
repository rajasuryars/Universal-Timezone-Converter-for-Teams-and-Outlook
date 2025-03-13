# Universal Timezone Converter for Teams and Outlook

A lightweight Chrome extension that detects time strings in Microsoft Teams and Outlook web applications (e.g., "11 PM IST", "11:00 PM IST", etc.) and converts them from their source timezone to a target timezone of your choice.

## Features

- **Customizable Conversion:**  
  Convert time strings from any recognized source timezone (e.g., IST, EST, PST) to a target timezone of your choice. By default, the extension is set up to convert to CDT, but you can easily modify this in the code.

- **On-Demand Tooltip:**  
  When you hover over a time string in Microsoft Teams or Outlook, a tooltip appears near the cursor showing the converted time.

- **Multi-Platform Support:**  
  Works seamlessly on both Microsoft Teams and Outlook web applications.

## Installation

### Prerequisites
- **Google Chrome:** This extension is built for Chrome.
- **Microsoft Teams & Outlook Web:** The extension works on [Microsoft Teams](https://teams.microsoft.com/) and [Outlook Web](https://outlook.office.com/).

### Steps
1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/universal-timezone-converter.git
    ```

2. **Load the Extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top right).
   - Click "Load unpacked" and select the folder where you cloned the repository.

3. **Start Using It:**
   - Navigate to Microsoft Teams or Outlook Web.
   - Hover over any time string (e.g., "11 PM IST" or "11:00 pm ist") in the chat or email.
   - The tooltip will display the conversion from the source timezone to your target timezone.

## Configuration

The extension uses a predefined set of timezone abbreviations and their UTC offsets in the `content.js` file. To change the target timezone:

1. Open `content.js`.
2. Locate the variable defining the target timezone (default is `"CDT"`):
    ```js
    const targetTz = "CDT";
    ```
3. Change `"CDT"` to any supported timezone (e.g., `"EST"`, `"PST"`, etc.).
4. The conversion will then adjust accordingly using the corresponding UTC offset.

*Note:* You can extend the `timezoneOffsets` mapping with additional timezones as needed.

## Usage

Once installed and configured, simply log into Microsoft Teams or Outlook Web. Hover over any time string that follows the supported formats, and a tooltip will appear near your cursor showing the conversion from the original timezone to your specified target timezone.

## Contributing

Contributions are welcome! If you have any ideas, improvements, or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the developers behind Microsoft Teams and Outlook for providing robust web-based communication platforms.
- Inspired by various time zone conversion tools and browser extensions available online.
