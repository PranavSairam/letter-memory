// MemoryLetters App - JavaScript

class MemoryLetters {
    constructor() {
        this.letters = JSON.parse(localStorage.getItem('memoryLetters')) || [];
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setCurrentDate();
        this.showSection('write');
        this.renderLetters();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Form submission
        document.getElementById('letterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveLetter();
        });

        // Clear form
        document.getElementById('clearForm').addEventListener('click', () => {
            this.clearForm();
        });

        // Toggle view
        document.getElementById('toggleView').addEventListener('click', () => {
            this.toggleView();
        });

        // Clear all letters
        document.getElementById('clearAll').addEventListener('click', () => {
            this.clearAllLetters();
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        document.getElementById('letterModal').addEventListener('click', (e) => {
            if (e.target.id === 'letterModal') {
                this.closeModal();
            }
        });
    }

    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('letterDate').value = today;
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.write-section, .view-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(sectionName + 'Section').classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // If viewing letters, refresh the display
        if (sectionName === 'view') {
            this.renderLetters();
        }
    }

    saveLetter() {
        const formData = new FormData(document.getElementById('letterForm'));
        const letter = {
            id: Date.now(),
            title: formData.get('title'),
            date: formData.get('date'),
            sender: formData.get('sender'),
            recipient: formData.get('recipient'),
            message: formData.get('message'),
            createdAt: new Date().toISOString()
        };

        this.letters.unshift(letter); // Add to beginning
        this.saveToLocalStorage();
        this.clearForm();
        this.showNotification('Letter saved successfully!');
        
        // Switch to view section to show the new letter
        setTimeout(() => {
            this.showSection('view');
        }, 1000);
    }

    clearForm() {
        document.getElementById('letterForm').reset();
        this.setCurrentDate();
    }

    renderLetters() {
        const container = document.getElementById('lettersContainer');
        container.innerHTML = '';

        if (this.letters.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope-open-text" style="font-size: 4rem; color: #bdc3c7; margin-bottom: 20px;"></i>
                    <h3 style="color: #7f8c8d; margin-bottom: 10px;">No letters yet</h3>
                    <p style="color: #95a5a6;">Write your first heartfelt letter to get started!</p>
                </div>
            `;
            return;
        }

        this.letters.forEach(letter => {
            const letterCard = this.createLetterCard(letter);
            container.appendChild(letterCard);
        });
    }

    createLetterCard(letter) {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.dataset.letterId = letter.id;

        const formattedDate = new Date(letter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const preview = letter.message.length > 150 
            ? letter.message.substring(0, 150) + '...' 
            : letter.message;

        card.innerHTML = `
            <div class="letter-title">${letter.title}</div>
            <div class="letter-date">${formattedDate}</div>
            <div class="letter-preview">${preview}</div>
            <div class="letter-meta">
                <span class="letter-sender">From: ${letter.sender}</span>
                <span class="letter-recipient">To: ${letter.recipient}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showLetterDetail(letter);
        });

        return card;
    }

    showLetterDetail(letter) {
        const modal = document.getElementById('letterModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        const formattedDate = new Date(letter.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        modalTitle.textContent = letter.title;
        modalBody.innerHTML = `
            <div class="letter-detail">
                <div class="date">${formattedDate}</div>
                <div class="message">${letter.message}</div>
                <div class="signature">With love,<br>${letter.sender}</div>
            </div>
        `;

        modal.classList.add('show');
    }

    closeModal() {
        document.getElementById('letterModal').classList.remove('show');
    }

    toggleView() {
        const container = document.getElementById('lettersContainer');
        const toggleBtn = document.getElementById('toggleView');
        
        if (this.currentView === 'grid') {
            container.classList.add('list-view');
            this.currentView = 'list';
            toggleBtn.innerHTML = '<i class="fas fa-th"></i> Grid View';
        } else {
            container.classList.remove('list-view');
            this.currentView = 'grid';
            toggleBtn.innerHTML = '<i class="fas fa-th-large"></i> List View';
        }
    }

    clearAllLetters() {
        if (confirm('Are you sure you want to delete all your letters? This action cannot be undone.')) {
            this.letters = [];
            this.saveToLocalStorage();
            this.renderLetters();
            this.showNotification('All letters have been cleared.');
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('memoryLetters', JSON.stringify(this.letters));
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Utility function to format dates nicely
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemoryLetters();
});

// Add some sample data for demonstration (remove in production)
function addSampleLetters() {
    const sampleLetters = [
        {
            id: Date.now() - 1000,
            title: "My First Memory Letter",
            date: "2024-01-15",
            sender: "Sarah",
            recipient: "Mom",
            message: "Dear Mom, I wanted to write this letter to tell you how much you mean to me. Your love and support have been my foundation throughout my life. Every time I think about home, I think about your warm hugs and encouraging words. Thank you for being my biggest cheerleader and my best friend. I love you more than words can express. Love, Sarah",
            createdAt: "2024-01-15T10:30:00.000Z"
        },
        {
            id: Date.now() - 2000,
            title: "A Letter to My Future Self",
            date: "2024-01-10",
            sender: "Alex",
            recipient: "Future Alex",
            message: "Dear Future Alex, I hope you're reading this letter and smiling at how far you've come. Remember the dreams we had? I hope you've achieved them all. Life is beautiful, and every challenge we face makes us stronger. Keep believing in yourself, keep dreaming big, and never forget to be kind to others. You've got this! Love, Present Alex",
            createdAt: "2024-01-10T14:20:00.000Z"
        }
    ];

    const existingLetters = JSON.parse(localStorage.getItem('memoryLetters')) || [];
    if (existingLetters.length === 0) {
        localStorage.setItem('memoryLetters', JSON.stringify(sampleLetters));
    }
}

// Uncomment the line below to add sample letters for demonstration
// addSampleLetters(); 