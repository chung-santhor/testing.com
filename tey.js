const video = document.getElementById("bgVideo");
  const startBtn = document.getElementById("startBtn");
  const newBg = document.getElementById("newBackground");
  const frontText = document.getElementById("frontText");
  const bgMusic = document.getElementById("bgMusic");

  // Start video on click
  startBtn.addEventListener("click", () => {
    video.play().catch(err=>console.log(err));
    bgMusic.play().catch(err=>console.log(err));
    startBtn.classList.add("hide");
    setTimeout(()=> startBtn.style.display="none",500);
  });

  // When video ends -> show slide 2
  video.addEventListener("ended", () => {
    video.style.display = "none";
    newBg.classList.add("show");
    frontText.style.display = "block";
    frontText.focus();
    document.body.style.overflow = "auto";
  });

  // Image overlay functions
  function openOverlay(img){
    const overlay = document.getElementById("imageOverlay");
    const overlayImg = document.getElementById("overlayImage");
    overlayImg.src = img.src;
    overlay.style.display="flex";
  }
  function closeOverlay(){
    document.getElementById("imageOverlay").style.display="none";
  }
  document.addEventListener('keydown', e => { if(e.key==="Escape") closeOverlay(); });

  // Guest Comments with persistence
  const guestNames = [];
  const container = document.getElementById('commentsContainer');

  // Load saved comments on page load
  window.onload = function() {
    const savedComments = JSON.parse(localStorage.getItem('guestComments')) || [];
    savedComments.forEach(c => {
      guestNames.push(c.name.toLowerCase());
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('single-comment');
      commentDiv.innerHTML = `<h3>${c.name}</h3><p>${c.comment}</p>`;
      container.appendChild(commentDiv);
    });
  };

  function addGuestComment() {
    const nameInput = document.getElementById('guestName');
    const commentInput = document.getElementById('guestComment');
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if(!name || !comment){ alert("Please enter both name and comment."); return; }
    if(guestNames.includes(name.toLowerCase())){ alert("This name has already been used."); return; }

    guestNames.push(name.toLowerCase());

    const newComment = document.createElement('div');
    newComment.classList.add('single-comment');
    newComment.innerHTML = `<h3>${name}</h3><p>${comment}</p>`; 
    container.appendChild(newComment);

    // Save comment to localStorage
    const savedComments = JSON.parse(localStorage.getItem('guestComments')) || [];
    savedComments.push({ name, comment });
    localStorage.setItem('guestComments', JSON.stringify(savedComments));

    nameInput.value = '';
    commentInput.value = '';
  }