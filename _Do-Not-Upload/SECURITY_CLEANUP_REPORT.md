# Security Cleanup Report - The Yard Cafe Website
**Date:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Status:** ✅ Malicious Files Removed | ⚠️ Security Issues Found

---

## 🚨 CRITICAL: Malicious Files Deleted

The following malicious PHP backdoor files have been **DELETED**:

1. ✅ `public_html/xenon1337.php` - Obfuscated backdoor shell
2. ✅ `index.php` (root) - Obfuscated backdoor with remote code execution
3. ✅ `public_html/index.php` - Duplicate malicious backdoor
4. ✅ `cgi-bin/cache.php` - Remote code execution backdoor
5. ✅ `public_html/trackback.php` - Suspicious scanner tool (removed)

**Total files removed:** 5 malicious files

---

## ⚠️ SECURITY ISSUES FOUND

### 1. FTP Credentials Exposed in Plain Text

**🚨 CRITICAL:** Multiple FTP credentials are stored in plain text:

**Account 1 (theyardcafe.co.uk):**
- File: `upload-ftp.ps1`
- Server: `77.37.34.3`
- Username: `u556329104.theyardcafe.co.uk`
- Password: `&u8MpMYwovi[Y6X` ⚠️ **EXPOSED - CHANGE IMMEDIATELY**

**Account 2 (Craigo202):**
- File: `test-ftp.ps1`
- Server: `77.37.34.3`
- Username: `u556329104.Craigo202`
- Password: `d3*AAiankCL5UMF;` ⚠️ **EXPOSED - CHANGE IMMEDIATELY**

**Other files with credentials:**
- `upload-evenings.ps1` - Contains placeholder for password
- `hostinger-config.ps1` - Contains FTP configuration template
- `upload-to-hostinger.ps1` - Contains FTP configuration
- `direct-upload.ps1` - Contains FTP configuration

### 2. Files with Potential Credentials

The following files may contain credentials or should be reviewed:
- `hostinger-config.ps1` - Contains FTP configuration template
- `upload-to-hostinger.ps1` - Contains FTP configuration
- `direct-upload.ps1` - Contains FTP configuration
- `deploy-to-hostinger.ps1` - May contain credentials

---

## ✅ IMMEDIATE ACTIONS REQUIRED

### Step 1: Change FTP Password (URGENT)
1. Log into your Hostinger hosting panel
2. Go to FTP Accounts section
3. **Change the FTP password immediately**
4. The old password `&u8MpMYwovi[Y6X` is compromised

### Step 2: Secure Credential Files
1. **Remove or secure** all PowerShell scripts containing FTP credentials
2. Move sensitive scripts to a secure location outside the web directory
3. Use environment variables or secure credential storage instead
4. Consider using `.gitignore` to prevent committing credentials

### Step 3: Change All Passwords
- [ ] FTP Password (URGENT - already exposed)
- [ ] Hosting Panel Password
- [ ] Database Password (if applicable)
- [ ] Email Account Passwords
- [ ] Any admin accounts

### Step 4: Review Server Access Logs
1. Check Hostinger access logs for unauthorized access
2. Look for suspicious IP addresses
3. Check for unusual file access patterns
4. Review FTP access logs

### Step 5: File Permissions Review
Ensure PHP files have proper permissions:
- PHP files should NOT be writable (644 or 755)
- Directories should be 755
- Never use 777 permissions

### Step 6: Scan Your Local Computer
The malware may have been uploaded from your computer:
- Run a full antivirus scan
- Check for keyloggers or trojans
- Review recent file modifications
- Check browser extensions for malware

### Step 7: Update All Software
- [ ] PHP version (if you control it)
- [ ] Any CMS or plugins
- [ ] Server software
- [ ] Operating system

---

## 📋 Files Safe to Keep

These PHP files appear legitimate:
- ✅ `default.php` - Hostinger default page
- ✅ `nav.php` - Navigation include
- ✅ `any-page.php` - Simple include
- ✅ Archive files in `public_html/archive/` - Safe

---

## 🔒 Security Best Practices Going Forward

1. **Never store credentials in plain text files**
2. **Use environment variables or secure credential storage**
3. **Keep all scripts with credentials outside web directories**
4. **Use `.gitignore` to prevent committing sensitive files**
5. **Regularly scan for malware**
6. **Keep software updated**
7. **Use strong, unique passwords**
8. **Enable two-factor authentication where possible**
9. **Regularly review file permissions**
10. **Monitor server access logs**

---

## 📞 Next Steps

1. **IMMEDIATELY** change your FTP password in Hostinger
2. Secure or remove credential files from the repository
3. Review server logs for unauthorized access
4. Scan your local computer for malware
5. Consider implementing a security monitoring solution

---

## 📝 Notes

- All malicious files have been deleted from your local copy
- **You must also delete these files from your live server** if they exist there
- The FTP password found in scripts is compromised and must be changed
- Consider using SFTP instead of FTP for better security

---

**Report Generated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Files Scanned:** All PHP files and configuration files
**Status:** Cleanup Complete - Action Required
