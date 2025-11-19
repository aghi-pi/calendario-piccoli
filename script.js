
document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');
    const popupVideo = document.getElementById('popupVideo');
    const popupText = document.getElementById('popupText');
    const closeBtn = document.getElementById('closeBtn');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const today = new Date();
            const currentDay = today.getDate();

            for (let i = 1; i <= 24; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = i;

                // DEBUG: tutte le caselle cliccabili
                dayDiv.addEventListener('click', () => {
                    const item = data.find(d => d.day === i);
                    if (item) {
                        if (item.type === 'image') {
                            popupImage.src = item.src;
                            popupImage.style.display = 'block';
                            popupVideo.style.display = 'none';
                        } else if (item.type === 'video') {
                            popupVideo.src = item.src;
                            popupVideo.style.display = 'block';
                            popupImage.style.display = 'none';
                        }
                        popupText.textContent = item.text;
                        popup.style.display = 'flex';
                    }
                });

                calendar.appendChild(dayDiv);
            }
        });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        popupVideo.pause();
    });

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            popupVideo.pause();
        }
    });
});
