

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });


document.getElementById('hero-cta').addEventListener('click', function() {
    document.querySelector('#grid-generator')?.scrollIntoView({
        behavior: 'smooth'
    });

});

document.getElementById('generate-btn').addEventListener('click', generateGrid);

function generateGrid() {
  const rows = parseInt(document.getElementById('rows').value);
  const columns = parseInt(document.getElementById('columns').value);
  const gap = parseInt(document.getElementById('gap').value);

  const gridPreview = document.getElementById('grid-preview');
  gridPreview.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  gridPreview.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gridPreview.style.gap = `${gap}px`;
  gridPreview.innerHTML = '';
 
  for (let i = 0; i < rows * columns; i++) {
    const gridItem = document.createElement('div');
    gridItem.textContent = `${Math.floor(i / columns) + 1}-${(i % columns) + 1}`;
    gridPreview.appendChild(gridItem);
  }

  const htmlCode = `<div class="grid-container">\n${'  <div class="grid-item"></div>\n'.repeat(rows * columns)}</div>`;
  

  const cssCode = `.grid-container {\n  display: grid;\n  grid-template-rows: repeat(${rows}, 1fr);\n  grid-template-columns: repeat(${columns}, 1fr);\n  gap: ${gap}px;\n}\n\n.grid-item {\n  /* Your item styles here */\n}`;
  
  document.getElementById('html-code').textContent = htmlCode;
  document.getElementById('css-code').textContent = cssCode;

  document.querySelectorAll('.code-block').forEach(block => {
    block.style.animation = 'none';
    setTimeout(() => {
      block.style.animation = 'fadeInUp 0.6s ease-out';
    }, 10);
  });
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const codeElement = document.getElementById(targetId);
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
      const originalText = this.innerHTML;
      this.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied!
      `;
      
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2000);
    });
  });
});
window.addEventListener('DOMContentLoaded', generateGrid);
const featureCards = document.querySelectorAll('.feature-card');

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.6s ${entry.target.dataset.delay}s forwards`;
    }
  });
}, { threshold: 0.1 });

featureCards.forEach((card, index) => {
  card.dataset.delay = index * 0.2;
  featureObserver.observe(card);
});

