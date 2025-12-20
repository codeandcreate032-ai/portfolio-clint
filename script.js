        // Preloader
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        });

        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Active navigation link on scroll
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For this example, we'll just show an alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });

        // Back to top button
        const backToTopButton = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Enhanced Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchBox = document.getElementById('searchBox');
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        const searchResults = document.getElementById('searchResults');
        const searchResultsContent = document.getElementById('searchResultsContent');
        const searchResultsClose = document.getElementById('searchResultsClose');
        const noResults = document.getElementById('noResults');
        
        // Search history
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        
        // Popular search suggestions
        const searchSuggestions = [
            'React Native', 'Machine Learning', 'Android', 'Web Development',
            'Python', 'HTML', 'CSS', 'JavaScript', 'React', 'Projects',
            'Certificates', 'Education', 'Skills', 'Contact'
        ];
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchBox.classList.add('active');
                searchInput.focus();
            }
            
            // Esc to close search
            if (e.key === 'Escape') {
                searchBox.classList.remove('active');
                searchResults.classList.remove('active');
                searchInput.value = '';
            }
        });
        
        // Toggle search box
        searchToggle.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        });
        
        // Clear search input
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.classList.remove('visible');
            searchResults.classList.remove('active');
            searchInput.focus();
        });
        
        // Show/hide clear button based on input
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                searchClear.classList.add('visible');
            } else {
                searchClear.classList.remove('visible');
            }
        });
        
        // Close search results
        searchResultsClose.addEventListener('click', () => {
            searchResults.classList.remove('active');
            searchBox.classList.remove('active');
            searchInput.value = '';
            searchClear.classList.remove('visible');
        });
        
        // Search functionality with debounce
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            clearTimeout(searchTimeout);
            
            if (searchTerm.length > 0) {
                // Show loading state
                searchResultsContent.innerHTML = '<div class="search-loading"><div class="search-loading-spinner"></div></div>';
                searchResults.classList.add('active');
                
                // Debounce search
                searchTimeout = setTimeout(() => {
                    performSearch(searchTerm);
                }, 300);
            } else {
                // Show search history and suggestions when input is empty
                showSearchSuggestions();
            }
        });
        
        // Perform search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase().trim();
                if (searchTerm.length > 0) {
                    // Add to search history
                    addToSearchHistory(searchTerm);
                    performSearch(searchTerm);
                }
            }
        });
        
        // Add to search history
        function addToSearchHistory(searchTerm) {
            // Remove if already exists
            searchHistory = searchHistory.filter(term => term !== searchTerm);
            
            // Add to beginning
            searchHistory.unshift(searchTerm);
            
            // Limit to 5 items
            if (searchHistory.length > 5) {
                searchHistory = searchHistory.slice(0, 5);
            }
            
            // Save to localStorage
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        
        // Show search suggestions and history
        function showSearchSuggestions() {
            searchResultsContent.innerHTML = '';
            
            // Show search history if available
            if (searchHistory.length > 0) {
                const historyDiv = document.createElement('div');
                historyDiv.className = 'search-history';
                
                const historyTitle = document.createElement('div');
                historyTitle.className = 'search-history-title';
                historyTitle.textContent = 'Recent Searches';
                
                const historyItems = document.createElement('div');
                historyItems.className = 'search-history-items';
                
                searchHistory.forEach(term => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'search-history-item';
                    historyItem.textContent = term;
                    historyItem.addEventListener('click', () => {
                        searchInput.value = term;
                        searchClear.classList.add('visible');
                        performSearch(term);
                    });
                    
                    historyItems.appendChild(historyItem);
                });
                
                historyDiv.appendChild(historyTitle);
                historyDiv.appendChild(historyItems);
                searchResultsContent.appendChild(historyDiv);
            }
            
            // Show search suggestions
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'search-suggestions';
            
            const suggestionsTitle = document.createElement('div');
            suggestionsTitle.className = 'search-suggestions-title';
            suggestionsTitle.textContent = 'Popular Searches';
            
            searchSuggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'search-suggestion-item';
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    searchClear.classList.add('visible');
                    performSearch(suggestion);
                });
                
                suggestionsDiv.appendChild(suggestionItem);
            });
            
            searchResultsContent.appendChild(suggestionsDiv);
            searchResults.classList.add('active');
        }
        
        // Enhanced search function with relevance scoring
        function performSearch(searchTerm) {
            // Add to search history
            addToSearchHistory(searchTerm);
            
            // Clear previous results
            searchResultsContent.innerHTML = '';
            
            // Define searchable content with categories and weights
            const searchableContent = [
                {
                    category: 'About',
                    title: 'About Me',
                    content: 'I\'m a passionate developer currently pursuing B.Tech with a strong foundation in web and mobile development. My journey in technology began with my diploma studies, and I\'ve since expanded my expertise to include React Native, Machine Learning, and Android Development. I thrive on challenges and am constantly seeking opportunities to learn and grow. My approach combines technical skills with strong soft skills like communication, adaptability, and leadership to deliver effective solutions.',
                    elementId: 'about',
                    weight: 1.0
                },
                {
                    category: 'Education',
                    title: 'B.Tech',
                    content: 'Raghu Engineering College (REC) 2022–2025',
                    elementId: 'education',
                    weight: 0.9
                },
                {
                    category: 'Education',
                    title: 'Diploma',
                    content: 'Government Polytechnic College 2019–2022',
                    elementId: 'education',
                    weight: 0.9
                },
                {
                    category: 'Education',
                    title: 'Schooling',
                    content: 'Gloria English Medium School 2012–2019',
                    elementId: 'education',
                    weight: 0.8
                },
                {
                    category: 'Skills',
                    title: 'Web Development',
                    content: 'HTML, CSS, JavaScript, React',
                    elementId: 'skills',
                    weight: 1.0
                },
                {
                    category: 'Skills',
                    title: 'Mobile & ML',
                    content: 'React Native, Android, Machine Learning, Python',
                    elementId: 'skills',
                    weight: 1.0
                },
                {
                    category: 'Skills',
                    title: 'Other Skills',
                    content: 'Cisco Networking',
                    elementId: 'skills',
                    weight: 0.8
                },
                {
                    category: 'Certificates',
                    title: 'Web Developer',
                    content: 'HTML, CSS, JavaScript',
                    elementId: 'certificates',
                    weight: 0.9
                },
                {
                    category: 'Certificates',
                    title: 'Machine Learning Internship',
                    content: 'Skill Dzire',
                    elementId: 'certificates',
                    weight: 0.9
                },
                {
                    category: 'Certificates',
                    title: 'Python Certification',
                    content: 'HackerRank',
                    elementId: 'certificates',
                    weight: 0.9
                },
                {
                    category: 'Certificates',
                    title: 'Android Developer Internship',
                    content: 'Edu Skills',
                    elementId: 'certificates',
                    weight: 0.9
                },
                {
                    category: 'Certificates',
                    title: 'Cisco CCNAv7',
                    content: 'Switching/Routing/Wireless',
                    elementId: 'certificates',
                    weight: 0.9
                },
                {
                    category: 'Certificates',
                    title: 'Web Blaze Workshop',
                    content: 'Attendee',
                    elementId: 'certificates',
                    weight: 0.8
                },
                {
                    category: 'Projects',
                    title: 'Ticket Management',
                    content: 'A website to book and cancel tickets with a user-friendly interface. HTML, CSS',
                    elementId: 'projects',
                    weight: 1.0
                },
                {
                    category: 'Projects',
                    title: 'Stress Detection',
                    content: 'ML and image processing project to detect stress levels accurately. Machine Learning, Image Processing',
                    elementId: 'projects',
                    weight: 1.0
                },
                {
                    category: 'Activities',
                    title: 'NSS Volunteer',
                    content: 'Active participation in National Service Scheme activities',
                    elementId: 'activities',
                    weight: 0.8
                },
                {
                    category: 'Activities',
                    title: 'Web Blaze Workshop',
                    content: 'Attendee at web development workshop',
                    elementId: 'activities',
                    weight: 0.8
                },
                {
                    category: 'Contact',
                    title: 'Contact Information',
                    content: 'Email: vayyetilakshmi.durga@gmail.com, Phone: 8367748967, Location: Duvvada sector 2',
                    elementId: 'contact',
                    weight: 0.7
                }
            ];
            
            const results = [];
            
            // Search through content with relevance scoring
            searchableContent.forEach(item => {
                const title = item.title.toLowerCase();
                const content = item.content.toLowerCase();
                const category = item.category.toLowerCase();
                
                let relevanceScore = 0;
                
                // Check for exact matches in title (highest weight)
                if (title.includes(searchTerm)) {
                    relevanceScore += 10 * item.weight;
                }
                
                // Check for exact matches in content
                if (content.includes(searchTerm)) {
                    relevanceScore += 5 * item.weight;
                }
                
                // Check for exact matches in category
                if (category.includes(searchTerm)) {
                    relevanceScore += 3 * item.weight;
                }
                
                // Check for partial matches in title
                const titleWords = title.split(' ');
                const searchTermWords = searchTerm.split(' ');
                
                searchTermWords.forEach(searchWord => {
                    titleWords.forEach(titleWord => {
                        if (titleWord.includes(searchWord) && searchWord.length > 2) {
                            relevanceScore += 2 * item.weight;
                        }
                    });
                });
                
                // Check for partial matches in content
                const contentWords = content.split(' ');
                
                searchTermWords.forEach(searchWord => {
                    contentWords.forEach(contentWord => {
                        if (contentWord.includes(searchWord) && searchWord.length > 2) {
                            relevanceScore += 1 * item.weight;
                        }
                    });
                });
                
                // Add to results if relevance score is above threshold
                if (relevanceScore > 0) {
                    // Create a snippet with highlighted search term
                    let snippet = item.content;
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    snippet = snippet.replace(regex, '<span class="search-highlight">$1</span>');
                    
                    // Limit snippet length
                    if (snippet.length > 150) {
                        const index = snippet.toLowerCase().indexOf(searchTerm.toLowerCase());
                        const start = Math.max(0, index - 50);
                        const end = Math.min(snippet.length, index + searchTerm.length + 100);
                        snippet = (start > 0 ? '...' : '') + snippet.substring(start, end) + (end < snippet.length ? '...' : '');
                    }
                    
                    results.push({
                        ...item,
                        snippet: snippet,
                        relevanceScore: relevanceScore
                    });
                }
            });
            
            // Sort results by relevance score (highest first)
            results.sort((a, b) => b.relevanceScore - a.relevanceScore);
            
            // Display results
            if (results.length > 0) {
                results.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    
                    const relevance = document.createElement('span');
                    relevance.className = 'search-result-relevance';
                    relevance.textContent = `${Math.round(result.relevanceScore)}%`;
                    
                    const title = document.createElement('h4');
                    title.innerHTML = result.title.replace(new RegExp(`(${searchTerm})`, 'gi'), '<span class="search-highlight">$1</span>');
                    
                    const snippet = document.createElement('p');
                    snippet.innerHTML = result.snippet;
                    
                    const category = document.createElement('span');
                    category.className = 'search-result-category';
                    category.textContent = result.category;
                    
                    resultItem.appendChild(relevance);
                    resultItem.appendChild(title);
                    resultItem.appendChild(snippet);
                    resultItem.appendChild(category);
                    
                    // Add click event to scroll to element
                    resultItem.addEventListener('click', () => {
                        const element = document.getElementById(result.elementId);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            // Highlight the section temporarily
                            const originalBg = element.style.backgroundColor;
                            element.style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
                            setTimeout(() => {
                                element.style.backgroundColor = originalBg;
                            }, 2000);
                            // Close search results
                            searchResults.classList.remove('active');
                            searchBox.classList.remove('active');
                            searchInput.value = '';
                            searchClear.classList.remove('visible');
                        }
                    });
                    
                    searchResultsContent.appendChild(resultItem);
                });
                
                // Hide no results message
                noResults.style.display = 'none';
            } else {
                // Show no results message
                searchResultsContent.appendChild(noResults);
                noResults.style.display = 'block';
                noResults.textContent = `No results found for "${searchTerm}"`;
                
                // Show search suggestions
                const suggestionsDiv = document.createElement('div');
                suggestionsDiv.className = 'search-suggestions';
                suggestionsDiv.style.marginTop = '15px';
                
                const suggestionsTitle = document.createElement('div');
                suggestionsTitle.className = 'search-suggestions-title';
                suggestionsTitle.textContent = 'Try searching for:';
                
                searchSuggestions.slice(0, 3).forEach(suggestion => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'search-suggestion-item';
                    suggestionItem.textContent = suggestion;
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = suggestion;
                        searchClear.classList.add('visible');
                        performSearch(suggestion);
                    });
                    
                    suggestionsDiv.appendChild(suggestionItem);
                });
                
                searchResultsContent.appendChild(suggestionsDiv);
            }
            
            // Show search results
            searchResults.classList.add('active');
        }
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && !e.target.closest('.search-results')) {
                searchBox.classList.remove('active');
                searchResults.classList.remove('active');
                searchInput.value = '';
                searchClear.classList.remove('visible');
            }
        });

        // Animation on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    entry.target.classList.remove('fade-out');
                } else {
                    entry.target.classList.add('fade-out');
                    entry.target.classList.remove('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
        document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    const navClose = document.querySelector('.nav-close');
    
    // Open menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close menu
    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    }
    
    navClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});