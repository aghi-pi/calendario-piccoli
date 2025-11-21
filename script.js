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
            const currentDay = 12
            const currentMonth = 12; // dicembre = 12
			

            for (let i = 1; i <= 24; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.textContent = i;

                // ✅ Controllo su mese e giorno
                if (currentMonth !== 12 || i > currentDay) {
                    // Caselle future bloccate
                    dayDiv.classList.add('locked');
                } else {
                    // Caselle cliccabili
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
                            popupText.textContent = item.text || "Nessuna frase disponibile";
                            popup.style.display = 'flex';
                        }
                    });
                }

                calendar.appendChild(dayDiv);
            }
        });

    // ✅ Chiudi popup con X
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        popupVideo.pause();
    });

    // ✅ Chiudi popup cliccando fuori
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            popupVideo.pause();
        }
    });
});