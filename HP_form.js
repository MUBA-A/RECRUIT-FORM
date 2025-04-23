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
            row-gap: 20px;
            column-gap: 45px;
            align-items: flex-start;
        }

        .form-group {
            flex: 1 1 300px;
            margin-bottom: 15px;
            /* For better vertical alignment of form elements */
            display: flex;
            flex-direction: column;
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
            transition: background-color 0.3s ease, border-color 0.3s ease;
            font-size: 16px;
            font-family: var(--font-family);
            font-weight: bold;
            /* Explicit line height improves cross-browser consistency */
            line-height: 1.5;
        }

        input:focus {
            background: #dddddd !important;
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 120, 215, 0.2);
        }
        select:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 120, 215, 0.2);
            border-color: var(--primary-color);
        }

        input:hover, input:focus:hover {
            background: #EEEEEE !important;
        }

        input::placeholder {
            opacity: 0.5;
            color: var(--placeholder-color);
            font-weight: bold;
            font-family: var(--font-family);
        }

        /* Ensures consistent placeholder styling across browsers */
        input::-webkit-input-placeholder {
            opacity: 0.5;
            color: var(--placeholder-color);
            font-weight: bold;
            font-family: var(--font-family);
        }

        input::-moz-placeholder {
            opacity: 0.5;
            color: var(--placeholder-color);
            font-weight: bold;
            font-family: var(--font-family);
        }

        .file-input-container {
            position: relative;
            overflow: hidden;
            display: inline-block;
            width: 100%;
        }

        .file-input-label {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            border: var(--input-border);
            border-radius: 4px;
            background-color: var(--input-bg);
            color: var(--placeholder-color);
            cursor: pointer;
            transition: background-color 0.2s, transform 0.1s;
            text-align: center;
            width: 100%;
            user-select: none;
            margin: 0;
            height: 47.2px;
        }

        .file-input-label:hover {
            background-color: #005a9e;
        }

        .file-input-label:active {
            transform: translateY(1px);
        }

        .file-input {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .file-name {
            margin-top: 8px;
            font-size: 14px;
            color: #ffffff;
            font-weight: normal;
            word-break: break-all;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 50px 0 40px 0;
            flex-wrap: nowrap;
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
            transition: color 0.2s;
        }

        #entry_privacy_policy_link:hover {
            color: #7ae5ff;
        }

        #entry_privacy_policy_link:focus {
            outline: 2px solid #44D8F1;
            outline-offset: 2px;
        }

        #entry_privacyPolicyError {
            text-align: center;
        }

        .submit-btn {
            background: linear-gradient(106deg, #49fff1 0%, #0062e9 100%);
            transition: transform 0.4s cubic-bezier(.4,.4,0,1), background 0.3s;
            color: white;
            font-weight: bold;
            border: none;
            padding: 24px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            display: block;
            margin: 30px auto 0;
            width: 100%;
            max-width: 300px;
            /* Improves text rendering */
            text-rendering: optimizeLegibility;
            /* Makes text sharper on some browsers */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .submit-btn:hover {
            transform: scale(1.05, 1.05);
        }

        .submit-btn:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(73, 255, 241, 0.5);
        }

        .submit-btn:disabled {
            background: linear-gradient(106deg, #b9e6e0 0%, #99b7d4 100%);
            cursor: not-allowed;
            transform: none;
        }

        .error-message {
            color: var(--error-color);
            font-size: 14px;
            margin-top: 5px;
            display: none;
            /* Better readability for error messages */
            font-weight: 500;
        }

        /* Focus styles for accessibility */
        input:focus-visible, select:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 1px;
        }

    
      `;
      shadow.appendChild(styleElement);

      // Add media query for tablet
        const mediaQuery = document.createElement('style');
        mediaQuery.textContent = `
             @media (min-width: 1501px) {
                #entry_form-container {
                    width: 60%;
                }
            }
            @media (min-width: 1240px) and (max-width: 1500px) {
                #entry_form-container {
                    width: 80%;
                }
            }
            @media (min-width: 704px) and (max-width: 1239px) {
                #entry_form-container {
                    width: 100%;
                }
            }
            @media (max-width: 704px) and (min-width: 541px) {
                #entry_form-container {
                    width: 300px;
                }
            }
            @media (max-width: 540px) {
                #entry_form-container {
                    width: 100%;
                }
                .submit-btn {
                    width: 100%;
                }
            }
            
            @media (hover: none) {
                .submit-btn:hover {
                    transform: none;
                }
            }

            @media (-ms-high-contrast: active), (-ms-high-contrast: none) {
                /* IE10+ specific styles */
                .submit-btn {
                    background: #0062e9;
                }
            }
        `;
        container.appendChild(mediaQuery);
      
      // Add the form HTML
      const formElement = document.createElement('div');
      formElement.innerHTML = `
        <form id="entry_entryForm" novalidate enctype="multipart/form-data" accept-charset="utf-8">
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
                    <label for="entry_email_confirmation" class="required-label">Eメール (再入力)</label>
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
                    <label for="entry_resume" class="required-label">履歴書</label>
                    <div class="file-input-container">
                        <label for="entry_resume" class="file-input-label" id="entry_fileName">ファイルを選択</label>
                        <input type="file" id="entry_resume" name="resume" class="file-input" required aria-required="true">
                    </div>
                    <div class="error-message" id="entry_resumeError">履歴書をアップロードしてください（PDF、Excel、Word形式、10MB以下）</div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="entry_desiredOccupation" class="required-label">応募職種</label>
                    <select id="entry_desiredOccupation" name="desiredOccupation" required aria-required="true">
                        <option value="">ご希望の職種を選択してください</option>
                        <option value="インサイドセールス">・セールス: インサイドセールス</option>
                        <option value="フィールドセールス">・セールス: フィールドセールス</option>
                        <option value="フィールドセールス・エクスパート">・セールス: フィールドセールス・エクスパート</option>
                        <option value="Japan Wingセールス">・教育: Japan Wingセールス</option>
                        <option value="Japan Wing講師">・教育: Japan Wing講師</option>
                        <option value="DXコンサルタント・エントリーレベル">・IT・コンサルタント: DXコンサルタント・エントリーレベル</option>
                        <option value="DXコンサルタント">・IT・コンサルタント: DXコンサルタント</option>
                        <option value="DXコンサルタント・エクスパート">・IT・コンサルタント: DXコンサルタント・エクスパート</option>
                        <option value="データサイエンティスト">・IT・コンサルタント: データサイエンティスト</option>
                        <option value="コーポレートファンクション">コーポレートファンクション</option>
                        <option value="新卒・第二新卒 オープンポジション">新卒・第二新卒: オープンポジション</option>
                        <option value="その他">その他</option>
                    </select>
                    <div class="error-message" id="entry_desiredOccupationError">応募職種を選択してください</div>
                </div>
            </div>


            <div class="checkbox-group">
                <input type="checkbox" id="entry_privacyPolicy" name="privacyPolicy" class="checkbox-input" required aria-required="true">
                <label for="entry_privacyPolicy" id="entry_privacyPolicyLabel">
                  採用選考に関する
                  <a target="_blank" href="https://recruit.gl-navi.co.jp/privacypolicy" id="entry_privacy_policy_link" data-has-link="true" rel="noopener">プライバシーポリシー</a>に同意する
                </label>
            </div>
            <div class="error-message" id="entry_privacyPolicyError">プライバシーポリシーに同意する必要があります</div>
            

            <!-- timestamp for privacy policy checkbox -->
            <input type="hidden" id="entry_privacyPolicyTimestamp" name="privacyPolicyTimestamp" value="">

            <button type="submit" id="entry_submitBtn" class="submit-btn">エントリー</button>
        </form>
      `;
      shadow.appendChild(formElement);


    // Disable submit button until Marketo form loads
    const sbmtBtn = shadow.getElementById('entry_submitBtn');
    sbmtBtn.disabled = true;
    sbmtBtn.textContent = '読込中...';
    let mktoFormEl;

    // Watch for Marketo form to be ready and enable submit button.
    function initializeMarketoLogicWhenReady() {
        if (typeof MktoForms2 !== "undefined") {
    
            MktoForms2.whenReady(function(mktoForm) {
                mktoFormEl = mktoForm;
                sbmtBtn.disabled = false;
                sbmtBtn.textContent = 'エントリー';
            });
    
        } else {
            // MktoForms2 doesn't exist yet. Wait and try again.
            console.log("MktoForms2 object not found yet. Retrying in 100ms...");
            setTimeout(initializeMarketoLogicWhenReady, 100); // Check again shortly
        }
    }
    
    // Start the process
    initializeMarketoLogicWhenReady();

    // Get form and input elements
    const form = shadow.getElementById('entry_entryForm');
    const resumeInput = shadow.getElementById('entry_resume');
    const fileNameDisplay = shadow.getElementById('entry_fileName');
    const privacyPolicyCheckbox = shadow.getElementById('entry_privacyPolicy');
    const privacyPolicyTimestampField = shadow.getElementById('entry_privacyPolicyTimestamp');
    const desiredOccupation = shadow.getElementById("entry_desiredOccupation");


    let applicantType;  // Boolean

    desiredOccupation.addEventListener("change", function () {
        if (validateDesiredOccupation()) {
            if (this.value == "新卒・第二新卒 オープンポジション") {
                applicantType = '応募者_新卒';
            } else {
                applicantType = '応募者_中途';
            }
            console.log(applicantType);
        }
    });


    // Display file name when selected
    resumeInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
            fileNameDisplay.style.fontWeight = "bold";
            validateFile(this); // This validates on change but the error was disappearing
        } else {
            fileNameDisplay.textContent = '選択されていません';
            hideError('entry_resumeError');
        }
    });

    privacyPolicyCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // ISO format (e.g., "2023-12-01T08:30:45.123Z")
            const now = new Date();
            privacyPolicyTimestampField.value = now.toISOString();
        } else {
            // Clear the timestamp if unchecked
            privacyPolicyTimestampField.value = '';
        }
    });

    // Form validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Clear all previous error messages
        clearAllErrors();
        
        let isValid = true;
        
        // Validate required fields
        isValid = validateRequiredField('entry_lastName', 'entry_lastNameError') && isValid;
        isValid = validateRequiredField('entry_firstName', 'entry_firstNameError') && isValid;
        isValid = validateEmail() && isValid;
        isValid = validateEmailConfirmation() && isValid;
        isValid = validatePhone() && isValid;
        isValid = validateDesiredOccupation() && isValid;

        isValid = validateFile(resumeInput) && isValid;
        isValid = validateCheckbox('entry_privacyPolicy', 'entry_privacyPolicyError') && isValid;

        function setFormSubmitting(isSubmitting) {
            const inputs = form.querySelectorAll('input, button');
            inputs.forEach(input => {
                input.disabled = isSubmitting;
            });
            sbmtBtn.disabled = isSubmitting;
            sbmtBtn.textContent = isSubmitting ? '送信中...' : 'エントリー';
        }
        
        if (isValid) {
            // Get form data
            const formData = new FormData(form);
            
            setFormSubmitting(true);

            // Submit to Pipedream first, then Marketo
            fetch('https://eojyw7f24hzl5c6.m.pipedream.net', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    // Convert the response to JSON if possible, otherwise use text
                    return response.json().catch(() => response.text()).then(errorData => {
                        const error = new Error(response.statusText || 'Request failed');
                        error.status = response.status;
                        error.data = errorData;
                        throw error;
                    });
                }
                // Create a Promise that will resolve on Marketo success or reject after timeout
                const marketoSubmissionWithTimeout = new Promise((resolve, reject) => {
                    // Set up success handler before submission
                    mktoFormEl.onSuccess(function(values) {
                        console.log(values);
                        resolve(values);
                        return false; // Prevent default form redirect
                    });
                    
                    // Timeout if Marketo takes too long
                    setTimeout(() => {
                        reject(new Error('Marketo submission timed out after 20 seconds'));
                    }, 20000);
                });
                
                // Set values in Marketo form
                mktoFormEl.setValues({
                    'LastName': formData.get('lastName'),
                    'FirstName': formData.get('firstName'),
                    'Email': formData.get('email'),
                    'Phone': formData.get('phone'),
                    'praivacyPolicy': formData.get('privacyPolicy') !== null ? "yes" : "no",
                    'recordtype': applicantType
                });
                
                // Submit the Marketo form and return the Promise we created
                mktoFormEl.submit();
                return marketoSubmissionWithTimeout;
            })
            .then(() => {
                isSubmissionInProgress = false;
                // Handle successful submission
                form.reset();
                fileNameDisplay.textContent = '選択されていません';
                setFormSubmitting(false); // Re-enable form
                
                // Redirect to thank you page
                window.location.href = "https://recruit.gl-navi.co.jp/apply/successful";
            })
            .catch(error => {
                console.error('Error details:', {
                    status: error.status,
                    message: error.message,
                    data: error.data
                });
                
                let errorMessage = 'フォームの送信中にエラーが発生しました。後ほど再試行してください。\n';
                
                if (error.status === 418) {
                    errorMessage = '入力内容に問題があります。入力項目を確認してください。\n';
                }
                for (let x in error.data) {
                    errorMessage += "・" + error.data[x] + "\n";
                };

                alert(errorMessage);
                
                // Re-enable form
                setFormSubmitting(false);
                
            });
        }
    });

    // Real-time validation for better UX
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.id === 'entry_email') {
                validateEmail();
            } else if (this.id === 'entry_email_confirmation') {
                validateEmailConfirmation();
            } else if (this.id === 'entry_phone') {
                validatePhone();
            } else if (this.id === 'entry_privacyPolicy') {
                validateCheckbox(this.id, 'entry_privacyPolicyError');
            } else if (this.id === 'entry_resume') {
                // Fixed: Ensure resume validation persists after blur
                validateFile(this);
            } else if (this.required) {
                validateRequiredField(this.id, this.id + 'Error');
            }
        });
    });

    // Validation functions
    function validateRequiredField(fieldId, errorId) {
        const field = shadow.getElementById(fieldId);
        
        if (!field.value.trim()) {
            showError(errorId, `${field.previousElementSibling.textContent.replace('*', '')}を入力してください`);
            return false;
        } else if (field.value.length > 255) {
            showError(errorId, `${field.previousElementSibling.textContent.replace('*', '')}を255文字以内で入力してください`);
            return false;
        } else {
            hideError(errorId);
            return true;
        }
    }


    function validateEmail() {
        const email = shadow.getElementById('entry_email');
        // Marketo email regex. RFC 5322 standard.
        const emailRegex_Marketo = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; 
        const emailRegex_Salesforce = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

        if (!email.value.trim()) {
            showError('entry_emailError', 'Eメールを入力してください');
            return false;
        } else if (email.value.length > 255) {
            showError('entry_emailError', 'Eメールを255文字以内で入力してください');
            return false;
        } else if (!emailRegex_Marketo.test(email.value) || !emailRegex_Salesforce.test(email.value)) {
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
        } else if (emailConfirmation.value.length > 255) {
            showError('entry_emailConfirmationError', 'Eメールを255文字以内で入力してください');
            return false;
        } else if (!validateEmail()) {
            showError('entry_emailConfirmationError', '有効なメールアドレスを入力してください');
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
        const phoneRegex_Salesforce = /^(\+?[0-9\s\-\(\)]{8,20})$/;
        const digitsOnly = phone.value.replace(/[^0-9]/g, ''); 
        
        if (!phone.value.trim()) {
            showError('entry_phoneError', '電話番号を入力してください');
            return false;
        } else if (phone.value.length > 255) {
            showError('entry_phoneError', '電話番号を255文字以内で入力してください');
            return false;
        } else if (digitsOnly.length < 8) {
            showError('entry_phoneError', '有効な電話番号を入力してください');
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



    function validateDesiredOccupation() {
        const desiredOccupation = shadow.getElementById("entry_desiredOccupation");

        if (!desiredOccupation.value) {
            showError('entry_desiredOccupationError', '応募職種を選択してください');
            return false;
        } else {
            hideError('entry_desiredOccupationError');
            return true;
        }
    }

    

    function validateFile(fileInput) {
        // Check if no file and present
        if (!fileInput.files || fileInput.files.length === 0) {
            showError('entry_resumeError', '履歴書をアップロードしてください');
            return false;
        }
        
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileName = file.name.toLowerCase();
            const fileSize = file.size;
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            // Define allowed formats with both extension and MIME type
            const allowedFormats = [
                { ext: '.pdf', mime: 'application/pdf' },
                { ext: '.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
                { ext: '.xls', mime: 'application/vnd.ms-excel' },
                { ext: '.docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
                { ext: '.doc', mime: 'application/msword' }
            ];
            
            // Check for empty files
            if (fileSize === 0) {
                showError('entry_resumeError', 'ファイルが空です。有効なファイルをアップロードしてください');
                return false;
            }
            
            // Check size first
            if (fileSize > maxSize) {
                showError('entry_resumeError', 'ファイルサイズは10MB以下にしてください');
                return false;
            }
            
            // Get file MIME type
            const fileMimeType = file.type;
            
            // Check if file matches any of our allowed formats
            const isValidFormat = allowedFormats.some(format => 
                fileName.endsWith(format.ext) || fileMimeType === format.mime
            );
            
            if (!isValidFormat) {
                console.debug('File validation failed:', {
                    filename: fileName,
                    size: fileSize,
                    type: file.type,
                    validFormats: allowedFormats.map(f => `${f.ext} (${f.mime})`)
                });
                showError('entry_resumeError', '許可されているファイル形式：PDF、Excel、Word形式のみ');
                return false;
            }
            
            // If we got here, the file is valid
            hideError('entry_resumeError');
            return true;
        }
        
        return true;
    }

    function validateCheckbox(fieldId, errorId) {
        const field = shadow.getElementById(fieldId);
        
        if (!field.checked) {
            showError(errorId, `プライバシーポリシーに同意する必要があります`);
            return false;
        } else {
            hideError(errorId);
            return true;
        }
    }

    function showError(errorId, message) {
        const errorElement = shadow.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.setAttribute('style', 'display: block !important;');
        errorElement.setAttribute('aria-hidden', 'false');
    }

    function hideError(errorId) {
        const errorElement = shadow.getElementById(errorId);
        errorElement.setAttribute('style', 'display: none !important;');
        errorElement.setAttribute('aria-hidden', 'true');
    }

    function clearAllErrors() {
        const errors = shadow.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.setAttribute('style', 'display: none !important;');
            error.setAttribute('aria-hidden', 'true');
        });
    }
    
    })();
