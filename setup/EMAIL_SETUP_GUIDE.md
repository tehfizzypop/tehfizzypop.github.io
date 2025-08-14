# Email Setup Guide for Contact Form

## Overview
Your contact form is now configured to work with Formspree, which is the easiest solution for static HTML sites. This guide will walk you through the setup process.

## Option 1: Formspree (Recommended - Easiest)

### Step 1: Sign Up for Formspree
1. Go to [formspree.io](https://formspree.io)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Create a New Form
1. After logging in, click "New Form"
2. Give your form a name (e.g., "Reis Property Partners Contact")
3. Choose "Contact Form" as the form type
4. Click "Create Form"

### Step 3: Get Your Form ID
1. Once created, you'll see a form endpoint URL
2. Copy the form ID from the URL (it looks like: `xqkzqkzq`)
3. Replace `YOUR_FORM_ID` in your `contact.html` file with this ID

### Step 4: Configure Email Settings
1. In your Formspree dashboard, go to "Settings" → "Email"
2. Set the "To" email to your business email (e.g., `ContactUs@reispropertypartners.com`)
3. Customize the email subject line if desired
4. Save your settings

### Step 5: Test Your Form
1. Deploy your site
2. Fill out and submit the contact form
3. Check your email to confirm you receive the message

## Option 2: Netlify Forms (If using Netlify hosting)

If you're hosting on Netlify, you can use their built-in form handling:

### Step 1: Update Form HTML
```html
<form name="contact" method="POST" data-netlify="true">
    <!-- Add this hidden input -->
    <input type="hidden" name="form-name" value="contact" />
    
    <!-- Your existing form fields -->
</form>
```

### Step 2: Configure in Netlify Dashboard
1. Go to your site's dashboard in Netlify
2. Navigate to "Forms" tab
3. Configure email notifications
4. Set up spam filtering if needed

## Option 3: Custom Backend (Advanced)

If you need more control, you can create a custom backend:

### Using Node.js/Express
```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.post('/contact', async (req, res) => {
    // Configure email transport
    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password'
        }
    });
    
    // Send email
    await transporter.sendMail({
        from: req.body.email,
        to: 'ContactUs@reispropertypartners.com',
        subject: `Contact Form: ${req.body.subject}`,
        text: req.body.message
    });
    
    res.json({ success: true });
});
```

### Using PHP
```php
<?php
if ($_POST) {
    $to = "ContactUs@reispropertypartners.com";
    $subject = "Contact Form: " . $_POST['subject'];
    $message = "Name: " . $_POST['name'] . "\n";
    $message .= "Email: " . $_POST['email'] . "\n";
    $message .= "Phone: " . $_POST['phone'] . "\n";
    $message .= "Message: " . $_POST['message'];
    
    $headers = "From: " . $_POST['email'];
    
    mail($to, $subject, $message, $headers);
    
    echo "Message sent successfully!";
}
?>
```

## Option 4: EmailJS (Client-side solution)

For a completely client-side solution:

### Step 1: Sign up at emailjs.com
### Step 2: Add EmailJS to your HTML
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

### Step 3: Update JavaScript
```javascript
// Initialize EmailJS
emailjs.init("YOUR_USER_ID");

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        subject: this.subject.value,
        message: this.message.value
    }).then(
        function(response) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        },
        function(error) {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    );
});
```

## Security Considerations

### Spam Protection
- Formspree includes built-in spam filtering
- Consider adding reCAPTCHA for additional protection
- Implement rate limiting if using custom backend

### Data Validation
- Always validate data on both client and server side
- Sanitize inputs to prevent XSS attacks
- Use HTTPS for all form submissions

## Testing Your Setup

### Before Deployment
1. Test locally with a service like ngrok
2. Verify all form fields are being captured
3. Check email formatting and delivery

### After Deployment
1. Test the live form
2. Verify emails are received
3. Check spam folders
4. Test with different email providers

## Troubleshooting

### Common Issues
- **Emails not received**: Check spam folder, verify email settings
- **Form not submitting**: Check browser console for errors
- **Missing form data**: Verify field names match between HTML and backend

### Support Resources
- Formspree: [help.formspree.io](https://help.formspree.io)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- EmailJS: [emailjs.com/docs](https://emailjs.com/docs)

## Recommendation

For your use case, **Formspree** is the best option because:
- ✅ No backend setup required
- ✅ Free tier available
- ✅ Built-in spam protection
- ✅ Easy to configure
- ✅ Reliable delivery
- ✅ Professional appearance

Start with Formspree and upgrade to a paid plan if you need more features or higher volume.
