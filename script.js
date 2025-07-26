// Estado global da aplicação
let currentStep = 1;
let formData = {
    email: '',
    password: '',
    reason: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Função de inicialização
function initializeApp() {
    setupEventListeners();
    updateProgressBar();
    showStep(1);
}

// Configurar event listeners
function setupEventListeners() {
    // Form de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Form de motivo
    const reasonForm = document.getElementById('reason-form');
    if (reasonForm) {
        reasonForm.addEventListener('submit', handleReasonSubmit);
    }

    // Form de pagamento
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }

    // Formatação automática de campos
    setupInputFormatting();
}

// Configurar formatação automática de inputs
function setupInputFormatting() {
    // Formatação do número do cartão
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
            e.target.value = formattedValue;
        });
    }

    // Formatação da data de validade
    const expiryInput = document.getElementById('expiry-date');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Formatação do CVV (apenas números)
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
}

// Manipular submit do form de login
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação básica
    if (!email || !password) {
        showError('Por favor, preencha todos os campos.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Por favor, insira um email válido.');
        return;
    }

    // Salvar dados
    formData.email = email;
    formData.password = password;

    // Simular loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    showLoading(submitBtn, true);

    setTimeout(() => {
        showLoading(submitBtn, false);
        nextStep();
    }, 1500);
}

// Manipular submit do form de motivo
function handleReasonSubmit(e) {
    e.preventDefault();
    
    const selectedReason = document.querySelector('input[name="reason"]:checked');
    
    if (!selectedReason) {
        showError('Por favor, selecione um motivo.');
        return;
    }

    formData.reason = selectedReason.value;
    nextStep();
}

// Manipular submit do form de pagamento
function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validações
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        showError('Por favor, preencha todos os campos do cartão.');
        return;
    }

    if (cardNumber.replace(/\s/g, '').length < 16) {
        showError('Número do cartão inválido.');
        return;
    }

    if (!isValidExpiryDate(expiryDate)) {
        showError('Data de validade inválida.');
        return;
    }

    if (cvv.length < 3) {
        showError('CVV inválido.');
        return;
    }

    // Salvar dados
    formData.cardName = cardName;
    formData.cardNumber = cardNumber;
    formData.expiryDate = expiryDate;
    formData.cvv = cvv;

    // Simular processamento de pagamento
    const submitBtn = e.target.querySelector('button[type="submit"]');
    showLoading(submitBtn, true);

    setTimeout(() => {
        showLoading(submitBtn, false);
        nextStep();
    }, 3000); // 3 segundos para simular processamento
}

// Função para avançar para próxima etapa
function nextStep() {
    if (currentStep < 5) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
    }
}

// Função para voltar para etapa anterior
function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
    }
}

// Mostrar etapa específica
function showStep(stepNumber) {
    // Esconder todas as etapas
    const allSteps = document.querySelectorAll('.step');
    allSteps.forEach(step => {
        step.classList.remove('active');
    });

    // Mostrar etapa atual
    const currentStepElement = document.getElementById(`step-${stepNumber}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atualizar barra de progresso
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const currentStepSpan = document.getElementById('current-step');
    const progressPercentSpan = document.getElementById('progress-percent');

    if (progressFill && currentStepSpan && progressPercentSpan) {
        const percentage = (currentStep / 5) * 100;
        
        progressFill.style.width = `${percentage}%`;
        currentStepSpan.textContent = currentStep;
        progressPercentSpan.textContent = Math.round(percentage);
    }
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar data de validade
function isValidExpiryDate(date) {
    if (!/^\d{2}\/\d{2}$/.test(date)) return false;
    
    const [month, year] = date.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
        return false;
    }
    
    return true;
}

// Mostrar estado de loading no botão
function showLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Mostrar mensagem de erro
function showError(message) {
    // Remover erro anterior se existir
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Criar elemento de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background-color: rgba(220, 38, 38, 0.1);
        border: 1px solid rgba(220, 38, 38, 0.3);
        color: #fca5a5;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
        animation: fadeIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;

    // Inserir antes do primeiro botão do step atual
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const firstButton = currentStepElement.querySelector('.btn');
    if (firstButton) {
        firstButton.parentNode.insertBefore(errorDiv, firstButton);
    }

    // Remover erro após 5 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Mostrar mensagem de sucesso
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background-color: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        color: #86efac;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
        animation: fadeIn 0.3s ease-out;
    `;
    successDiv.textContent = message;

    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const cardContent = currentStepElement.querySelector('.card-content');
    if (cardContent) {
        cardContent.insertBefore(successDiv, cardContent.firstChild);
    }

    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// Função para debug (pode ser removida em produção)
function debugFormData() {
    console.log('Form Data:', formData);
    console.log('Current Step:', currentStep);
}

// Adicionar alguns event listeners globais para melhor UX
document.addEventListener('keydown', function(e) {
    // Permitir navegação com Enter em campos de input
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === 'INPUT') {
            const form = activeElement.closest('form');
            if (form) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                }
            }
        }
    }
});

// Prevenir envio de formulário com Enter em campos específicos
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.type === 'radio') {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    }
});

// Função para resetar o formulário (útil para testes)
function resetForm() {
    currentStep = 1;
    formData = {
        email: '',
        password: '',
        reason: '',
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    };
    
    // Limpar todos os inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    showStep(1);
    updateProgressBar();
}

// Adicionar função para simular diferentes cenários de teste
function simulateFormFill() {
    // Preencher dados de teste
    document.getElementById('email').value = 'usuario@teste.com';
    document.getElementById('password').value = 'minhasenha123';
    
    // Simular seleção de motivo
    setTimeout(() => {
        if (currentStep === 3) {
            const firstRadio = document.querySelector('input[name="reason"]');
            if (firstRadio) firstRadio.checked = true;
        }
    }, 100);
    
    // Preencher dados do cartão
    setTimeout(() => {
        if (currentStep === 4) {
            document.getElementById('card-name').value = 'Maria Silva';
            document.getElementById('card-number').value = '4532 1234 5678 9012';
            document.getElementById('expiry-date').value = '12/28';
            document.getElementById('cvv').value = '456';
        }
    }, 100);
}

// Expor algumas funções globalmente para debug
window.debugFormData = debugFormData;
window.resetForm = resetForm;
window.simulateFormFill = simulateFormFill;

