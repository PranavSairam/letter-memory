# MemoryLetters - Digital Letter Scrapbook

A beautiful web application for writing and preserving heartfelt letters as digital memories. MemoryLetters provides a nostalgic, scrapbook-like experience with soft colors, handwriting fonts, and smooth animations.

## Features

- **Write Letters**: Create heartfelt letters with title, date, sender, recipient, and message
- **Digital Scrapbook**: View your letters in a beautiful, scrollable diary-like interface
- **Local Storage**: All letters are saved locally in your browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Nostalgic UI**: Soft colors, handwriting fonts, and scrapbook-like animations
- **Multiple Views**: Toggle between grid and list view for your letters
- **Modal Details**: Click on any letter to view it in full detail

## How to Use

1. **Open the App**: Simply open `index.html` in your web browser
2. **Write a Letter**: 
   - Click the "Write" tab
   - Fill in the letter title, date, sender, recipient, and your message
   - Click "Save Letter" to store it
3. **View Your Letters**:
   - Click the "Read" tab to see all your saved letters
   - Click on any letter card to view the full letter
   - Use the toggle button to switch between grid and list views
4. **Manage Letters**:
   - Use "Clear" to reset the form
   - Use "Clear All" to delete all letters (with confirmation)

## Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies required
- **Local Storage**: Data persists in your browser
- **Responsive**: Mobile-first design approach
- **Modern CSS**: Uses CSS Grid, Flexbox, and modern styling
- **Font Awesome Icons**: Beautiful icons throughout the interface

## File Structure

```
MemoryLetters/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Data Storage

All letters are stored in your browser's localStorage. This means:
- Letters persist between browser sessions
- Data is private and local to your device
- No internet connection required
- Data can be cleared by clearing browser data

## Customization

You can easily customize the app by:
- Modifying colors in `styles.css`
- Adding new fonts from Google Fonts
- Changing animations and transitions
- Adding new features in `script.js`

## Sample Data

To see the app in action with sample letters, uncomment the last line in `script.js`:
```javascript
addSampleLetters();
```

## License

This project is open source and available under the MIT License.

---

**Enjoy writing and preserving your heartfelt memories!** 💌 