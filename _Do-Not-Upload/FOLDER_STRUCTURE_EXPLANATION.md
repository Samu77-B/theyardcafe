# Website Folder Structure Explanation

## 📁 Main Website Directory (Root)
This is your **active website** - upload everything here to your server's `public_html` folder.

### Key Files:
- ✅ **`index.html`** - Homepage (just created from home.txt)
- ✅ `evenings.html` - Evening events page
- ✅ `menu.html` - Menu page
- ✅ `about.html` - About page
- ✅ `contact.html` - Contact page
- ✅ All other `.html` pages

### Important Folders:
- `css/` - Stylesheets
- `js/` - JavaScript files
- `images/` - Images
- `includes/` - Navigation and footer components
- `events/` - Event images and files

---

## 📁 public_html Folder
**This is an ARCHIVE/BACKUP folder** - DO NOT upload this to your server!

### What it contains:
- Old/archived files
- Backup copies of some pages
- Unused assets in `archive/` subfolder
- Duplicate files

### Why it exists:
This appears to be a backup or staging folder. It's safe to keep locally but:
- ❌ **Don't upload it to your live server**
- ❌ **Don't use files from here** (use from root directory instead)
- ✅ **Safe to delete** if you want to clean up

---

## 🔧 What I Fixed:

1. ✅ Created `index.html` from `home.txt` (your homepage)
2. ✅ Updated navigation to link to `index.html` instead of `index.php`
3. ✅ Removed malicious `index.php` file

---

## 📤 What to Upload:

**Upload ONLY the root directory contents:**
- All `.html` files (including `index.html`)
- `css/` folder
- `js/` folder  
- `images/` folder
- `includes/` folder
- `events/` folder
- `fonts/` folder (if you use custom fonts)
- `robots.txt`
- `sitemap.xml`

**DO NOT upload:**
- ❌ `public_html/` folder (it's an archive)
- ❌ `.ps1` files (PowerShell scripts with credentials)
- ❌ `.bat` files (batch scripts)
- ❌ `SECURITY_CLEANUP_REPORT.md` (contains sensitive info)
- ❌ `URGENT_ACTIONS.md` (contains sensitive info)
- ❌ `.gitignore` (not needed on server)

---

## 🎯 Your Homepage:

**File:** `index.html` (in root directory)
- This is what visitors see when they go to your website
- Navigation links to this file
- Contains all your homepage content

---

## ❓ Why No index.php?

- The original `index.php` was **malicious malware** (backdoor)
- I deleted it for security
- Your site uses HTML files, not PHP
- `index.html` works perfectly for your website

---

## 📋 Quick Checklist:

- [x] `index.html` created (homepage)
- [x] Navigation updated to use `index.html`
- [x] Malicious files removed
- [ ] Ready to upload root directory contents to server
