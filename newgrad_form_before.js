<script>
    (function() {
    const oldDiv = document.getElementById("for_form");
          if (!oldDiv) {
            console.error("Target div not found!");
          }
      
          const newDivElement = document.createElement("div");
          newDivElement.id = "entry_form-container";
          oldDiv.replaceWith(newDivElement);
      
      
    const container = newDivElement;
      if (!container) console.log("Container not found");
      container.style.width = "100%";
      // Create shadow DOM
      const shadow = container.attachShadow({ mode: 'open' });
      
      // Add styles
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        :host {
                    --input-bg: rgb(161, 239, 255);
                    --input-border: 2px solid #FFFFFF;
                    --font-family: 'Zen Kaku Gothic New', sans-serif;
                    --primary-color: #0078d7;
                    --placeholder-color: #283593;
                    --error-color: #ff9090;
                    --success-color: #388e3c;
                }
            
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
            
                #entry_entryForm {
                  font-family: var(--font-family) !important;
                  font-weight: bold !important;
                }
            
                .form-row {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                    gap: 20px;
                }
            
                .form-group {
                    flex: 1 1 300px;
                    margin-bottom: 15px;
                }
            
                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #ffffff;
                }
            
                .required-label::after {
                    content: "*";
                    color: var(--error-color);
                    margin-left: 4px;
                }
            
                input, select {
                    width: 100%;
                    padding: 10px 12px;
                    border: var(--input-border);
                    border-radius: 4px;
                    background-color: var(--input-bg);
                    transition: background-color 0.3s ease;
                    font-size: 16px;
                    font-family: var(--font-family);
                    font-weight: bold;
                    /* transition: border-color 0.3s, box-shadow 0.3s; */
                }

                .referrer-container {
                    background-color: #626FCE;
                    margin: 50px 0;
                    padding: 15px 30px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .referrer-container p {
                    color: #ffffff;
                    font-weight: bold;
                    margin-bottom: 15px;
                    text-align: center;
                    width: 100%;
                }
            
                select {
                  color: #333;
                }
                
                input:focus {
                    background: #dddddd !important;
                }
            
                input:hover, input:focus:hover {
                    background: #EEEEEE !important;
                }
            
                input::placeholder {
                  opacity: 0.5;
                  color: var(--placeholder-color);
                  font-weight: bold;
                  font-family: var(--font-family) ;
                }
            
                select:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 120, 215, 0.2);
                    border-color: var(--primary-color);
                }
            
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px 0;
                }
            
                .checkbox-input {
                    width: auto;
                    margin-right: 10px;
                    transform: scale(1.5); 
                    transform-origin: 50% 60%;
                    cursor: pointer;
                }
            
                #entry_privacyPolicyLabel {
                    margin: 0;
                }
            
                /* Privacy Policy Link */
                #entry_privacy_policy_link, #entry_privacy_policy_link:visited {
                  color: #44D8F1; 
                  text-decoration: underline;
                }
            
                #entry_privacyPolicyError {
                  text-align: center;
                }
            
                .submit-btn {
                    background: linear-gradient(106deg, #49fff1 0%, #0062e9 100%);
                    transition: .4s cubic-bezier(.4,.4,0,1);
                    color: white;
                    font-weight: bold;
                    border: none;
                    padding: 12px 24px;
                    font-size: 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: block;
                    margin: 30px auto 0;
                    width: 100%;
                    max-width: 300px;
                }
            
                .submit-btn:hover {
                  transform: scale(1.05, 1.05);
                }
            
                .submit-btn:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
            
                .error-message {
                    color: var(--error-color);
                    font-size: 14px;
                    margin-top: 5px;
                    display: none;
                }
      `;
      shadow.appendChild(styleElement);

      // Add media query for tablet
        const mediaQuery = document.createElement('style');
        mediaQuery.textContent = `
            @media (max-width: 704px) and (min-width: 541px) {
                        #entry_form-container {
                            width: 300px;
                        }
                        
                    }
        `;
        container.appendChild(mediaQuery);
      
      // Add the form directly (not wrapped in an extra div)
      const formElement = document.createElement('div');
      formElement.innerHTML = `
        <form id="entry_entryForm" novalidate enctype="multipart/form-data">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="entry_lastName" class="required-label">姓</label>
                            <input type="text" id="entry_lastName" name="lastName" required aria-required="true" placeholder="山田">
                            <div class="error-message" id="entry_lastNameError">姓を入力してください</div>
                        </div>
                        <div class="form-group">
                            <label for="entry_firstName" class="required-label">名</label>
                            <input type="text" id="entry_firstName" name="firstName" required aria-required="true" placeholder="太郎">
                            <div class="error-message" id="entry_firstNameError">名を入力してください</div>
                        </div>
                    </div>
            
                    <div class="form-row">
                        <div class="form-group">
                            <label for="entry_email" class="required-label">Eメール</label>
                            <input type="email" id="entry_email" name="email" required aria-required="true" placeholder="mail@example.com">
                            <div class="error-message" id="entry_emailError">有効なメールアドレスを入力してください</div>
                        </div>
                        <div class="form-group">
                            <label for="entry_email_confirmation" class="required-label">Eメール 再入力</label>
                            <input type="email" id="entry_email_confirmation" name="email_confirmation" required aria-required="true" placeholder="mail@example.com">
                            <div class="error-message" id="entry_emailConfirmationError">一致するメールアドレスを入力してください</div>
                        </div>
                    </div>
            
                    <div class="form-row">
                        <div class="form-group">
                            <label for="entry_phone" class="required-label">電話番号</label>
                            <input type="tel" id="entry_phone" name="phone" required aria-required="true" placeholder="090-1234-5678">
                            <div class="error-message" id="entry_phoneError">有効な電話番号を入力してください</div>
                        </div>
                        <div class="form-group">
                          <label for="entry_graduationYear" class="required-label">卒業年度</label>
                          <input type="number" id="entry_graduationYear" name="graduationYear" required aria-required="true" placeholder="2023">
                          <div class="error-message" id="entry_graduationYearError">卒業年度を入力してください</div>
                        </div>
                    </div>

                    <div class="form-row referrer-container">
                        <p>ご紹介者さまのお名前を入力してください</p>
                        <div class="form-group">
                            <label for="entry_referrerLastName">姓</label>
                            <input type="text" id="entry_referrerLastName" name="referrerLastName" aria-required="false" placeholder="山田">
                            <div class="error-message" id="entry_referrerLastNameError">名前を255文字以内で入力してください</div>
                        </div>
                        <div class="form-group">
                            <label for="entry_referrerFirstName">名</label>
                            <input type="text" id="entry_referrerFirstName" name="referrerFirstName" aria-required="false" placeholder="花子">
                            <div class="error-message" id="entry_referrerFirstNameError">名前を255文字以内で入力してください</div>
                        </div>
                    </div>
            
                    <div class="checkbox-group">
                        <input type="checkbox" id="entry_privacyPolicy" name="privacyPolicy" class="checkbox-input" required aria-required="true">
                        <label for="entry_privacyPolicy" class="required-label" id="entry_privacyPolicyLabel">
                          採用選考に関する
                          <a target="_blank" href="https://recruit.gl-navi.co.jp/privacypolicy" id="entry_privacy_policy_link" data-has-link="true" rel="noopener">
                          プライバシーポリシー</a>に同意する
                        </label>
                    </div>
                    <div class="error-message" id="entry_privacyPolicyError">プライバシーポリシーに同意する必要があります</div>
            
                    <button type="submit" id="entry_submitBtn" class="submit-btn">エントリー</button>
                </form>
      `;
      shadow.appendChild(formElement);
      
    
   // Add JS

// Cache DOM elements and set initial state
const sbmtBtn = shadow.getElementById('entry_submitBtn');
sbmtBtn.disabled = true;
sbmtBtn.textContent = '読込中...';
let mktoFormEl;
let isSubmitting = false;

// Get form and input elements
const form = shadow.getElementById('entry_entryForm');
const graduationYearInput = shadow.getElementById('entry_graduationYear');
const privacyPolicyCheckbox = shadow.getElementById('entry_privacyPolicy');

// Set default graduation year placeholder to current year minus 3
const nextYear = new Date().getFullYear() - 3;
graduationYearInput.placeholder = nextYear;

// Watch for Marketo form to be ready
MktoForms2.whenReady(function(mktoForm) {
    mktoFormEl = mktoForm;
    sbmtBtn.disabled = false;
    sbmtBtn.textContent = 'エントリー';
});

// Form validation event listener
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    // Clear all previous error messages
    clearAllErrors();
    
    if (!mktoFormEl) {
        showFormError('Marketoフォームが読み込まれていません。ページを更新してください。');
        return;
    }
    
    // Validate all fields
    const isValid = validateAllFields();
    
    if (isValid) {
        submitForm();
    } else {
        // Scroll to first error
        const firstError = shadow.querySelector('.error-message[style*="block"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Helper function to disable/enable all form elements during submission
function setFormSubmitting(isSubmitting) {
    const inputs = form.querySelectorAll('input, button');
    inputs.forEach(input => {
        input.disabled = isSubmitting;
    });
    sbmtBtn.disabled = isSubmitting;
    sbmtBtn.textContent = isSubmitting ? '送信中...' : 'エントリー';
}

// Function to validate all fields
function validateAllFields() {
    let isValid = true;
    
    // Validate required fields
    isValid = validateRequiredField('entry_lastName', 'entry_lastNameError') && isValid;
    isValid = validateRequiredField('entry_firstName', 'entry_firstNameError') && isValid;
    isValid = validateEmail() && isValid;
    isValid = validateEmailConfirmation() && isValid;
    isValid = validatePhone() && isValid;
    isValid = validateGraduationYear() && isValid;
    isValid = validateRefererFields() && isValid;
    isValid = validateCheckbox('entry_privacyPolicy', 'entry_privacyPolicyError') && isValid;
    
    return isValid;
}

// Function to submit form data
function submitForm() {
    // Get form data
    const formData = new FormData(form);
    
    // Add privacy policy timestamp if checked
    if (privacyPolicyCheckbox.checked) {
        formData.append('privacyPolicyTimestamp', new Date().toISOString());
    }
    
    // Disable form during submission
    isSubmitting = true;
    setFormSubmitting(true);
    
    // Create a Promise that will resolve on Marketo success or reject after timeout
    const marketoSubmissionWithTimeout = new Promise((resolve, reject) => {
        // Set up success handler before submission
        mktoFormEl.onSuccess(function(values, followUpUrl) {
            console.log('Marketo submission successful:', values);
            resolve(values);
            return false; // Prevent default form redirect
        });
        
        // Timeout if Marketo takes too long
        setTimeout(() => {
            reject(new Error('Marketo submission timed out after 20 seconds'));
        }, 20000);
    });

    // Submit to Pipedream first, then Marketo
    fetch('https://eoqlrj51fjyq9e6.m.pipedream.net', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Pipedream submission failed with status: ' + response.status);
        }
        console.log('Pipedream submission successful');
        
        // Set values in Marketo form
        mktoFormEl.setValues({
            'LastName': formData.get('lastName'),
            'FirstName': formData.get('firstName'),
            'Email': formData.get('email'),
            'Phone': formData.get('phone'),
            'graduation': formData.get('graduationYear'),
            'praivacyPolicy': formData.get('privacyPolicy') !== null ? "yes" : "no",
            'recordtype': '応募者_新卒'
        });
        
        // Submit the Marketo form and return the Promise we created
        mktoFormEl.submit();
        return marketoSubmissionWithTimeout;
    })
    .then(() => {
        // Handle successful submission
        form.reset();
        isSubmitting = false;
        setFormSubmitting(false);
        
        // Redirect to thank you page
        window.location.href = "https://recruit.gl-navi.co.jp/entry-successful";
    })
    .catch(error => {
        console.error('Error submitting form:', error.message, error.stack);
        
        // Re-enable form
        isSubmitting = false;
        setFormSubmitting(false);
        
        // Show error message to user
        showFormError('フォームの送信中にエラーが発生しました。後ほど再試行してください。');
    });
}

// Privacy policy checkbox change handler
privacyPolicyCheckbox.addEventListener('change', function() {
    validateCheckbox('entry_privacyPolicy', 'entry_privacyPolicyError');
});

// Set up real-time validation for better UX
const inputs = form.querySelectorAll('input, select');
inputs.forEach(input => {
    // Add blur event for all inputs (validation when user leaves field)
    input.addEventListener('blur', function() {
        validateInputOnBlur(this);
    });
    
    // For email confirmation, add input event to check match in real-time
    if (this.id === 'entry_email_confirmation') {
        input.addEventListener('input', function() {
            if (shadow.getElementById('entry_email').value) {
                validateEmailConfirmation();
            }
        });
    }
});

// Function to validate input on blur
function validateInputOnBlur(input) {
    switch(input.id) {
        case 'entry_email':
            validateEmail();
            // If confirmation is filled, validate it too
            if (shadow.getElementById('entry_email_confirmation').value) {
                validateEmailConfirmation();
            }
            break;
        case 'entry_email_confirmation':
            validateEmailConfirmation();
            break;
        case 'entry_phone':
            validatePhone();
            break;
        case 'entry_graduationYear':
            validateGraduationYear();
            break;
        case 'entry_privacyPolicy':
            validateCheckbox(input.id, 'entry_privacyPolicyError');
            break;
        case 'entry_referrerLastName':
        case 'entry_referrerFirstName':
            validateRefererFields();
            break;
        default:
            if (input.required) {
                validateRequiredField(input.id, input.id + 'Error');
            }
    }
}

// Validation functions
function validateRequiredField(fieldId, errorId) {
    const field = shadow.getElementById(fieldId);
    
    if (!field) {
        console.error(`Field not found: ${fieldId}`);
        return false;
    }
    
    if (!field.value.trim()) {
        const labelText = field.previousElementSibling?.textContent.replace(/[*:]/, '').trim() || '項目';
        showError(errorId, `${labelText}を入力してください`);
        return false;
    } else if (field.value.length > 255) {
        showError(errorId, `255文字以内で入力してください`);
        return false;
    } else {
        hideError(errorId);
        return true;
    }
}

function validateEmail() {
    const email = shadow.getElementById('entry_email');
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email.value.trim()) {
        showError('entry_emailError', 'Eメールを入力してください');
        return false;
    } else if (!emailRegex.test(email.value)) {
        showError('entry_emailError', '有効なメールアドレスを入力してください');
        return false;
    } else {
        hideError('entry_emailError');
        return true;
    }
}

function validateEmailConfirmation() {
    const email = shadow.getElementById('entry_email');
    const emailConfirmation = shadow.getElementById('entry_email_confirmation');
    
    if (!emailConfirmation.value.trim()) {
        showError('entry_emailConfirmationError', 'Eメールを再入力してください');
        return false;
    } else if (email.value !== emailConfirmation.value) {
        showError('entry_emailConfirmationError', '一致するメールアドレスを入力してください');
        return false;
    } else {
        hideError('entry_emailConfirmationError');
        return true;
    }
}

function validatePhone() {
    const phone = shadow.getElementById('entry_phone');
    const phoneRegex_Marketo = /^([0-9()+. \t-])+(\s?(x|ext|extension)\s?([0-9()])+)?$/;
    const phoneRegex_Salesforce = /^(0\d{1,4}-\d{1,4}-\d{4}|0\d{9,10})$/; 
    
    if (!phone.value.trim()) {
        showError('entry_phoneError', '電話番号を入力してください');
        return false;
    } else if (phone.value.length > 255) {
        showError('entry_phoneError', '電話番号を255文字以内で入力してください');
        return false;
    } else if (!phoneRegex_Marketo.test(phone.value)) {
        showError('entry_phoneError', '有効な電話番号を入力してください');
        return false;
    } else if (!phoneRegex_Salesforce.test(phone.value)) {
        showError('entry_phoneError', '有効な電話番号を入力してください');
        return false;
    } else {
        hideError('entry_phoneError');
        return true;
    }
}

function validateGraduationYear() {
    const graduationYear = shadow.getElementById('entry_graduationYear');
    const currentYear = new Date().getFullYear();
    const yearValue = parseInt(graduationYear.value.trim());
    
    if (!graduationYear.value.trim()) {
        showError('entry_graduationYearError', '卒業年度を入力してください');
        return false;
    } else if (isNaN(yearValue) || yearValue < 1950 || yearValue > currentYear + 10) {
        showError('entry_graduationYearError', '1950年から' + (currentYear + 10) + '年の間で入力してください');
        return false;
    } else {
        hideError('entry_graduationYearError');
        return true;
    }
}

function validateRefererFields() {
    const referrerLastName = shadow.getElementById('entry_referrerLastName');
    const referrerFirstName = shadow.getElementById('entry_referrerFirstName');
    
    // If both are empty, it's valid (not required)
    if (!referrerLastName.value.trim() && !referrerFirstName.value.trim()) {
        hideError('entry_referrerLastNameError');
        hideError('entry_referrerFirstNameError');
        return true;
    }
    
    let isValid = true;
    
    // If one is filled but not the other
    if (referrerLastName.value.trim() && !referrerFirstName.value.trim()) {
        showError('entry_referrerFirstNameError', '名を入力してください');
        isValid = false;
    } else {
        hideError('entry_referrerFirstNameError');
    }
    
    if (!referrerLastName.value.trim() && referrerFirstName.value.trim()) {
        showError('entry_referrerLastNameError', '姓を入力してください');
        isValid = false;
    } else {
        hideError('entry_referrerLastNameError');
    }
    
    // Check length limits
    if (referrerLastName.value.length > 255) {
        showError('entry_referrerLastNameError', '姓を255文字以内で入力してください');
        isValid = false;
    }
    
    if (referrerFirstName.value.length > 255) {
        showError('entry_referrerFirstNameError', '名を255文字以内で入力してください');
        isValid = false;
    }
    
    return isValid;
}

function validateCheckbox(fieldId, errorId) {
    const field = shadow.getElementById(fieldId);
    
    if (!field.checked) {
        showError(errorId, 'プライバシーポリシーに同意する必要があります');
        return false;
    } else {
        hideError(errorId);
        return true;
    }
}

// Show form-wide error message
function showFormError(message) {
    // Check if error already exists
    const existingError = shadow.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '10px';
    errorDiv.style.marginBottom = '15px';
    errorDiv.style.backgroundColor = '#fff0f0';
    errorDiv.style.border = '1px solid #ffcccc';
    errorDiv.style.borderRadius = '4px';
    
    // Insert at top of form
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove after 10 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 10000);
}

// Error message helper functions
function showError(errorId, message) {
    const errorElement = shadow.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('style', 'display: block !important;');
        errorElement.setAttribute('aria-hidden', 'false');
        
        // Add error class to the parent form-group for styling
        const formGroup = errorElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('has-error');
        }
    } else {
        console.error(`Error element not found: ${errorId}`);
    }
}

function hideError(errorId) {
    const errorElement = shadow.getElementById(errorId);
    if (errorElement) {
        errorElement.setAttribute('style', 'display: none !important;');
        errorElement.setAttribute('aria-hidden', 'true');
        
        // Remove error class from parent form-group
        const formGroup = errorElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('has-error');
        }
    }
}

function clearAllErrors() {
    const errors = shadow.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.setAttribute('style', 'display: none !important;');
        error.setAttribute('aria-hidden', 'true');
    });
    
    // Remove all error classes
    const formGroups = shadow.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('has-error');
    });
    
    // Remove any form-wide error messages
    const formErrorMessage = shadow.querySelector('.form-error-message');
    if (formErrorMessage) {
        formErrorMessage.remove();
    }
}
})();
    
</script>



