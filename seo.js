// SEO Analyzer Logic for Super Admin CMS

document.addEventListener('DOMContentLoaded', () => {
  const formTitle = document.getElementById('form-title');
  const formSummary = document.getElementById('form-summary');
  const formContent = document.getElementById('form-content');
  const formTags = document.getElementById('form-tags');
  
  if (!formTitle) return; // Only run on superadmin page

  const scoreCircle = document.getElementById('seo-score-circle');
  const scoreValue = document.getElementById('seo-score-value');
  
  // SEO Checks UI elements
  const checkTitle = document.getElementById('check-title');
  const checkSummary = document.getElementById('check-summary');
  const checkContent = document.getElementById('check-content');
  const checkTags = document.getElementById('check-tags');

  function calculateSEO() {
    let score = 0;
    
    const titleText = formTitle.value.trim();
    const summaryText = formSummary.value.trim();
    const contentText = formContent.value.trim();
    const tagsText = formTags.value.trim();

    // 1. Title Length (Ideal 50-60 chars) - 20%
    if (titleText.length >= 40 && titleText.length <= 70) {
      score += 20;
      updateCheck(checkTitle, true, "Judul optimal (40-70 karakter)");
    } else {
      updateCheck(checkTitle, false, `Judul terlalu pendek/panjang (${titleText.length} kar)`);
    }

    // 2. Summary Length (Ideal > 50 chars) - 25%
    if (summaryText.length >= 50) {
      score += 25;
      updateCheck(checkSummary, true, "Ringkasan / Meta Desc baik");
    } else {
      updateCheck(checkSummary, false, "Ringkasan terlalu pendek");
    }

    // 3. Content Word Count (Ideal > 300 words) - 30%
    const wordCount = contentText.length > 0 ? contentText.split(/\s+/).length : 0;
    if (wordCount >= 300) {
      score += 30;
      updateCheck(checkContent, true, `Konten mendalam (${wordCount} kata)`);
    } else {
      updateCheck(checkContent, false, `Konten kurang dari 300 kata (${wordCount} kata)`);
    }

    // 4. Hashtags (Ideal >= 3 tags) - 25%
    const tagsCount = tagsText.split(',').filter(t => t.trim().length > 0).length;
    if (tagsCount >= 3) {
      score += 25;
      updateCheck(checkTags, true, `Hashtag optimal (${tagsCount} tag)`);
    } else {
      updateCheck(checkTags, false, `Tambahkan minimal 3 hashtag (${tagsCount} saat ini)`);
    }

    // Update UI
    scoreValue.textContent = score + "%";
    scoreCircle.className = 'seo-score-circle'; // reset
    if (score >= 80) scoreCircle.classList.add('seo-good');
    else if (score >= 50) scoreCircle.classList.add('seo-warn');
    else scoreCircle.classList.add('seo-bad');
  }

  function updateCheck(element, isPass, text) {
    element.innerHTML = `<span class="seo-icon" style="color: ${isPass ? 'var(--success)' : 'var(--danger)'}">${isPass ? '✓' : '✗'}</span> ${text}`;
  }

  // Add event listeners to form fields for real-time calculation
  formTitle.addEventListener('input', calculateSEO);
  formSummary.addEventListener('input', calculateSEO);
  formContent.addEventListener('input', calculateSEO);
  formTags.addEventListener('input', calculateSEO);
  
  // Initial check
  window.calculateSEO = calculateSEO;
  calculateSEO();
});
