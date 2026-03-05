# ✅ Safe Upload Checklist

## 🔒 BEFORE YOU UPLOAD - DO THESE FIRST!

### Step 1: Change FTP Passwords (MANDATORY)
**⚠️ DO NOT upload until passwords are changed!**

The FTP passwords in your scripts are compromised. You MUST change them first:

1. Log into **Hostinger Control Panel**
2. Go to **FTP Accounts**
3. Change password for: `u556329104.theyardcafe.co.uk`
4. Change password for: `u556329104.Craigo202` (if still active)
5. **Write down the new passwords** (you'll need them)

### Step 2: Delete Malicious Files from Live Server
Before uploading clean files, delete these from your live server:

1. Log into **Hostinger File Manager** (or use FTP with NEW password)
2. Navigate to your website root
3. **Delete these files if they exist:**
   - `public_html/xenon1337.php`
   - `index.php` (in root directory)
   - `public_html/index.php`
   - `cgi-bin/cache.php`
   - `public_html/trackback.php`

### Step 3: Update Upload Scripts
After changing passwords, update your upload scripts:

**Option A: Update scripts with new passwords**
- Edit `upload-ftp.ps1` - Replace old password with new one
- Edit `test-ftp.ps1` - Replace old password with new one

**Option B: Use Hostinger File Manager (SAFER)**
- Upload files directly through Hostinger control panel
- No need to use FTP scripts
- More secure - no credentials stored locally

---

## ✅ VERIFICATION - Your Local Site is Clean

✅ All malicious PHP files deleted
✅ No suspicious code patterns found
✅ Only legitimate PHP files remain:
   - `default.php` (Hostinger default - safe)
   - `nav.php` (navigation include - safe)
   - `any-page.php` (simple include - safe)
   - Archive files (unused - safe)

---

## 📤 SAFE UPLOAD PROCESS

### Method 1: Hostinger File Manager (RECOMMENDED)
1. Log into Hostinger Control Panel
2. Go to **File Manager**
3. Navigate to `public_html`
4. Upload your clean files
5. **Advantage:** No FTP credentials needed

### Method 2: FTP Upload (After Password Change)
1. Update `upload-ftp.ps1` with NEW FTP password
2. Run the upload script
3. Verify files uploaded correctly

### Method 3: Manual FTP (Using FileZilla or similar)
1. Use NEW FTP password
2. Connect to server
3. Upload files manually
4. **Advantage:** Full control over what you upload

---

## 🚨 IMPORTANT REMINDERS

1. **NEVER upload files with credentials** - The `.gitignore` I created will help prevent this
2. **Verify malicious files are deleted** from live server before uploading
3. **Use new FTP passwords** - Old ones are compromised
4. **Check file permissions** after upload:
   - PHP files: 644
   - Directories: 755
   - Never use 777

---

## ✅ POST-UPLOAD CHECKLIST

After uploading, verify:
- [ ] Website loads correctly
- [ ] No error messages
- [ ] Malicious files are NOT on server
- [ ] File permissions are correct
- [ ] Test all pages work

---

## 📋 Quick Summary

**BEFORE Upload:**
1. ✅ Change FTP passwords (MANDATORY)
2. ✅ Delete malicious files from live server
3. ✅ Update upload scripts with new passwords (or use File Manager)

**THEN Upload:**
- Your local site is clean and ready
- Use Hostinger File Manager (safest) or FTP with new password

**AFTER Upload:**
- Verify website works
- Check no malicious files exist
- Monitor for any issues

---

**Status:** ✅ Your local site is CLEAN and ready to upload
**Action Required:** Change FTP passwords FIRST, then upload
