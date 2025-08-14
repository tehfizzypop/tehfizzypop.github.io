# Interactive Map Setup Guide

## Current Status
Your contact page now has a functional interactive map section with:
- ✅ Google Maps embed placeholder
- ✅ Office address information (7300 147th Street West, Suite 303, Apple Valley, MN 55124)
- ✅ Get Directions button (links to Google Maps)
- ✅ Call Us button (links to your phone number)
- ✅ Responsive design for all devices
- ✅ Professional styling that matches your site

## Next Step: Get the Exact Google Maps Embed URL

### Option 1: Use Google Maps Embed API (Recommended)

1. **Go to Google Maps:**
   - Visit [maps.google.com](https://maps.google.com)
   - Search for: "7300 147th Street West, Suite 303, Apple Valley, MN 55124"

2. **Get the Embed Code:**
   - Click on the location marker
   - Click "Share" button
   - Select "Embed a map" tab
   - Choose your desired size (recommend: 600x450)
   - Copy the iframe code

3. **Replace the Current Map:**
   - Replace the current iframe src in your `contact.html` file
   - The new URL will look like: `https://www.google.com/maps/embed?pb=...`

### Option 2: Manual Coordinate Setup

If you want to set the exact coordinates manually:

1. **Find Coordinates:**
   - Right-click on your office location in Google Maps
   - Select the coordinates that appear
   - Copy the latitude and longitude

2. **Create Embed URL:**
   - Format: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d[ZOOM]!2d[LONGITUDE]!3d[LATITUDE]!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z[ZOOM_LEVEL]!5e0!3m2!1sen!2sus!4v[TIMESTAMP]`

## Current Map Features

### What's Already Working:
- **Responsive Design:** Adapts to all screen sizes
- **Professional Styling:** Matches your site's design theme
- **Interactive Elements:** Clickable buttons for directions and calls
- **Accessibility:** Proper titles and alt text
- **Performance:** Lazy loading for better page speed

### Map Information Panel:
- Office name and address
- Get Directions button (opens Google Maps in new tab)
- Call Us button (initiates phone call on mobile)
- Professional styling with icons

## Customization Options

### Change Map Style:
You can customize the map appearance by adding parameters to the embed URL:

- **Map Type:** `&maptype=roadmap` (default), `&maptype=satellite`, `&maptype=hybrid`
- **Zoom Level:** Adjust the zoom parameter in the URL
- **Map Controls:** Add `&zoom=15` for specific zoom level

### Example Customized URL:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.1234567890123!2d-93.2177!3d44.7319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQzJzU0LjgiTiA5M8KwMTMnMDMuNyJX!5e0!3m2!1sen!2sus!4v1234567890123&maptype=roadmap&zoom=15
```

## Testing Your Map

### Before Deployment:
1. Test locally to ensure the map loads
2. Verify all buttons work correctly
3. Check responsive behavior on different screen sizes

### After Deployment:
1. Test the live map functionality
2. Verify the Get Directions button opens Google Maps
3. Test the Call Us button on mobile devices
4. Check that the map is accessible and loads properly

## Troubleshooting

### Common Issues:
- **Map Not Loading:** Check if the embed URL is valid
- **Buttons Not Working:** Verify the href attributes are correct
- **Responsive Issues:** Test on different devices and screen sizes

### Performance Tips:
- The map uses lazy loading for better performance
- Consider adding a loading placeholder for slower connections
- The iframe is optimized for mobile and desktop viewing

## Final Steps

1. **Get the exact embed URL** from Google Maps
2. **Replace the placeholder URL** in your contact.html
3. **Test the functionality** locally
4. **Deploy and test** on your live site

## Support Resources

- **Google Maps Help:** [support.google.com/maps](https://support.google.com/maps)
- **Google Maps Embed API:** [developers.google.com/maps/documentation/embed](https://developers.google.com/maps/documentation/embed)
- **Responsive Design Testing:** Use browser dev tools to test different screen sizes

Your map section is now fully functional and ready to go live once you get the exact Google Maps embed URL!
