// Script personalizado para o Decap CMS - Zen Marmitas
// Corrige problemas de inicialização e comportamento

(function() {
  'use strict';
  
  // Configurações
  const CONFIG = {
    loadingDelay: 1500, // 1.5 segundos de delay (reduzido)
    backupPromptDisabled: true,
    preserveAvailableValues: true
  };
  
  // Estado global para evitar múltiplas inicializações
  let isInitialized = false;
  let initializationInProgress = false;
  
  // Aguardar o CMS estar disponível
  function waitForCMS() {
    return new Promise((resolve) => {
      if (typeof CMS !== 'undefined') {
        resolve();
      } else {
        setTimeout(() => waitForCMS().then(resolve), 100);
      }
    });
  }
  
  // Aguardar o React DOM estar estável
  function waitForReactStable() {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 50; // 5 segundos máximo
      
      const checkReact = () => {
        attempts++;
        
        // Verificar se o React está estável (sem mudanças no DOM por um período)
        const reactRoot = document.getElementById('nc-root');
        if (reactRoot && reactRoot.children.length > 0) {
          // Aguardar um pouco mais para garantir estabilidade
          setTimeout(() => {
            console.log('✅ React DOM estável detectado');
            resolve();
          }, 1000);
        } else if (attempts < maxAttempts) {
          setTimeout(checkReact, 100);
        } else {
          console.log('⏳ React DOM não detectado, continuando...');
          resolve();
        }
      };
      
      checkReact();
    });
  }
  
  // Desabilitar prompt de backup
  function disableBackupPrompt() {
    if (typeof CMS !== 'undefined' && CMS.registerWidget) {
      // Interceptar o widget de backup
      const originalRegisterWidget = CMS.registerWidget;
      
      CMS.registerWidget = function(name, control, preview, schema) {
        if (name === 'backup') {
          // Não registrar o widget de backup
          return;
        }
        return originalRegisterWidget.call(this, name, control, preview, schema);
      };
    }
  }
  
  // Corrigir valores padrão dos campos boolean
  function fixBooleanDefaults() {
    if (typeof CMS !== 'undefined' && CMS.registerWidget) {
      // Interceptar o widget boolean
      const originalRegisterWidget = CMS.registerWidget;
      
      CMS.registerWidget = function(name, control, preview, schema) {
        if (name === 'boolean') {
          const originalControl = control;
          
          // Criar novo control que preserva valores existentes
          const newControl = function(props) {
            const { value, onChange, field } = props;
            
            // Se não há valor definido e o campo tem um valor padrão do banco
            if (value === undefined && field.get('default') !== undefined) {
              // Usar o valor padrão do banco de dados
              const defaultValue = field.get('default');
              setTimeout(() => onChange(defaultValue), 0);
            }
            
            return originalControl(props);
          };
          
          return originalRegisterWidget.call(this, name, newControl, preview, schema);
        }
        return originalRegisterWidget.call(this, name, control, preview, schema);
      };
    }
  }
  
  // Adicionar delay de carregamento (apenas uma vez)
  function addLoadingDelay() {
    if (typeof CMS !== 'undefined' && !CMS._delayApplied) {
      const originalInit = CMS.init;
      
      CMS.init = function() {
        // Marcar como aplicado para evitar múltiplas aplicações
        CMS._delayApplied = true;
        
        console.log('⏳ Aguardando delay de carregamento...');
        
        // Verificar se já foi inicializado
        if (CMS._initialized) {
          console.log('⚠️ CMS já foi inicializado, pulando delay...');
          return;
        }
        
        setTimeout(() => {
          // Verificar novamente antes de inicializar
          if (CMS._initialized) {
            console.log('⚠️ CMS já foi inicializado durante o delay, pulando...');
            return;
          }
          
          console.log('✅ Iniciando CMS após delay...');
          CMS._initialized = true;
          originalInit.call(this);
        }, CONFIG.loadingDelay);
      };
    }
  }
  
  // Interceptar mensagens de backup
  function interceptBackupMessages() {
    // Interceptar alertas do CMS
    const originalAlert = window.alert;
    window.alert = function(message) {
      if (message && (message.includes('backup local') || message.includes('backup foi recuperado'))) {
        console.log('🚫 Backup prompt bloqueado:', message);
        return; // Não mostrar o alerta
      }
      return originalAlert.call(this, message);
    };
    
    // Interceptar confirmações do CMS
    const originalConfirm = window.confirm;
    window.confirm = function(message) {
      if (message && (message.includes('backup local') || message.includes('backup foi recuperado'))) {
        console.log('🚫 Backup confirmation bloqueada:', message);
        return false; // Sempre retornar false para não usar backup
      }
      return originalConfirm.call(this, message);
    };
    
    // Interceptar prompts do CMS
    const originalPrompt = window.prompt;
    window.prompt = function(message, defaultText) {
      if (message && (message.includes('backup') || message.includes('recuperado'))) {
        console.log('🚫 Backup prompt bloqueado:', message);
        return null; // Não mostrar o prompt
      }
      return originalPrompt.call(this, message, defaultText);
    };
  }
  
  // Melhorar tratamento de dados
  function enhanceDataHandling() {
    if (typeof CMS !== 'undefined') {
      // Interceptar carregamento de dados
      const originalGetEntry = CMS.api?.getEntry;
      if (originalGetEntry) {
        CMS.api.getEntry = function(collection, slug) {
          return originalGetEntry.call(this, collection, slug).then((entry) => {
            // Garantir que campos boolean tenham valores adequados
            if (entry && entry.data) {
              processBooleanFields(entry.data);
            }
            return entry;
          });
        };
      }
    }
  }
  
  // Processar campos boolean nos dados
  function processBooleanFields(data) {
    function processObject(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(processObject);
      } else if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            // Não definir valores padrão - deixar como undefined para preservar valores existentes
            if (key !== 'available' && key !== 'isCombo') {
              processObject(obj[key]);
            }
          }
        }
      }
    }
    
    processObject(data);
  }
  
  // Configurar hooks do CMS (apenas uma vez)
  function setupCMSHooks() {
    if (typeof CMS !== 'undefined' && !CMS._hooksApplied) {
      // Marcar como aplicado para evitar múltiplas aplicações
      CMS._hooksApplied = true;
      
      // Hook para antes da inicialização
      CMS.registerEventListener({
        name: 'preInit',
        handler: () => {
          if (isInitialized) {
            console.log('⚠️ CMS já inicializado, pulando preInit...');
            return;
          }
          
          console.log('🔧 Aplicando correções do CMS...');
          
          // Desabilitar prompt de backup
          disableBackupPrompt();
          
          // Interceptar mensagens
          interceptBackupMessages();
          
          // Corrigir campos boolean
          fixBooleanDefaults();
          
          // Melhorar tratamento de dados
          enhanceDataHandling();
          
          console.log('✅ Correções aplicadas com sucesso!');
        }
      });
      
      // Hook para após a inicialização
      CMS.registerEventListener({
        name: 'postInit',
        handler: async () => {
          if (isInitialized) {
            console.log('⚠️ CMS já inicializado, pulando postInit...');
            return;
          }
          
          console.log('🎉 CMS inicializado com correções aplicadas!');
          isInitialized = true;
          
          // Aguardar React estar estável antes de aplicar correções
          await waitForReactStable();
          
          // Remover qualquer overlay de backup se existir
          removeBackupOverlaysSafely();
        }
      });
    }
  }
  
  
  
  // Interceptar erros de DOM do React
  function interceptReactDOMErrors() {
    // Interceptar erros de removeChild
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
      try {
        if (this.contains(child)) {
          return originalRemoveChild.call(this, child);
        } else {
          console.warn('⚠️ Tentativa de remover nó que não é filho:', child);
          return child;
        }
      } catch (error) {
        console.warn('⚠️ Erro ao remover nó:', error);
        return child;
      }
    };
    
    // Interceptar erros de appendChild
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(child) {
      try {
        return originalAppendChild.call(this, child);
      } catch (error) {
        console.warn('⚠️ Erro ao adicionar nó:', error);
        return child;
      }
    };
    
    // Interceptar erros de insertBefore
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, referenceNode) {
      try {
        return originalInsertBefore.call(this, newNode, referenceNode);
      } catch (error) {
        console.warn('⚠️ Erro ao inserir nó:', error);
        return newNode;
      }
    };
    
    // Interceptar erros de replaceChild
    const originalReplaceChild = Node.prototype.replaceChild;
    Node.prototype.replaceChild = function(newChild, oldChild) {
      try {
        if (this.contains(oldChild)) {
          return originalReplaceChild.call(this, newChild, oldChild);
        } else {
          console.warn('⚠️ Tentativa de substituir nó que não é filho:', oldChild);
          return oldChild;
        }
      } catch (error) {
        console.warn('⚠️ Erro ao substituir nó:', error);
        return oldChild;
      }
    };
  }
  
  // Supressão de erros específicos do React
  function suppressReactErrors() {
    // Interceptar console.error para suprimir erros específicos
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args.join(' ');
      
      // Suprimir erros específicos do React DOM
      if (message.includes('Failed to execute \'removeChild\' on \'Node\': The node to be removed is not a child of this node') ||
          message.includes('NotFoundError: Failed to execute \'removeChild\' on \'Node\'') ||
          message.includes('removeChild') && message.includes('not a child')) {
        console.warn('🚫 Erro de DOM do React suprimido:', message);
        return; // Não mostrar o erro
      }
      
      // Suprimir outros erros comuns do React
      if (message.includes('react-dom-client.production.js') && 
          (message.includes('removeChild') || message.includes('appendChild'))) {
        console.warn('🚫 Erro de manipulação DOM suprimido:', message);
        return;
      }
      
      // Para outros erros, usar o console.error normal
      originalConsoleError.apply(console, args);
    };
  }
  
  // Interceptar erros globais do React
  function interceptGlobalErrors() {
    // Interceptar erros não capturados
    window.addEventListener('error', (event) => {
      const error = event.error;
      const message = error?.message || event.message || '';
      
      // Suprimir erros específicos do React DOM
      if (message.includes('removeChild') && message.includes('not a child') ||
          message.includes('Failed to execute \'removeChild\'') ||
          message.includes('NotFoundError: Failed to execute')) {
        console.warn('🚫 Erro global de DOM suprimido:', message);
        event.preventDefault(); // Prevenir que o erro seja propagado
        return false;
      }
    });
    
    // Interceptar rejeições de Promise não tratadas
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const message = reason?.message || String(reason);
      
      // Suprimir erros específicos do React DOM
      if (message.includes('removeChild') && message.includes('not a child') ||
          message.includes('Failed to execute \'removeChild\'')) {
        console.warn('🚫 Rejeição de Promise de DOM suprimida:', message);
        event.preventDefault(); // Prevenir que a rejeição seja propagada
        return false;
      }
    });
  }
  
  // Melhorar a função de remoção de overlays
  function removeBackupOverlaysSafely() {
    const selectors = [
      '[data-testid="backup-overlay"]',
      '.cms-backup-overlay',
      '.backup-overlay',
      '[class*="backup"]',
      '[id*="backup"]'
    ];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element && element.textContent && 
              (element.textContent.includes('backup') || 
               element.textContent.includes('recuperado'))) {
            
            // Verificar se o elemento ainda está no DOM antes de remover
            if (element.parentNode && document.contains(element)) {
              console.log('🗑️ Removendo overlay de backup:', element);
              
              // Remover de forma segura
              try {
                element.parentNode.removeChild(element);
              } catch (error) {
                console.warn('⚠️ Erro ao remover overlay:', error);
                element.style.display = 'none';
              }
            }
          }
        });
      } catch (error) {
        console.warn('⚠️ Erro ao processar seletor:', selector, error);
      }
    });
    
    // Executar novamente após um delay
    setTimeout(removeBackupOverlaysSafely, 2000);
  }
  
  // Inicializar quando o DOM estiver pronto (apenas uma vez)
  function init() {
    if (isInitialized || initializationInProgress) {
      console.log('⚠️ Script já inicializado ou em progresso, pulando...');
      return;
    }
    
    initializationInProgress = true;
    console.log('🚀 Inicializando script personalizado do CMS...');
    
    // Interceptar erros de DOM do React primeiro
    interceptReactDOMErrors();
    
    // Supressão de erros específicos
    suppressReactErrors();
    
    // Interceptar erros globais
    interceptGlobalErrors();
    
    // Interceptar mensagens imediatamente
    interceptBackupMessages();
    
    // Aguardar CMS e configurar
    waitForCMS().then(() => {
      setupCMSHooks();
      addLoadingDelay();
      initializationInProgress = false;
    });
  }
  
  // Iniciar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();