const landingPage = document.getElementById('landingPage');
    const dashboard = document.getElementById('dashboard');
    const circleDetails = document.getElementById('circleDetails');
    const profilePage = document.getElementById('profilePage');
    const navHome = document.getElementById('navHome');
    const navDashboard = document.getElementById('navDashboard');
    const navProfile = document.getElementById('navProfile');
    const connectBtn = document.getElementById('connectBtn');
    const backToDashboard = document.getElementById('backToDashboard');

    function showPage(page) {
      [landingPage, dashboard, circleDetails, profilePage].forEach(p => p.classList.remove('active'));
      page.classList.add('active');
      [navHome, navDashboard, navProfile].forEach(n => n.classList.remove('active'));
      if(page === landingPage) navHome.classList.add('active');
      if(page === dashboard) navDashboard.classList.add('active');
      if(page === profilePage) navProfile.classList.add('active');
    }

    navHome.onclick = () => showPage(landingPage);
    navDashboard.onclick = () => showPage(dashboard);
    navProfile.onclick = () => showPage(profilePage);

    // Wallet Modal Logic
    const walletModal = document.getElementById('walletModal');
    const closeModal = document.getElementById('closeModal');
    const confirmWalletBtn = document.getElementById('confirmWalletBtn');
    const walletInput = document.getElementById('walletInput');

    connectBtn.onclick = () => {
      walletModal.classList.add('active');
      walletInput.value = '';
      walletInput.focus();
    };

    closeModal.onclick = () => {
      walletModal.classList.remove('active');
    };

    walletModal.onclick = function(e) {
      if (e.target === walletModal) walletModal.classList.remove('active');
    };

    confirmWalletBtn.onclick = () => {
      let wallet = walletInput.value.trim();
      walletModal.classList.remove('active');
      setTimeout(() => {
        alert(
          wallet
            ? `Wallet ${wallet} connected!\nEduPass NFT verified.`
            : 'Wallet connected!\nEduPass NFT verified.'
        );
        showPage(dashboard);
      }, 600);
    };

    // Learning Circles Data
    const circles = [
      {
        id: "web3",
        title: "Web3 Study Group",
        brief: "Blockchain, smart contracts, and dApps.",
        desc: "A global group for learning blockchain, smart contracts, and decentralized apps.",
        event: "NFT in Education - Aug 20, 2025",
        resources: [
          "Web3 Fundamentals.pdf",
          "Smart Contracts 101.pptx",
          "Weekly Session Recording.mp4",
          "Ethereum Whitepaper.pdf"
        ],
        members: 42
      },
      {
        id: "ai",
        title: "AI & ML Circle",
        brief: "Artificial intelligence and machine learning.",
        desc: "Dive into artificial intelligence and machine learning with peers worldwide.",
        event: "AI Hackathon - Sep 5, 2025",
        resources: [
          "Intro to ML.pdf",
          "TensorFlow Workshop.mp4",
          "AI Ethics Guide.pdf",
          "Neural Networks Explained.pdf"
        ],
        members: 35
      },
      {
        id: "design",
        title: "Design Thinkers",
        brief: "UI/UX, design thinking, and creativity.",
        desc: "Collaborate on design thinking, UI/UX, and creative projects.",
        event: "UX Jam Session - Aug 28, 2025",
        resources: [
          "Design Sprint Toolkit.pdf",
          "Figma Basics.pptx",
          "UI Patterns.pdf",
          "Portfolio Review.mp4"
        ],
        members: 28
      },
      {
        id: "cyber",
        title: "Cybersecurity Circle",
        brief: "Protecting digital assets and privacy.",
        desc: "Learn about cybersecurity, ethical hacking, and digital privacy in a safe, collaborative space.",
        event: "Capture The Flag - Sep 15, 2025",
        resources: [
          "Cybersecurity Basics.pdf",
          "CTF Practice Labs.zip",
          "Phishing Awareness Guide.pdf",
          "OWASP Top 10.pdf"
        ],
        members: 31
      },
      {
        id: "startup",
        title: "Startup Builders",
        brief: "Entrepreneurship and startup growth.",
        desc: "Connect with aspiring founders, share startup ideas, and learn how to launch and grow your business.",
        event: "Pitch Night - Sep 22, 2025",
        resources: [
          "Lean Startup.pdf",
          "Pitch Deck Template.pptx",
          "Fundraising 101.pdf",
          "Startup Legal Basics.pdf"
        ],
        members: 24
      },
      {
        id: "datasci",
        title: "Data Science Hub",
        brief: "Data analysis, visualization, and insights.",
        desc: "Explore data science, analytics, and visualization with hands-on projects and peer support.",
        event: "Data Viz Challenge - Sep 10, 2025",
        resources: [
          "Data Science Roadmap.pdf",
          "Python for Data Analysis.mp4",
          "Visualization Tools Guide.pdf",
          "Kaggle Projects.zip"
        ],
        members: 39
      }
    ];

    // Render Learning Circles
    const circleList = document.getElementById('circleList');
    function renderCircles() {
      circleList.innerHTML = '';
      circles.forEach(circle => {
        const div = document.createElement('div');
        div.className = 'circle-card';
        div.innerHTML = `
          <h4>${circle.title}</h4>
          <div class="circle-brief">${circle.brief}</div>
          <p>Members: ${circle.members}<br>Resources: ${circle.resources.length}</p>
          <button class="btn enterCircleBtn" data-circle="${circle.id}">Enter Circle</button>
        `;
        circleList.appendChild(div);
      });
      // Attach event listeners for new buttons
      document.querySelectorAll('.enterCircleBtn').forEach(btn => {
        btn.onclick = () => showCircleDetails(btn.dataset.circle);
      });
    }
    renderCircles();

    // Show Circle Details
    function showCircleDetails(circleId) {
      const circle = circles.find(c => c.id === circleId);
      document.getElementById('circleTitle').textContent = circle.title;
      document.getElementById('circleDesc').textContent = circle.desc;
      document.getElementById('circleEvent').innerHTML = `<strong>Upcoming Event:</strong> ${circle.event}`;
      // Resources
      const resList = document.getElementById('circleResources');
      resList.innerHTML = '';
      circle.resources.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r;
        resList.appendChild(li);
      });
      showPage(circleDetails);
      // Reset tabs to Overview
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelector('.tab[data-tab="overview"]').classList.add('active');
      Object.values(tabContents).forEach(tc => tc.style.display = 'none');
      tabContents.overview.style.display = 'block';
    }

    // Tabs in Circle Details
    const tabs = document.querySelectorAll('.tab');
    const tabContents = {
      overview: document.getElementById('tabOverview'),
      resources: document.getElementById('tabResources'),
      discussions: document.getElementById('tabDiscussions'),
      members: document.getElementById('tabMembers')
    };
    tabs.forEach(tab => {
      tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        Object.values(tabContents).forEach(tc => tc.style.display = 'none');
        tabContents[tab.dataset.tab].style.display = 'block';
      };
    });

    backToDashboard.onclick = () => showPage(dashboard);

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    contactForm.onsubmit = function(e) {
      e.preventDefault();
      contactSuccess.style.display = 'block';
      setTimeout(() => {
        contactSuccess.style.display = 'none';
        contactForm.reset();
      }, 3000);
    };
