# Property Detail Page Creation Guide

This guide explains how to create property detail pages for your properties using the template system.

## Files Created

1. **`property-detail-template.html`** - The template file with placeholder text
2. **`modern-downtown-apartment.html`** - Example property detail page
3. **Updated `styles.css`** - Added all necessary styles for property detail pages
4. **Updated `properties.html`** - Made property names clickable

## How to Create a New Property Detail Page

### Step 1: Copy the Template
1. Copy `property-detail-template.html`
2. Rename it to match your property (e.g., `suburban-family-home.html`)

### Step 2: Replace Placeholder Text
Replace all placeholder text with actual property information:

#### Basic Information
- `PROPERTY_NAME` → "Suburban Family Home"
- `PROPERTY_LOCATION` → "Suburban Heights"
- `PROPERTY_STATUS` → "Available" or "Leased"
- `PROPERTY_STATUS_CLASS` → "available" or "leased"

#### Property Details
- `PROPERTY_BEDROOMS` → "4"
- `PROPERTY_BATHROOMS` → "3"
- `PROPERTY_SQFT` → "2,800"
- `PROPERTY_AVAILABILITY` → "Immediate" or specific date

#### Images
- `PROPERTY_MAIN_IMAGE` → Path to main property image
- `PROPERTY_IMAGE_1` → Path to first gallery image
- `PROPERTY_IMAGE_2` → Path to second gallery image
- `PROPERTY_IMAGE_3` → Path to third gallery image
- `PROPERTY_IMAGE_4` → Path to fourth gallery image

#### Content
- `PROPERTY_DESCRIPTION` → Detailed property description
- `PROPERTY_HIGHLIGHT_1` → First highlight point
- `PROPERTY_HIGHLIGHT_2` → Second highlight point
- `PROPERTY_HIGHLIGHT_3` → Third highlight point
- `PROPERTY_HIGHLIGHT_4` → Fourth highlight point

#### Features
- `PROPERTY_FEATURE_1` → First interior feature
- `PROPERTY_FEATURE_2` → Second interior feature
- `PROPERTY_FEATURE_3` → Third interior feature
- `PROPERTY_FEATURE_4` → First building feature
- `PROPERTY_FEATURE_5` → Second building feature
- `PROPERTY_FEATURE_6` → Third building feature
- `PROPERTY_FEATURE_7` → First location feature
- `PROPERTY_FEATURE_8` → Second location feature
- `PROPERTY_FEATURE_9` → Third location feature

#### Location Information
- `PROPERTY_LOCATION_DESCRIPTION` → Detailed location description
- `PROPERTY_ADDRESS` → Full property address
- `PROPERTY_MAP_EMBED_URL` → Google Maps embed URL

#### Similar Properties
- `PROPERTY_SIMILAR_1_IMAGE` → Image for first similar property
- `PROPERTY_SIMILAR_1_NAME` → Name of first similar property
- `PROPERTY_SIMILAR_1_LOCATION` → Location of first similar property
- `PROPERTY_SIMILAR_1_LINK` → Link to first similar property page
- `PROPERTY_SIMILAR_2_IMAGE` → Image for second similar property
- `PROPERTY_SIMILAR_2_NAME` → Name of second similar property
- `PROPERTY_SIMILAR_2_LOCATION` → Location of second similar property
- `PROPERTY_SIMILAR_2_LINK` → Link to second similar property page

### Step 3: Update JavaScript
Update the `propertyImages` array in the JavaScript section to match your actual image paths:

```javascript
const propertyImages = [
    'images/your-image-1.jpg',
    'images/your-image-2.jpg',
    'images/your-image-3.jpg',
    'images/your-image-4.jpg'
];
```

### Step 4: Update Properties.html
Add a link to your new property detail page in `properties.html`:

```html
<h3><a href="your-property-name.html" class="property-title-link">Your Property Name</a></h3>
```

## Example: Suburban Family Home

Here's what you would replace for the Suburban Family Home:

- `PROPERTY_NAME` → "Suburban Family Home"
- `PROPERTY_LOCATION` → "Suburban Heights"
- `PROPERTY_STATUS` → "Leased"
- `PROPERTY_STATUS_CLASS` → "leased"
- `PROPERTY_BEDROOMS` → "4"
- `PROPERTY_BATHROOMS` → "3"
- `PROPERTY_SQFT` → "2,800"
- `PROPERTY_AVAILABILITY` → "Currently Leased"
- `PROPERTY_DESCRIPTION` → "Spacious family home with large backyard, updated kitchen, and excellent school district. Ideal for growing families seeking suburban comfort."

## Features of the Property Detail Page

1. **Responsive Design** - Works on all device sizes
2. **Image Gallery** - Main image with thumbnail navigation
3. **Property Information** - Detailed descriptions and features
4. **Contact Section** - Easy ways to get in touch
5. **Map Integration** - Google Maps with property location
6. **Similar Properties** - Cross-linking to other properties
7. **Call-to-Action** - Clear next steps for interested users

## Tips for Success

1. **Use High-Quality Images** - Property photos should be clear and well-lit
2. **Write Compelling Descriptions** - Focus on benefits and lifestyle
3. **Keep Information Current** - Update availability and status regularly
4. **Use Consistent Naming** - Follow the same pattern for all files
5. **Test Links** - Ensure all internal links work correctly

## File Structure

```
your-website/
├── properties.html
├── modern-downtown-apartment.html
├── suburban-family-home.html (create this)
├── retail-space-main-street.html (create this)
├── industrial-warehouse.html (create this)
├── property-detail-template.html
├── styles.css
└── images/
    ├── lifestyle-apartments.jpg
    ├── lifestyle-apartments2.jpg
    └── lifestyle-apartments3.jpg
```

This system makes it easy to create professional property detail pages that maintain consistency across your website while providing comprehensive information for potential tenants.
