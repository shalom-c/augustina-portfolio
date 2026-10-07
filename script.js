const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

const certifications = [
  {
    title: "Professional Virtual Assistance Course",
    issuedBy: "AQskill",
    accreditedBy: "American Council of Training and Development (ACTD)",
    instructor: "Hammed Oladipo",
    dateCompleted: "October 7, 2026",
    certificateId: "270498A272678",
    verificationLink: "https://www.aqskill.org/verify",
  },
];

const skills = [
  {
    title: "VA Skills",
    items: [
      "Administrative Support",
      "Data Entry",
      "Email Management",
      "Calendar Management",
      "Online Research",
      "File Organization",
      "Customer Support",
      "Communication",
      "Time Management",
      "Task Management",
    ],
    icon: "◎",
  },
  {
    title: "Technical/Digital Skills",
    items: [
      "Google Docs",
      "Google Sheets",
      "Microsoft Word",
      "Microsoft Excel",
      "Canva",
      "Gmail",
      "Google Drive",
      "WhatsApp",
      "Zoom",
      "Internet Research",
    ],
    icon: "▤",
  },
];

const tools = [
  {
    title: "Tools",
    items: [
      "Google Workspace",
      "Microsoft Office",
      "Canva",
      "Gmail",
      "Google Drive",
      "Google Sheets",
      "Zoom",
      "WhatsApp",
    ],
    icon: "✳",
  },
];

function renderCards(items, containerSelector, cardClassName) {
  const container = document.querySelector(containerSelector);

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `service-item ${cardClassName}`;

    const number = document.createElement("span");
    number.className = "service-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const icon = document.createElement("span");
    icon.className = "service-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = item.icon;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const itemList = document.createElement("ul");
    itemList.className = "card-items";
    item.items.forEach((label) => {
      const listItem = document.createElement("li");
      listItem.textContent = label;
      itemList.append(listItem);
    });

    card.append(number, icon, title, itemList);
    container.append(card);
  });
}

renderCards(skills, "#skills-grid", "skill-card");
renderCards(tools, "#tools-grid", "tool-card");

const certificationGrid = document.querySelector("#certification-grid");

certifications.forEach((certification, index) => {
  const card = document.createElement("article");
  card.className = "service-item certification-card";

  const number = document.createElement("span");
  number.className = "service-number";
  number.textContent = String(index + 1).padStart(2, "0");
  card.append(number);

  const icon = document.createElement("span");
  icon.className = "service-icon certification-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4.5h18v16H7z" stroke="currentColor" stroke-width="1.6"/><path d="M11 9h10M11 13h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="21.5" cy="21.5" r="5" fill="var(--paper)" stroke="currentColor" stroke-width="1.6"/><path d="m19 25.7-1 4 3.5-2 3.5 2-1-4" fill="var(--paper)" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  card.append(icon);

  const title = document.createElement("h3");
  title.textContent = certification.title;
  card.append(title);

  const issuer = document.createElement("p");
  issuer.className = "certification-issuer";
  issuer.textContent = `Issued by ${certification.issuedBy}`;
  card.append(issuer);

  const accreditation = document.createElement("p");
  accreditation.className = "certification-accreditation";
  accreditation.textContent = `Accredited by ${certification.accreditedBy}`;
  card.append(accreditation);

  const instructor = document.createElement("p");
  instructor.className = "certification-instructor";
  instructor.textContent = `Instructor: ${certification.instructor}`;
  card.append(instructor);

  const metadata = document.createElement("dl");
  metadata.className = "certification-meta";
  [
    ["Date completed", certification.dateCompleted],
    ["Certificate ID", certification.certificateId],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value;
    item.append(term, description);
    metadata.append(item);
  });
  card.append(metadata);

  const verifyLink = document.createElement("a");
  verifyLink.className = "button button-dark certification-verify";
  verifyLink.href = certification.verificationLink;
  verifyLink.target = "_blank";
  verifyLink.rel = "noopener noreferrer";
  verifyLink.append(document.createTextNode("Verify Certificate "));
  const linkIcon = document.createElement("span");
  linkIcon.setAttribute("aria-hidden", "true");
  linkIcon.textContent = "↗";
  verifyLink.append(linkIcon);
  card.append(verifyLink);

  certificationGrid.append(card);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

const navLinks = [...siteNav.querySelectorAll('a[href^="#"]')];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section) => section !== null);

const sectionVisibility = new Map();

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    sectionVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
  });

  const activeSection = [...sectionVisibility.entries()]
    .filter(([, ratio]) => ratio > 0)
    .sort((first, second) => second[1] - first[1])[0]?.[0];

  navLinks.forEach((link) => {
    if (activeSection && link.getAttribute("href") === `#${activeSection.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}, {
  rootMargin: "-20% 0px -60% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
});

navSections.forEach((section) => navObserver.observe(section));

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").toString().trim();
  const message = formData.get("message").toString().trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hello Joseph,\n\n${message}\n\n${name}`);
  document.querySelector("#form-status").textContent = "Opening your email app with the message ready to send.";
  window.location.href = `mailto:josephaugustina575@gmail.com?subject=${subject}&body=${body}`;
});