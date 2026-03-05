# 🗑️ Files to DELETE from Online Server

## ⚠️ CRITICAL: Delete These Immediately

These files should **NEVER** be on your live server - they contain credentials and are security risks!

### PowerShell Scripts (DELETE ALL):
- ❌ `test-ftp.ps1`
- ❌ `upload-evenings.ps1`
- ❌ `upload-ftp.ps1`
- ❌ `upload-single-file.ps1`
- ❌ `upload-to-hostinger.ps1`
- ❌ `direct-upload.ps1`
- ❌ `deploy-to-hostinger.ps1`
- ❌ `hostinger-config.ps1`
- ❌ `apply-footer-component.ps1`
- ❌ `apply-nav-component.ps1`
- ❌ `fix-nav-component.ps1`
- ❌ Any other `*.ps1` files

### Batch Scripts (DELETE ALL):
- ❌ `quick-upload.bat`
- ❌ `deploy.bat`
- ❌ Any other `*.bat` files

### Documentation Files (Not needed on server):
- ❌ `SECURITY_CLEANUP_REPORT.md`
- ❌ `URGENT_ACTIONS.md`
- ❌ `SAFE_UPLOAD_CHECKLIST.md`
- ❌ `FOLDER_STRUCTURE_EXPLANATION.md`
- ❌ `WHAT_TO_UPLOAD.md`
- ❌ `DELETE_FROM_SERVER.md` (this file)
- ❌ Any other `*.md` files

### Other Files to Delete:
- ❌ `.gitignore` - Not needed on server
- ❌ `home.txt` - Old file, replaced by index.html
- ❌ `bunvis.txt` - Backup/archive file
- ❌ `ftp-test.txt` - Test file
- ❌ `default.php` - Hostinger default (not needed)
- ❌ `nav.php`, `any-page.php` - PHP templates (not used)
- ❌ `public_html/` folder - Archive folder (if uploaded)

---

## ✅ How to Delete from Server:

### Method 1: Hostinger File Manager (Easiest)
1. Log into Hostinger Control Panel
2. Go to **File Manager**
3. Navigate to your website root (`public_html`)
4. Find the `.ps1` and `.bat` files
5. Select them and click **Delete**
6. Confirm deletion

### Method 2: FTP
1. Connect via FTP (with NEW password)
2. Navigate to `public_html`
3. Find and delete all `.ps1` and `.bat` files
4. Delete documentation `.md` files

---

## 🔒 Why Delete These?

1. **Security Risk**: Scripts contain FTP passwords
2. **Not Needed**: Website doesn't use them
3. **Public Access**: Anyone can download them if uploaded
4. **Best Practice**: Only upload website files, not tools

---

## ✅ What SHOULD Be on Server:

- ✅ HTML files (`.html`)
- ✅ CSS files (`.css`) in `css/` folder
- ✅ JavaScript files (`.js`) in `js/` folder
- ✅ Images in `images/` folder
- ✅ `includes/` folder
- ✅ `events/` folder
- ✅ `fonts/` folder
- ✅ `robots.txt`
- ✅ `sitemap.xml`

**Rule of thumb:** If it's not needed for the website to display/function, don't upload it!

---

## 📋 Quick Checklist:

- [ ] Deleted all `.ps1` files from server
- [ ] Deleted all `.bat` files from server
- [ ] Deleted all `.md` documentation files
- [ ] Deleted `home.txt`, `bunvis.txt`, `ftp-test.txt`
- [ ] Deleted `default.php`, `nav.php`, `any-page.php`
- [ ] Verified only website files remain

---

**Remember:** These scripts are tools for YOUR computer, not for the website server!
