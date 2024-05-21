document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let images = data.map(item => item.image);
        let currentIndex = 0;
        const currentImage = document.getElementById('current-image');
        currentImage.src = images[currentIndex];

        document.getElementById('prev').addEventListener('click', () => {
            currentIndex = (currentIndex + images.length - 1) % images.length;
            currentImage.src = images[currentIndex];
            updateDots();
        });

        document.getElementById('next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            currentImage.src = images[currentIndex];
            updateDots();
        });

        const navigationDots = document.getElementById('navigation-dots');
        images.forEach((_, index) => {
            let dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = index;
                currentImage.src = images[currentIndex];
                updateDots();
            });
            navigationDots.appendChild(dot);
        });

        function updateDots() {
            const dots = Array.from(document.getElementsByClassName('dot'));
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.style.backgroundColor = '#333';
                } else {
                    dot.style.backgroundColor = '#bbb';
                }
            });
        }

        updateDots();
    })
    .catch(error => console.error('Error loading the images:', error));
});
