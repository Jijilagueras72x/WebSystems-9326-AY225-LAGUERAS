// Registration Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('registrationForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const confirmationEmail = document.getElementById('confirmationEmail');
    
    // Form data storage
    let formData = {
        personal: {},
        academic: {},
        account: {},
        preferences: {}
    };
    
    // Current step
    let currentStep = 1;
    const totalSteps = 4;
    
    // Initialize form
    initForm();
    
    function initForm() {
        // Step navigation
        nextBtn.addEventListener('click', nextStep);
        prevBtn.addEventListener('click', prevStep);
        
        // Form submission
        form.addEventListener('submit', handleSubmit);
        
        // Real-time validation
        setupValidation();
        
        // File upload
        setupFileUpload();
        
        // Password strength
        setupPasswordStrength();
        
        // Update review summary
        setupReviewSummary();
    }
    
    function nextStep() {
        if (!validateStep(currentStep)) {
            return;
        }
        
        saveStepData(currentStep);
        
        if (currentStep < totalSteps) {
            // Hide current step
            document.getElementById(`step${currentStep}`).classList.remove('active');
            progressSteps[currentStep - 1].classList.remove('active');
            progressSteps[currentStep - 1].classList.add('completed');
            
            // Show next step
            currentStep++;
            document.getElementById(`step${currentStep}`).classList.add('active');
            progressSteps[currentStep - 1].classList.add('active');
            
            // Update buttons
            updateButtons();
            
            // Scroll to top of form
            document.querySelector('.card-content').scrollTop = 0;
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            // Hide current step
            document.getElementById(`step${currentStep}`).classList.remove('active');
            progressSteps[currentStep - 1].classList.remove('active');
            
            // Show previous step
            currentStep--;
            document.getElementById(`step${currentStep}`).classList.add('active');
            progressSteps[currentStep - 1].classList.add('active');
            progressSteps[currentStep - 1].classList.remove('completed');
            
            // Update buttons
            updateButtons();
            
            // Scroll to top of form
            document.querySelector('.card-content').scrollTop = 0;
        }
    }
    
    function updateButtons() {
        // Show/hide previous button
        prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';
        
        // Show/hide next button
        nextBtn.style.display = currentStep < totalSteps ? 'flex' : 'none';
        
        // Show/hide submit button
        submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
    }
    
    function validateStep(step) {
        let isValid = true;
        const stepElement = document.getElementById(`step${step}`);
        const requiredFields = stepElement.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const validationMessage = field.parentElement.querySelector('.validation-message');
            
            if (!field.value.trim()) {
                showValidationError(field, 'This field is required');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showValidationError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.id === 'password' && !isStrongPassword(field.value)) {
                showValidationError(field, 'Password must be at least 8 characters with uppercase, lowercase, and number');
                isValid = false;
            } else if (field.id === 'confirmPassword') {
                const password = document.getElementById('password').value;
                if (field.value !== password) {
                    showValidationError(field, 'Passwords do not match');
                    isValid = false;
                } else {
                    showValidationSuccess(field);
                }
            } else {
                showValidationSuccess(field);
            }
        });
        
        // Special validation for step 4
        if (step === 4) {
            const agreeTerms = document.getElementById('agreeTerms');
            if (!agreeTerms.checked) {
                const validationMessage = agreeTerms.parentElement.parentElement.querySelector('.validation-message');
                validationMessage.textContent = 'You must agree to the terms and conditions';
                validationMessage.classList.remove('valid');
                validationMessage.classList.add('invalid');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function saveStepData(step) {
        const stepElement = document.getElementById(`step${step}`);
        const inputs = stepElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                if (input.checked) {
                    formData[getStepCategory(step)][input.name] = input.value || input.checked;
                }
            } else {
                formData[getStepCategory(step)][input.id] = input.value;
            }
        });
        
        // Update review summary
        updateReviewSummary();
    }
    
    function getStepCategory(step) {
        switch(step) {
            case 1: return 'personal';
            case 2: return 'academic';
            case 3: return 'account';
            case 4: return 'preferences';
            default: return 'misc';
        }
    }
    
    function setupValidation() {
        // Real-time validation for email
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    showValidationError(this, 'Please enter a valid email address');
                }
            });
        }
        
        // Real-time validation for password confirmation
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');
        
        if (confirmPasswordField) {
            confirmPasswordField.addEventListener('input', function() {
                const password = passwordField.value;
                if (this.value && password && this.value !== password) {
                    showValidationError(this, 'Passwords do not match');
                } else if (this.value && password && this.value === password) {
                    showValidationSuccess(this);
                }
            });
        }
    }
    
    function setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('profilePicture');
        const uploadedFileContainer = document.getElementById('uploadedFileContainer');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const removeFile = document.getElementById('removeFile');
        
        if (!uploadArea) return;
        
        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                handleFileUpload(e.target.files[0]);
            }
        });
        
        // Remove file
        removeFile.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.value = '';
            uploadedFileContainer.style.display = 'none';
            formData.account.profilePicture = null;
        });
        
        function handleFileUpload(file) {
            // Validate file
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validTypes.includes(file.type)) {
                alert('Please upload a JPG or PNG image file');
                return;
            }
            
            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                return;
            }
            
            // Display file info
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            uploadedFileContainer.style.display = 'block';
            
            // Store file in form data
            formData.account.profilePicture = file;
            
            // Preview image (optional)
            const reader = new FileReader();
            reader.onload = function(e) {
                // You could show a preview here if needed
                console.log('File loaded:', file.name);
            };
            reader.readAsDataURL(file);
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }
    
    function setupPasswordStrength() {
        const passwordField = document.getElementById('password');
        const strengthMeter = document.querySelector('.password-strength-meter');
        
        if (!passwordField || !strengthMeter) return;
        
        passwordField.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength++;
            
            // Contains lowercase
            if (/[a-z]/.test(password)) strength++;
            
            // Contains uppercase
            if (/[A-Z]/.test(password)) strength++;
            
            // Contains numbers
            if (/[0-9]/.test(password)) strength++;
            
            // Contains special characters
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            // Update strength meter
            strengthMeter.className = 'password-strength-meter';
            if (strength <= 2) {
                strengthMeter.classList.add('weak');
            } else if (strength <= 4) {
                strengthMeter.classList.add('medium');
            } else {
                strengthMeter.classList.add('strong');
            }
        });
    }
    
    function setupReviewSummary() {
        // Will be populated by updateReviewSummary()
    }
    
    function updateReviewSummary() {
        const reviewSummary = document.getElementById('reviewSummary');
        if (!reviewSummary) return;
        
        let html = `
            <div class="grid grid-2" style="gap: var(--space-md);">
                <div>
                    <h4 style="margin-bottom: var(--space-sm);">Personal Information</h4>
                    <p><strong>Name:</strong> ${formData.personal.firstName || ''} ${formData.personal.lastName || ''}</p>
                    <p><strong>Email:</strong> ${formData.personal.email || ''}</p>
                    <p><strong>Phone:</strong> ${formData.personal.phone || 'Not provided'}</p>
                </div>
                
                <div>
                    <h4 style="margin-bottom: var(--space-sm);">Academic Information</h4>
                    <p><strong>School:</strong> ${formData.academic.school || ''}</p>
                    <p><strong>Course:</strong> ${formData.academic.course || ''}</p>
                    <p><strong>Year Level:</strong> ${formData.academic.yearLevel || ''}</p>
                </div>
            </div>
        `;
        
        reviewSummary.innerHTML = html;
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
            return;
        }
        
        saveStepData(currentStep);
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await simulateAPICall();
            
            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            confirmationEmail.textContent = formData.personal.email;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // You could send the data to your server here
            console.log('Form data to submit:', formData);
            
            // Example: Send to server
            // const response = await fetch('/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // });
            
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Registration';
            submitBtn.disabled = false;
        }
    }
    
    function simulateAPICall() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1500);
        });
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isStrongPassword(password) {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers;
    }
    
    function showValidationError(field, message) {
        const validationMessage = field.parentElement.querySelector('.validation-message');
        if (validationMessage) {
            validationMessage.textContent = message;
            validationMessage.classList.remove('valid');
            validationMessage.classList.add('invalid');
            field.style.borderColor = '#E63946';
        }
    }
    
    function showValidationSuccess(field) {
        const validationMessage = field.parentElement.querySelector('.validation-message');
        if (validationMessage) {
            validationMessage.textContent = 'Looks good!';
            validationMessage.classList.remove('invalid');
            validationMessage.classList.add('valid');
            field.style.borderColor = '#2E8B57';
        }
    }
    
    // Initialize form state
    updateButtons();
});