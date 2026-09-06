/**
 * Main Application Logic
 * UI Interactions, Typewriter, Project Filtering, Architecture Modals,
 * Web Audio FX, Toast Notifications, and Metrics Counter.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Web Audio API - Subtle Futuristic Sound Synthesizer
     ========================================================================== */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback or blocked by browser autoplay policy
    }
  }

  /* ==========================================================================
     2. Custom Cursor & Follower
     ========================================================================== */
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function renderFollower() {
      posX += (mouseX - posX) * 0.18;
      posY += (mouseY - posY) * 0.18;
      follower.style.left = `${posX}px`;
      follower.style.top = `${posY}px`;
      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    // Hover scale effects on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .skill-pill, .terminal-chip');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1.6)';
        follower.style.borderColor = '#00d4ff';
        follower.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = 'rgba(0, 212, 255, 0.45)';
        follower.style.backgroundColor = 'transparent';
      });
    });
  }

  /* ==========================================================================
     3. Hero Dynamic Typewriter
     ========================================================================== */
  function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter-text');
    if (!typewriterEl) return;

    const phrases = [
      'Senior .NET Core & Cloud Specialist',
      'Azure Cloud Architect & Serverless Builder',
      'Generative AI & Agentic AI Engineer',
      'High-Throughput Microservices Architect',
      'FinTech & Enterprise Solutions Developer'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function type() {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 35;
      } else {
        typewriterEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIdx === current.length) {
        typingSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* ==========================================================================
     4. Live Metric Counter
     ========================================================================== */
  function initMetricsCounter() {
    const counters = document.querySelectorAll('.metric-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((counter) => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const interval = setInterval(() => {
              count += step;
              if (count >= target) {
                counter.textContent = target;
                clearInterval(interval);
              } else {
                counter.textContent = count;
              }
            }, 35);
          });
        }
      });
    }, { threshold: 0.3 });

    const banner = document.querySelector('.metrics-banner');
    if (banner) observer.observe(banner);
  }

  /* ==========================================================================
     5. Project Filtering & Architecture Modals
     ========================================================================== */
  const projectDetails = {
    'proj-documind': {
      title: 'DocuMind — RAG Engine with Qdrant Vector DB',
      category: 'Generative AI & Vector Search',
      period: '2026 • Open Source',
      summary: 'High-performance Retrieval-Augmented Generation (RAG) conversational chatbot application engineered with .NET 10 Clean Architecture. Uses Qdrant as the primary vector database for dense embedding indexation and similarity search, combined with PDF semantic chunking and asynchronous streaming response generation.',
      architecture: `[Document Ingestion (PDF Upload)]
          │
          ▼
   [PdfService (Text Extraction & Semantic Chunking)]
          │
          ▼
   [EmbeddingService (Dense Vector Embedding)]
          │
          ▼ (gRPC High-Throughput Protocol)
   [Qdrant Vector Database (Vector Collections & Payload Index)]
          │
══════════╪══════════════════════════════════════════════════════
          │ [User Query / Chat Prompt]
          ▼
   [Cosine Similarity Search in Qdrant (Top-K Context Retrieval)]
          │
          ▼
   [ChatService - LLM Context Augmentation & Prompt Assembly]
          │
          ▼
   [Real-Time Token Streaming (IAsyncEnumerable<string>)]
          │
          ▼
   [DocuMind.Web Client Interactive Chatbot UI]`,
      impact: 'Enables sub-second semantic retrieval across complex documents with complete Clean Architecture separation (API, Application, Domain, Infrastructure, Shared).'
    },
    'proj-agentic': {
      title: 'Autonomous Enterprise AI Agent Platform',
      category: 'Generative AI & Agentic AI',
      period: '2025 - Present',
      summary: 'Designed an autonomous multi-agent orchestration platform leveraging Semantic Kernel and Azure OpenAI. Implemented automated document RAG, intelligent triage of production alert logs, and proactive code suggestion agents.',
      architecture: `[Client Request / Trigger]
          │
          ▼
   [Azure API Management (APIM)]
          │
          ▼
   [Agentic Orchestration Layer (.NET 8 + Semantic Kernel)]
          ├── Planner Agent (Task Decomposition)
          ├── Retrieval Agent (Azure AI Search + Vector Embeddings)
          ├── Tool Agent (Azure Functions + Cosmos DB Read/Write)
          └── Validator Agent (Output Guardrails & Safety)
          │
          ▼
   [Azure OpenAI Service (GPT-4o Enterprise Endpoints)]`,
      impact: 'Reduced mean incident triage time by 45% and automated routine knowledge retrieval for distributed support teams.'
    },
    'proj-blink': {
      title: 'Blink App Integration Platform',
      category: 'Azure Cloud & Serverless',
      period: '02/2025 - 07/2025',
      summary: 'Engineered an event-driven architecture integrating third-party community applications for automated access provisioning and real-time synchronization.',
      architecture: `[Third-Party Community App / Webhook]
          │
          ▼
   [Azure Service Bus Topic] (High reliability queueing)
          │
     ┌────┴───────────────────────────┐
     ▼                                ▼
[Subscription 1: Worker Service]   [Subscription 2: Notification Service]
     │                                │
     ▼                                ▼
[Azure Cosmos DB] (User Record)    [External Auth / IAM Callback]`,
      impact: 'Achieved zero data loss during high-traffic bursts, enabling instant automated provisioning across 10,000+ users.'
    },
    'proj-ldap': {
      title: 'Enterprise LDAP to LDAPS Security Migration',
      category: 'Security & Infrastructure',
      period: '10/2025 - 11/2025',
      summary: 'Architected and executed enterprise-wide migration from legacy unencrypted LDAP to SSL/TLS-encrypted LDAPS protocol for directory access and SSO authentication.',
      architecture: `[Legacy Directory Consumer]
          │ (Clear-text Port 389 - Vulnerable)
          ▼
   [Upgraded Security Gateway (TLS 1.3)]
          │ (Encrypted Port 636 SSL/TLS)
          ▼
   [Active Directory / Entra ID Domain Services]
          │
   [Encrypted Token Issuance & Certificate Authority Trust]`,
      impact: 'Elevated data security by 30% and complied with strict enterprise infosec standards and zero-trust guidelines.'
    },
    'proj-adf': {
      title: 'Azure Data Factory Real-Time Status Pipeline',
      category: 'Cloud Data & Analytics',
      period: '03/2024 - 07/2024',
      summary: 'Integrated Azure Data Factory to dynamically update activity status across complex multi-stage ETL workflows, enabling real-time observability.',
      architecture: `[Upstream Source Systems]
          │
          ▼
   [Azure Data Factory Pipelines]
          ├── Activity 1: Extract & Validate
          ├── Webhook Callback ──> [Azure Function] ──> [Real-time Status DB]
          ├── Activity 2: Transform & Load
          └── OnSuccess / OnFailure ──> [Azure Monitor / Event Grid]
          │
          ▼
   [Front-end Dashboard Tracking] (Live Operations Clarity)`,
      impact: 'Provided end-to-end transparency for previously opaque external batch runs, cutting support queries by 60%.'
    },
    'proj-mint': {
      title: 'MINT High-Scale Cloud Migration',
      category: 'Enterprise .NET & Migration',
      period: '11/2022 - 03/2023',
      summary: 'Executed comprehensive migration of terabyte-scale enterprise assets from AWS NAS to the MEDC shared drive infrastructure, accompanied by .NET MVC refactoring.',
      architecture: `[AWS NAS File Repositories]
          │
          ▼
   [Cross-Server Data Pipeline & Direct File Transfer]
          │ (Firewall rule configurations & Subnet Routing)
          ▼
   [MEDC Enterprise Shared Drive Infrastructure]
          │
   [.NET MVC Application Layer] (Updated mount points & resilient retry logic)`,
      impact: 'Seamless zero-downtime data transition with optimized cross-server firewall configs and enhanced network throughput.'
    },
    'proj-netcore': {
      title: '.NET Core 2.1 to 6.0/8 Modernization',
      category: 'Enterprise .NET & Modernization',
      period: '02/2022 - 03/2022',
      summary: 'Modernized mission-critical legacy applications to modern .NET Core, eliminating deprecated dependencies and optimizing memory throughput.',
      architecture: `[Legacy ASP.NET Core 2.1 Codebase]
          ├── Outdated ORM mappings & synchronous API blocks
          │
          ▼ [Migration & Modernization Engine]
          ├── Upgraded to Modern C# & .NET 6/8 runtime
          ├── Implemented Async/Await non-blocking pipelines
          ├── Dependency Injection refactoring
          └── Comprehensive xUnit Test Suite
          │
          ▼
   [High-Performance Cloud-Ready Microservice]`,
      impact: 'Delivered a 35% reduction in CPU utilization, improved server memory overhead, and enhanced long-term maintainability.'
    },
    'proj-payments': {
      title: 'FinTech Multi-Gateway Payment Engine',
      category: 'FinTech & Integrations',
      period: '03/2020 - 02/2022',
      summary: 'Engineered unified payment orchestration engine integrating TrueLayer (Open Banking), Stripe, Instamojo, Unipaas, and PayPal for accounting software (nomi.co.uk).',
      architecture: `[Accounting & Invoicing Client]
          │
          ▼
   [.NET Payment Gateway Router]
          ├── Factory Pattern Adapter Layer
          │    ├── TrueLayer (UK Open Banking)
          │    ├── Stripe (Card / Subscriptions)
          │    ├── PayPal (Global Wallets)
          │    └── Unipaas & Instamojo
          │
          ▼
   [Webhook Ingestion & Idempotent Ledger Transaction Store]`,
      impact: 'Processed thousands of daily financial transactions with complete reconciliation and automated double-entry ledger bookkeeping.'
    },
    'proj-sweety': {
      title: 'Sweety - AI Voice Desktop Assistant',
      category: 'Voice AI & Innovation',
      period: 'Personal Innovation',
      summary: 'Engineered a Windows desktop voice-activated AI personal assistant that processes natural voice commands to automate 50% of routine computer workflows.',
      architecture: `[Microphone Voice Input]
          │
          ▼
   [Speech Recognition & Intent Parser]
          │
          ▼
   [Task Execution Dispatcher (C# / Windows API)]
          ├── Application Launch & Window Management
          ├── Clipboard Automation (Smart Copy/Paste)
          ├── Browser Search & File Manipulation
          └── Text-to-Speech Audio Feedback`,
      impact: 'Demonstrated early passion for Agentic AI and hands-free computer interaction, boosting personal productivity and workflow velocity.'
    }
  };

  function initProjects() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playTone(600, 'sine', 0.05, 0.03);
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach((card) => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat.includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });

    // Detail Modals
    const modalBackdrop = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalPeriod = document.getElementById('modal-period');
    const modalSummary = document.getElementById('modal-summary');
    const modalArch = document.getElementById('modal-architecture');
    const modalImpact = document.getElementById('modal-impact');

    const detailBtns = document.querySelectorAll('.btn-details');
    detailBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        playTone(750, 'triangle', 0.06, 0.04);
        const projId = btn.getAttribute('data-proj-id');
        const data = projectDetails[projId];
        if (!data || !modalBackdrop) return;

        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalPeriod.textContent = data.period;
        modalSummary.textContent = data.summary;
        modalArch.textContent = data.architecture;
        modalImpact.textContent = data.impact;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        playTone(400, 'sine', 0.05, 0.03);
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          modalBackdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ==========================================================================
     5b. Capgemini Award Certificate Lightbox Modal
     ========================================================================== */
  function openAwardModal() {
    playTone(550, 'sine', 0.08, 0.04);
    const awardModal = document.getElementById('award-modal');
    if (awardModal) {
      awardModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAwardModal() {
    playTone(400, 'sine', 0.05, 0.03);
    const awardModal = document.getElementById('award-modal');
    if (awardModal) {
      awardModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.openAwardModal = openAwardModal;
  window.closeAwardModal = closeAwardModal;

  function initAwardModal() {
    const awardModal = document.getElementById('award-modal');
    const closeBtn = document.getElementById('award-modal-close-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeAwardModal);
    }

    if (awardModal) {
      awardModal.addEventListener('click', (e) => {
        if (e.target === awardModal) {
          closeAwardModal();
        }
      });
    }

    // Global ESC key listener to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAwardModal();
        const projectModal = document.getElementById('project-modal');
        if (projectModal && projectModal.classList.contains('active')) {
          projectModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }

  /* ==========================================================================
     6. Toast Notification & Copy-to-Clipboard
     ========================================================================== */
  function showToast(message) {
    playTone(880, 'sine', 0.08, 0.04);
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.btn-copy');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied to clipboard: ${textToCopy}`);
          }).catch(() => {
            showToast(`Selected: ${textToCopy}`);
          });
        }
      });
    });
  }

  function initResumeDownload() {
    const resumeLinks = document.querySelectorAll('a[href*="Vipin_Kumar_Resume.pdf"]');
    resumeLinks.forEach((link) => {
      link.addEventListener('click', () => {
        playTone(523.25, 'sine', 0.08, 0.05);
        setTimeout(() => playTone(659.25, 'sine', 0.08, 0.05), 80);
        setTimeout(() => playTone(783.99, 'sine', 0.12, 0.06), 160);
        showToast("📥 Downloading Vipin Kumar's Official Resume (PDF)...");
      });
    });
  }

  /* ==========================================================================
     7. Sound Toggle & Navbar Scroll
     ========================================================================== */
  function initNavAndSound() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          playTone(660, 'sine', 0.08, 0.05);
          soundIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
          showToast('Sound Effects Enabled');
        } else {
          soundIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
          showToast('Sound Effects Muted');
        }
      });
    }

    // Scroll Navbar Effect & Active Link Spy
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Scroll Spy
      let currentSection = '';
      sections.forEach((sec) => {
        const sectionTop = sec.offsetTop - 120;
        const sectionHeight = sec.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });

    // Mobile Hamburger & Drawer Controls
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const mobileAiTrigger = document.getElementById('btn-mobile-ai');

    function closeMobileNav() {
      if (navMenu) navMenu.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    function toggleMobileNav() {
      if (!navMenu || !hamburger) return;
      playTone(520, 'sine', 0.06, 0.03);
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        navMenu.classList.add('open');
        hamburger.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    const drawerCloseBtn = document.getElementById('nav-drawer-close-btn');

    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileNav);
    }

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeMobileNav);
    }

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close when tapping anywhere outside the nav drawer
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('open')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
          closeMobileNav();
        }
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    if (mobileAiTrigger) {
      mobileAiTrigger.addEventListener('click', () => {
        closeMobileNav();
        playTone(720, 'sine', 0.08, 0.04);
        const termSec = document.getElementById('ai-agent-section');
        if (termSec) {
          termSec.scrollIntoView({ behavior: 'smooth' });
          const termInput = document.getElementById('terminal-input');
          if (termInput) setTimeout(() => termInput.focus(), 600);
        }
      });
    }

    // Scroll to AI terminal button
    const terminalTrigger = document.getElementById('btn-scroll-ai');
    if (terminalTrigger) {
      terminalTrigger.addEventListener('click', () => {
        playTone(720, 'sine', 0.08, 0.04);
        const termSec = document.getElementById('ai-agent-section');
        if (termSec) {
          termSec.scrollIntoView({ behavior: 'smooth' });
          const termInput = document.getElementById('terminal-input');
          if (termInput) setTimeout(() => termInput.focus(), 600);
        }
      });
    }
  }

  /* ==========================================================================
     8. Live IST Time Indicator
     ========================================================================== */
  function updateLiveTime() {
    const timeEl = document.getElementById('live-time');
    if (!timeEl) return;

    function tick() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const now = new Date().toLocaleTimeString('en-US', options);
      timeEl.textContent = `${now} IST (Ranchi / Pune)`;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ==========================================================================
     9. Contact Form Simulation
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      playTone(800, 'triangle', 0.1, 0.05);

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Simulated instant delivery
      showToast(`Thank you, ${name}! Your message has been prepared for Vipin Kumar.`);
      form.reset();

      // Open mailto fallback with pre-populated fields
      setTimeout(() => {
        const mailtoUrl = `mailto:dev.vipinkumar2@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AContact%20Email:%20${encodeURIComponent(email)}`;
        window.open(mailtoUrl, '_blank');
      }, 800);
    });
  }

  /* ==========================================================================
     10. Toon Developer Animation & View Switcher
     ========================================================================== */
  function initToonDeveloperAnimation() {
    const viewToonBtn = document.getElementById('view-toon-btn');
    const view3dBtn = document.getElementById('view-3d-btn');
    const toonView = document.getElementById('toon-dev-view');
    const hero3dView = document.getElementById('hero-3d-view');
    const tiltCard = document.getElementById('toon-tilt-card');
    const hudCode = document.getElementById('hud-code-stream');

    if (!viewToonBtn || !view3dBtn || !toonView || !hero3dView) return;

    // View Switcher logic
    viewToonBtn.addEventListener('click', () => {
      playTone(550, 'sine', 0.06, 0.04);
      viewToonBtn.classList.add('active');
      view3dBtn.classList.remove('active');
      toonView.classList.add('active');
      hero3dView.classList.remove('active');
    });

    view3dBtn.addEventListener('click', () => {
      playTone(700, 'sine', 0.06, 0.04);
      view3dBtn.classList.add('active');
      viewToonBtn.classList.remove('active');
      hero3dView.classList.add('active');
      toonView.classList.remove('active');
    });

    // 3D Tilt Effect on mouse movement
    if (tiltCard) {
      const container = tiltCard.parentElement;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        tiltCard.style.animation = 'none'; // pause float while user moves mouse
        tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      container.addEventListener('mouseleave', () => {
        tiltCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        tiltCard.style.animation = 'toonFloat 6s ease-in-out infinite';
      });

      // Click on toon image for rapid typing sound & toast
      tiltCard.addEventListener('click', () => {
        playTone(1100, 'sawtooth', 0.04, 0.03);
        setTimeout(() => playTone(880, 'square', 0.04, 0.03), 70);
        setTimeout(() => playTone(1320, 'sine', 0.05, 0.04), 140);
        showToast('👨‍💻 Vipin is live compiling: .NET 8 Microservices & Agentic AI!');
      });
    }

    // Dynamic Live Code Streamer
    if (hudCode) {
      const codeSnippets = [
        `<span class="hud-keyword">var</span> agent = <span class="hud-func">new</span> <span class="hud-type">AgenticWorkflow</span>();<br/><span class="hud-keyword">await</span> agent.<span class="hud-func">ProcessEventAsync</span>(azureServiceBus);<br/><span class="hud-comment">// ✨ 100% Production Uptime Mindset</span>`,
        `<span class="hud-keyword">var</span> kernel = <span class="hud-type">Kernel</span>.<span class="hud-func">CreateBuilder</span>().<span class="hud-func">AddAzureOpenAIChat</span>().<span class="hud-func">Build</span>();<br/><span class="hud-keyword">var</span> triage = <span class="hud-keyword">await</span> kernel.<span class="hud-func">InvokePromptAsync</span>(incidentLog);<br/><span class="hud-comment">// 🚀 Mean Incident Triage -45%</span>`,
        `<span class="hud-keyword">var</span> ldaps = <span class="hud-func">new</span> <span class="hud-type">LdapsConnection</span>(vaultCert);<br/><span class="hud-keyword">await</span> ldaps.<span class="hud-func">AuthenticateEncryptedAsync</span>();<br/><span class="hud-comment">// 🛡️ Enterprise Security Boosted +30%</span>`
      ];

      let snippetIndex = 0;
      setInterval(() => {
        snippetIndex = (snippetIndex + 1) % codeSnippets.length;
        hudCode.style.opacity = '0';
        setTimeout(() => {
          hudCode.innerHTML = codeSnippets[snippetIndex];
          hudCode.style.opacity = '1';
        }, 300);
      }, 4500);
    }
  }

  /* ==========================================================================
     11. Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initTypewriter();
    initMetricsCounter();
    initProjects();
    initCopyButtons();
    initResumeDownload();
    initNavAndSound();
    updateLiveTime();
    initContactForm();
    initToonDeveloperAnimation();
    initAwardModal();

    if (window.initAIAgent) {
      window.initAIAgent();
    }
  });

})();
