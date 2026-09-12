/**
 * VipinAI - Interactive Agentic AI Copilot & Terminal
 * Provides real-time intelligent responses about Vipin Kumar's technical expertise,
 * enterprise cloud projects, .NET architecture, GenAI & Agentic AI workflows, and contact info.
 */

(function () {
  'use strict';

  // Knowledge Base extracted from Vipin Kumar's CV and expertise
  const knowledgeBase = [
    {
      keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum vitae', 'profile download'],
      response: `📄 **Download Vipin Kumar's Official Resume (PDF):**
You can download Vipin's full verified 2-page curriculum vitae directly here:
👉 **[Download Vipin_Kumar_Resume.pdf](assets/Vipin_Kumar_Resume.pdf)**
It includes his full .NET Core, Azure Cloud, and GenAI/Agentic AI experience at Capgemini, Cognizant, and Outbooks, along with all certified credentials and achievements!`
    },
    {
      keywords: ['summary', 'about', 'who is', 'overview', 'profile', 'introduce'],
      response: `**Vipin Kumar** is a Senior Application Developer & Cloud Architect with **5+ years of hands-on enterprise experience** in C#, .NET Core/8, ASP.NET MVC, Microservices, and Azure Cloud services. He also specializes in **Generative AI & Agentic AI workflows**, integrating LLMs, Autonomous Agents, and RAG pipelines into enterprise systems across Insurance, FinTech, and Food industry domains.`
    },
    {
      keywords: ['gen ai', 'genai', 'agentic', 'agent', 'llm', 'ai', 'copilot', 'semantic kernel', 'rag', 'openai'],
      response: `⚡ **Generative AI & Agentic AI Expertise:**
- **Agentic Workflows**: Designing autonomous multi-agent systems using Semantic Kernel and LangChain architectures.
- **Azure OpenAI**: Deploying GPT-4/o-series models with enterprise RBAC, private endpoints, and token usage optimization.
- **RAG Architectures**: Building retrieval-augmented generation pipelines using vector embeddings, Cosmos DB, and hybrid search.
- **AI-Assisted Engineering**: Advanced workflow automation, GitHub Copilot acceleration, and custom LLM root-cause diagnostic agents.
- **Voice AI Project**: Engineered *'Sweety'*, a Windows desktop AI voice assistant automating OS actions and workflows.`
    },
    {
      keywords: ['azure', 'cloud', 'functions', 'service bus', 'cosmos', 'serverless', 'devops'],
      response: `☁️ **Microsoft Azure Cloud Architecture:**
- **Event-Driven & Messaging**: Azure Service Bus (queues & topics), Event Hubs, Azure Functions (serverless workers).
- **Compute & APIs**: Azure App Service, API Management (APIM), Logic Apps for business orchestration.
- **Databases & Cache**: Azure Cosmos DB (NoSQL), Azure SQL, Redis Distributed Cache.
- **Monitoring & Security**: Azure Key Vault, Azure Monitor, Application Insights, Azure Active Directory / Entra ID.
- **Data Engineering**: Azure Data Factory (ADF) pipelines for automated ETL and real-time activity status tracking.`
    },
    {
      keywords: ['dotnet', '.net', 'c#', 'csharp', 'asp.net', 'backend', 'api', 'framework', 'mvc'],
      response: `💻 **.NET & Backend Engineering:**
- **C# & .NET Core / .NET 8**: High-performance RESTful APIs, asynchronous programming, LINQ, dependency injection.
- **Architecture**: Clean Architecture, Onion Architecture, Microservices, Domain-Driven Design (DDD).
- **ORM & Data Access**: Entity Framework Core, NHibernate, Dapper, SQL optimization.
- **Real-Time & Testing**: SignalR real-time sockets, xUnit unit testing with high code coverage, Mocking (Moq).`
    },
    {
      keywords: ['experience', 'capgemini', 'cognizant', 'outbooks', 'career', 'history', 'work'],
      response: `🏢 **Work History & Experience:**
1. **Capgemini Technology Services** (01/2025 - Present) | *Consultant*
   - Architecting enterprise-grade .NET Core & Azure systems, event-driven messaging, xUnit quality enforcement, production RCA.
   - 🏆 **Awarded Certificate of Appreciation** for Outstanding Contribution in Restaurant Product Development & Deployment Support (McDonald's client engagement), signed by Vijay Gupta (Sr. Director, Capgemini India).
2. **Cognizant** (02/2022 - 01/2025) | *Software Engineer*
   - Cloud apps using Azure Functions, Service Bus, Logic Apps; Azure DevOps CI/CD pipeline automation; consecutive highest performance ratings.
3. **Outbooks Outsourcing** (03/2020 - 02/2022) | *DotNet Developer*
   - FinTech & accounting platforms, double-entry bookkeeping, multi-payment gateway integrations (Stripe, TrueLayer, PayPal).`
    },
    {
      keywords: ['yukti', 'sre', 'incident', 'remediation', 'copilot', 'qdrant rag'],
      response: `💡 **Yukti (युक्ति) — Enterprise SRE & Incident Remediation Copilot:**
- **Live Web App**: [yukti.runasp.net](https://yukti.runasp.net/)
- **Core Purpose**: Sanskrit for *"strategic ingenuity / remedy"* — an intelligent SRE AI Agent built from the ground up to drastically accelerate Mean Time to Recovery (MTTR) and automate enterprise incident response.
- **Backend & Orchestration**: C# | .NET 8 Web API | Microsoft Semantic Kernel 1.80.
- **Vector Database**: Qdrant Cloud (768-dimensional Cosine similarity) indexing historical outages and post-mortems.
- **5-Phase Remediation Playbook**: Synthesizes structured playbooks: Impact, RCA, Immediate Mitigation, Long-Term Remediation, and Preventive Observability.
- **Hybrid Dual-Model Reasoning**: Cloud inference via Groq & Google Gemini (GPT-OSS 120B / Gemini Flash) + Edge Privacy via local Ollama (\`qwen3:8b\`) with zero data egress.
- **Unified 768d Embeddings**: Dual engine support with Google Gemini Embeddings (Matryoshka Representation Learning) and local \`nomic-embed-text\`, plus vector verification sandbox.
- **Ingestion Studio**: Ingest single incidents, bulk JSON arrays, or multi-tab Excel (\`.xlsx\`) files with schema validation.
- **HITL Jira Operations**: Triages and creates Jira tickets via native tool calls guarded by cryptographic approval tokens.
- **Executive Reporting**: Dynamic export to multi-sheet Excel (\`ClosedXML\`) and executive PDF reports (\`QuestPDF\`).
- **Real-Time Streaming**: Server-Sent Events (SSE) streaming live thought signatures and tool trace aggregators.`
    },
    {
      keywords: ['gcp', 'google cloud', 'compute engine', 'bigquery', 'iis', 'cloud migration', 'load balancer'],
      response: `☁️ **Azure to Google Cloud (GCP) .NET Enterprise Migration:**
- **Workload**: Mission-critical enterprise .NET web applications & microservices migrated from Microsoft Azure to Google Cloud Platform (GCP).
- **Compute Engine (VM)**: Windows Server instances deployed in multi-zone Managed Instance Groups (MIGs) with automated health checks, auto-healing, and persistent SSD storage.
- **IIS Web Server**: Automated Internet Information Services (IIS) setup, tuned application pools, URL Rewrite, ARR, and ASP.NET Core runtime hosting with TLS 1.3.
- **Google BigQuery**: High-speed streaming ingestion of application telemetry and audit logs using the \`Google.Cloud.BigQuery.V2\` .NET SDK with partitioned/clustered tables.
- **Cloud Load Balancing**: External Global Application Load Balancer with Google-managed SSL certificates, multi-zone failover, and Cloud Armor WAF security.
- **Networking & Security**: Custom VPC design, private subnets, Cloud Router, Cloud NAT for secure egress without public IPs, and Private Google Access.`
    },
    {
      keywords: ['documind', 'qdrant', 'vector', 'rag chatbot', 'document ai'],
      response: `🧠 **DocuMind — Enterprise RAG & Vector Intelligence:**
- **Repository**: [github.com/kumarvpn/DocuMind](https://github.com/kumarvpn/DocuMind)
- **Architecture**: Modern **.NET 10 / C# Clean Architecture** (Api, Application, Domain, Infrastructure, Shared, Web).
- **Vector Database**: Integrated **Qdrant** via high-throughput gRPC for vector indexing and cosine similarity search.
- **RAG Pipeline**: Automated semantic PDF document chunking and dense embeddings generation.
- **Streaming Response**: Real-time asynchronous token streaming via \`IAsyncEnumerable<string>\` for interactive conversational Q&A.`
    },
    {
      keywords: ['projects', 'blink', 'ldap', 'mint', 'payment', 'sweety', 'data factory', 'migration', 'gcp'],
      response: `🚀 **Key Enterprise & Open Source Projects:**
1. **Yukti (युक्ति)**: Enterprise SRE & Incident Copilot with .NET 8, Semantic Kernel, Qdrant Cloud & Hybrid LLMs ([Live App](https://yukti.runasp.net/)).
2. **DocuMind**: RAG chatbot with Qdrant vector DB & .NET 10 Clean Architecture ([GitHub](https://github.com/kumarvpn/DocuMind)).
3. **Autonomous Enterprise AI Agent Platform**: Semantic Kernel & Azure OpenAI multi-agent system.
4. **Blink App Integration**: Event-driven access provisioning with Azure Service Bus & Cosmos DB.
5. **Azure to Google Cloud (GCP) .NET Migration**: Enterprise zero-downtime migration via Compute Engine, IIS, BigQuery, Global Cloud LB & VPC.
6. **LDAP to LDAPS Migration**: Enhanced enterprise security posture by **30%** via encrypted authentication.
7. **Data Factory Pipeline**: Automated real-time processing status tracking for operational transparency.
8. **MINT Enterprise Migration**: High-volume migration from AWS NAS to MEDC shared infrastructure.
9. **.NET Core 2.1 to 6.0/8**: Complete modernization of legacy systems for high throughput.
10. **Multi-Gateway Payment Engine**: Integrated TrueLayer, Stripe, PayPal, Instamojo for nomi.co.uk.
11. **Sweety Voice AI**: Windows AI personal assistant automating 50% of routine PC tasks.`
    },
    {
      keywords: ['achievement', 'award', 'rating', 'hero', 'recognition', 'certifications', 'cert', 'capgemini award', 'mcdonalds', 'appreciation'],
      response: `🏆 **Awards & Verified Honors:**
- 🥇 **Certificate of Appreciation (Capgemini × McDonald's)**: Conferred for Outstanding Contribution in Restaurant Product Development & Deployment Support across enterprise restaurant systems, signed by Vijay Gupta (Sr. Director, Capgemini India).
- ⭐ **Consecutive Highest Performance Rating**: Ranked top performer for 2 consecutive years at Cognizant Technology Solutions.
- 🎖️ **Hero Of The Company**: Awarded for exceptional contributions in software development and R&D.
- 📜 **AI-102**: Microsoft Certified Azure AI Engineer Associate.
- 📜 **AZ-900**: Microsoft Certified Azure Fundamentals.
- 📜 **OCEAN .NET Core Practitioner**: Capgemini certified .NET Core practitioner.`
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'interview', 'github', 'location', 'linkedin'],
      response: `📬 **Connect with Vipin Kumar:**
- **Email**: [dev.vipinkumar2@gmail.com](mailto:dev.vipinkumar2@gmail.com)
- **Phone**: [+91 7782876781](tel:+917782876781)
- **LinkedIn**: [linkedin.com/in/vipin-kumar-1938b9170](https://www.linkedin.com/in/vipin-kumar-1938b9170)
- **GitHub**: [github.com/kumarvpn](https://github.com/kumarvpn)
- **Locations**: Jharkhand, Ranchi (Home) / Pune, India (Work Hub)
- **Status**: Open for Senior .NET, Azure Cloud, and AI Engineering opportunities!`
    },
    {
      keywords: ['education', 'degree', 'college', 'mca', 'bca', 'university'],
      response: `🎓 **Education:**
- **MCA (Master of Computer Applications)**: Subharti University (11/2019 - 04/2022)
- **BCA (Bachelor of Computer Applications)**: Dr C V Raman University, Bilaspur (05/2016 - 04/2019)`
    }
  ];

  function initAIAgent() {
    const terminalBody = document.getElementById('terminal-body');
    const inputField = document.getElementById('terminal-input');
    const sendBtn = document.getElementById('terminal-send');
    const chips = document.querySelectorAll('.terminal-chip');

    if (!terminalBody || !inputField) return;

    // Helper: append message
    function appendMessage(sender, text, isMarkdown = true) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `terminal-msg ${sender}`;

      const prefixSpan = document.createElement('span');
      prefixSpan.className = `msg-prefix ${sender}-prefix`;
      prefixSpan.textContent = sender === 'user' ? 'visitor@guest:~$' : 'vipin-ai:~$';

      const contentSpan = document.createElement('div');
      contentSpan.className = 'msg-content';

      if (sender === 'user') {
        contentSpan.textContent = text;
        msgDiv.appendChild(prefixSpan);
        msgDiv.appendChild(contentSpan);
        terminalBody.appendChild(msgDiv);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      } else {
        // Typing simulation for agent response
        msgDiv.appendChild(prefixSpan);
        msgDiv.appendChild(contentSpan);
        terminalBody.appendChild(msgDiv);

        // Convert simple markdown (bold, bullets, links) to HTML
        let formatted = text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #00d4ff; text-decoration: underline;">$1</a>')
          .replace(/\n/g, '<br/>');

        contentSpan.innerHTML = formatted;
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }

    // Process Query
    function handleQuery(query) {
      const clean = query.trim().toLowerCase();
      if (!clean) return;

      appendMessage('user', query);
      inputField.value = '';

      // Command matches
      if (clean === '/clear' || clean === 'clear') {
        terminalBody.innerHTML = '';
        appendMessage('agent', 'Terminal buffer cleared. Ready for your questions!');
        return;
      }

      if (clean === '/help' || clean === 'help') {
        appendMessage('agent', `Available commands and query topics:
- **Summary**: Vipin's core profile and background
- **GenAI**: Generative AI, Semantic Kernel, Agentic workflows
- **Azure**: Cloud services, Service Bus, serverless
- **.NET**: C#, ASP.NET Core, APIs, microservices
- **Projects**: Blink app, LDAP, Data Factory, MINT, Payment gateways
- **Awards**: Cognizant performance ratings & Hero of the company
- **Contact**: Email, phone, GitHub, location
- **/clear**: Clears terminal output`);
        return;
      }

      // Keyword matching
      let bestMatch = null;
      let highestScore = 0;

      knowledgeBase.forEach((item) => {
        let score = 0;
        item.keywords.forEach((kw) => {
          if (clean.includes(kw)) {
            score += kw.length;
          }
        });
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      });

      // Show typing indicator
      setTimeout(() => {
        if (bestMatch && highestScore > 0) {
          appendMessage('agent', bestMatch.response);
        } else {
          appendMessage('agent', `I analyzed your prompt about *"query"* against Vipin's experience repository. While I have detailed records for his **.NET, Azure, Generative AI / Agentic AI, Enterprise Projects, and Certifications**, feel free to click any suggestion below or contact Vipin directly at **dev.vipinkumar2@gmail.com**!`);
        }
      }, 250);
    }

    // Input listeners
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        handleQuery(inputField.value);
      });
    }

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleQuery(inputField.value);
      }
    });

    // Quick chips
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query') || chip.textContent;
        handleQuery(query);
      });
    });
  }

  window.initAIAgent = initAIAgent;
})();
