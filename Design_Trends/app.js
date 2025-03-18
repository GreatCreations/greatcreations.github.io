// Design trend data
const designTrends = [
    {
        title: "Neomorphic Design",
        category: "ui",
        year: "2023",
        description: "A soft, minimal interface style with subtle shadows creating a semi-realistic look.",
        details: "Neomorphism blends skeuomorphism and flat design, creating interfaces that appear to extrude from the background. It uses subtle shadow and highlight effects to create a soft, almost physical appearance without being overly realistic. This design trend is particularly effective for dashboards, audio controls, and settings interfaces where tactile interaction is valued.",
        color: "#e0e5ec",
        imageUrl: "https://placehold.co/300x400"
    },
    {
        title: "Multimodal Interfaces",
        category: "ui",
        year: "2025",
        description: "Systems combining speech, touch, gesture, and gaze for more natural human-computer interaction.",
        details: "Multimodal interfaces integrate multiple input methods—like voice, touch, gesture, and gaze tracking—into cohesive interaction systems that feel more natural and adaptable. These interfaces allow users to choose the most appropriate input method for their context, abilities, and preferences, rather than forcing a single interaction mode. The design challenge lies in creating consistent experiences across these different modalities while leveraging the unique strengths of each. This approach represents an evolution toward more flexible, human-centered computing that adapts to users rather than requiring users to adapt to technology.",
        color: "#0ea5e9",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Biomimetic Materials",
        category: "industrial",
        year: "2024",
        description: "Materials engineered to mimic biological structures and functions found in nature.",
        details: "Biomimetic materials draw inspiration from biological structures and functions, emulating nature's solutions for human design challenges. These materials include self-healing polymers inspired by plant stems, super-hydrophobic surfaces based on lotus leaves, and color-changing pigments that work like butterfly wings. Beyond aesthetic applications, these materials solve functional problems like reducing drag, enhancing durability, and creating sustainable alternatives to traditional industrial materials. This trend represents the intersection of materials science, biology, and design thinking.",
        color: "#059669",
        imageUrl: "https://placehold.co/900x500"
    },
    {
        title: "Sentiment-Responsive Design",
        category: "ui",
        year: "2025",
        description: "Interfaces that adapt based on detected user emotional states and engagement levels.",
        details: "Sentiment-responsive design creates interfaces that adapt to users' emotional states through facial expression analysis, voice tone recognition, and biometric indicators. These systems might adjust color schemes, content presentation, or interaction styles based on whether users appear stressed, confused, or engaged. This approach raises important ethical considerations regarding privacy and manipulation while promising more empathetic digital experiences. Implementation requires balancing technological capabilities with transparent user control and consent mechanisms.",
        color: "#f472b6",
        imageUrl: "https://placehold.co/600x400"
    },
    {
        title: "Climate-Adaptive Architecture",
        category: "architecture",
        year: "2024",
        description: "Buildings designed to respond dynamically to changing environmental conditions.",
        details: "Climate-adaptive architecture creates buildings that automatically respond to environmental changes for optimal comfort and energy efficiency. These structures feature responsive facades that adjust to sunlight, temperature-reactive materials, automated ventilation systems, and water collection mechanisms. Beyond technical performance, this approach embraces aesthetic elements that visually communicate environmental responsiveness. This trend represents architecture's evolution from static structures to dynamic systems that continuously optimize for changing conditions and user needs.",
        color: "#34d399",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Post-Digital Typography",
        category: "graphic",
        year: "2024",
        description: "Type design that consciously rejects or subverts digital perfection in favor of humanity.",
        details: "Post-digital typography deliberately embraces imperfection, physicality, and human qualities as a conscious reaction against digital precision. This approach might incorporate hand-drawn elements, deliberately distressed characters, or irregular spacing while maintaining fundamental legibility principles. Unlike earlier experimental typography, post-digital approaches are less about radical deconstruction and more about balancing readability with human expression. The style resonates in contexts where brands want to communicate authenticity, creativity, and personalized attention.",
        color: "#8b5cf6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Spatial Audio Design",
        category: "immersive",
        year: "2023",
        description: "Three-dimensional sound design creating immersive audio environments for physical and digital spaces.",
        details: "Spatial audio design creates three-dimensional sound experiences that place listeners within convincing acoustic environments. This field has evolved rapidly with improvements in binaural recording, multi-channel playback systems, and real-time audio processing. Applications range from immersive entertainment and gaming to practical uses in virtual meetings and accessibility tools. The design process involves careful consideration of psychoacoustics, environmental context, and narrative elements to create engaging and believable sonic experiences that complement visual design.",
        color: "#6366f1",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Regenerative Design",
        category: "industrial",
        year: "2023",
        description: "Products designed not just for sustainability but to actively restore environmental systems.",
        details: "Regenerative design moves beyond sustainability (which aims to minimize harm) toward actively restoring and regenerating environmental systems. These products and systems are engineered to capture carbon, purify water, enhance biodiversity, or generate renewable energy while fulfilling their primary functions. The approach involves lifecycle analysis, biomimicry, and systems thinking to create products that contribute positively to ecosystems. This represents a fundamental shift from reducing environmental damage to designing for positive environmental impact.",
        color: "#10b981",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Proto-Haptic Interfaces",
        category: "ui",
        year: "2025",
        description: "Touchscreen interfaces that simulate physical textures and tactile feedback without mechanical systems.",
        details: "Proto-haptic interfaces create the illusion of texture and tactile feedback on otherwise smooth touchscreens through a combination of visual, audio, and minimal vibration cues. These systems trick the brain into perceiving roughness, edges, or buttons without the complexity of mechanical feedback systems. The technology enables more intuitive interactions with digital interfaces by leveraging the power of cross-modal sensory integration. Applications include more accessible touchscreen experiences, virtual product testing, and enhanced digital creative tools.",
        color: "#3b82f6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Kinetic Identity Systems",
        category: "graphic",
        year: "2024",
        description: "Brand identities designed with movement as a core element rather than an add-on feature.",
        details: "Kinetic identity systems place motion at the core of brand expression rather than treating it as an afterthought or enhancement to static designs. These systems define how brand elements move, interact, and transform as fundamental characteristics alongside traditional elements like color and typography. The approach requires defining consistent motion principles that work across various digital touchpoints while maintaining brand recognition regardless of context. This trend acknowledges the primacy of screens and motion in contemporary brand experiences.",
        color: "#ec4899",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Nanosurface Design",
        category: "industrial",
        year: "2025",
        description: "Engineering material surfaces at the nanoscale to create new functional and aesthetic properties.",
        details: "Nanosurface design manipulates material surfaces at the nanometer scale to create new functional and aesthetic properties without changing the bulk material. These engineered surfaces can repel water, reduce friction, change color with viewing angle, or even kill bacteria through purely physical mechanisms. As manufacturing techniques have advanced, these previously exotic treatments have become commercially viable for consumer products. This approach enables new capabilities and experiences while minimizing material use, representing a shift from bulk material properties to engineered surface experiences.",
        color: "#6366f1",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Algorithmic Fashion Design",
        category: "fashion",
        year: "2024",
        description: "Clothing designed through computational processes that generate patterns and forms based on rules or data.",
        details: "Algorithmic fashion design uses computational processes to generate garment patterns, textile designs, and form studies. These approaches range from purely mathematical pattern generation to data-driven designs based on climate information, body movement analysis, or cultural datasets. The designer's role shifts toward creating systems and parameters rather than drawing every element directly. While still requiring human refinement and curation, this approach opens possibilities for personalization, optimization for specific conditions, and exploring design territories beyond traditional methods.",
        color: "#d946ef",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Heritage Futurism",
        category: "graphic",
        year: "2023",
        description: "Designs that blend traditional cultural visual elements with contemporary and futuristic aesthetics.",
        details: "Heritage futurism integrates traditional cultural visual languages with contemporary design approaches and futuristic aesthetics. This style consciously engages with cultural heritage while projecting it into the future rather than treating tradition as static or nostalgic. Designers working in this space often draw from their own cultural backgrounds to create authentic fusions that respect origins while embracing evolution. The approach is particularly significant for cultures previously underrepresented in global design, offering alternatives to homogenized international style.",
        color: "#f59e0b",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Sonification Design",
        category: "digital",
        year: "2023",
        description: "Translating data and system states into sound for monitoring, accessibility, and enhanced understanding.",
        details: "Sonification design translates data, system states, and information into non-speech audio to enhance understanding, enable monitoring without visual attention, or increase accessibility. Unlike arbitrary alert sounds, sophisticated sonification uses principles of psychoacoustics and music theory to create informative, distinguishable, and pleasant audio mappings. Applications range from scientific data exploration to ambient status indicators for complex systems. This field has gained importance as designers recognize sound's untapped potential for conveying information in increasingly complex digital environments.",
        color: "#a78bfa",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Computational Ceramics",
        category: "industrial",
        year: "2024",
        description: "Traditional ceramic materials formed through advanced computational design and digital fabrication.",
        details: "Computational ceramics merges one of humanity's oldest materials with advanced computational design and digital fabrication techniques. This approach uses parametric modeling, generative algorithms, and robotic fabrication to create ceramic forms impossible through traditional methods. The combination maintains ceramics' unique material qualities—durability, tactility, sustainability—while expanding formal possibilities beyond hand-crafting limitations. This represents a broader trend of applying digital sophistication to traditional materials, creating a dialogue between ancient craft knowledge and contemporary technological capabilities.",
        color: "#fb923c",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Embodied Navigation Design",
        category: "ui",
        year: "2023",
        description: "Interfaces that leverage human spatial memory and physical metaphors for digital navigation.",
        details: "Embodied navigation design creates digital interfaces that leverage humans' innate spatial memory and physical navigation instincts. These systems might organize information in consistent spatial layouts, use physical metaphors for data relationships, or implement gesture controls that mimic real-world interactions. The approach draws from cognitive science research showing that humans naturally encode information spatially, potentially making digital navigation more intuitive and memorable. Applications range from productivity software to complex data visualization tools where users must maintain contextual awareness.",
        color: "#0ea5e9",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Variable Design Systems",
        category: "graphic",
        year: "2024",
        description: "Design systems built around fluid parameters rather than fixed components, enabling contextual adaptation.",
        details: "Variable design systems shift from fixed components to parameter-based elements that continuously adapt to context. Unlike traditional design systems with defined states and variations, variable systems establish relationships and transformation rules, allowing elements to respond to factors like user preferences, device characteristics, and environmental conditions. This approach leverages variable font technology, fluid grids, and contextual color systems to create cohesive yet adaptable experiences. The approach represents design systems' evolution from static libraries to dynamic, responsive frameworks.",
        color: "#8b5cf6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Phygital Retail Design",
        category: "architecture",
        year: "2023",
        description: "Retail environments that seamlessly blend physical spaces with digital experiences and functionality.",
        details: "Phygital retail design creates shopping environments that seamlessly integrate physical spaces with digital functionality. These spaces feature interactive displays, augmented reality overlays, mobile integration points, and sensor systems that respond to shopper behavior. Unlike earlier digital retail experiments that often felt gimmicky, mature phygital design focuses on enhancing core shopping experiences like product discovery, comparison, and personalization. This approach recognizes that physical retail must offer unique value propositions in an e-commerce world while leveraging digital capabilities to extend beyond physical limitations.",
        color: "#f43f5e",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Neuromorphic Design",
        category: "ui",
        year: "2025",
        description: "Interfaces inspired by neural processes, designed to work with rather than against human cognitive patterns.",
        details: "Neuromorphic design creates interfaces inspired by how the human brain processes information, perceives patterns, and allocates attention. These systems work with natural cognitive processes rather than fighting against them, potentially reducing mental strain and learning curves. Applications include information displays that present data in naturally groupable chunks, notification systems aligned with attention recovery cycles, and navigation structures that follow associative patterns. This approach represents a shift from forcing humans to adapt to technological models toward technology that respects human cognitive architecture.",
        color: "#8b5cf6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Tangible Data Objects",
        category: "industrial",
        year: "2024",
        description: "Physical objects that represent data through their form, material properties, or behavior.",
        details: "Tangible data objects represent information through physical form, material properties, or behavior rather than on-screen visualizations. These objects might change shape, temperature, weight, or texture to communicate data changes, creating a more intuitive, ambient awareness of complex information. Unlike screen-based visualizations that require visual attention, physical data objects can be perceived peripherally or through touch. Applications range from ambient environmental monitoring to personal health tracking and organizational performance indicators that maintain a physical presence in the environment.",
        color: "#14b8a6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Synthaesthetic Design",
        category: "graphic",
        year: "2025",
        description: "Visual design that deliberately triggers cross-sensory experiences like texture or sound impressions.",
        details: "Synthaesthetic design creates visuals that deliberately evoke cross-sensory experiences, such as imagery that suggests texture, temperature, sound, or even taste. Drawing inspiration from the neurological condition of synesthesia, these designs leverage specific visual cues that trigger cross-modal sensory associations in most viewers. The approach is particularly effective in contexts where physical sensory experiences are important but cannot be directly provided, such as food packaging, audio product branding, or textile marketing in digital contexts.",
        color: "#d946ef",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Behavioral Environment Design",
        category: "architecture",
        year: "2023",
        description: "Spaces engineered to subtly influence behavior through environmental cues rather than explicit directions.",
        details: "Behavioral environment design creates spaces that subtly influence user behavior through environmental cues rather than explicit instructions. Based on behavioral psychology and choice architecture principles, these environments might encourage physical activity, facilitate certain social interactions, or promote sustainable behaviors through thoughtful layout, material choices, lighting, and spatial flow. This approach balances effectiveness with ethical considerations about manipulation versus empowerment, aiming to help users achieve their own goals rather than imposing designer objectives.",
        color: "#0ea5e9",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Chromatic Minimalism",
        category: "graphic",
        year: "2023",
        description: "Design that combines vibrant, expressive color with extreme restraint in other design elements.",
        details: "Chromatic minimalism combines vibrant, expressive color palettes with extreme restraint in other design elements like typography, layout, and form. This approach counters the neutral color schemes often associated with minimalist design while maintaining its emphasis on essential elements and negative space. The visual tension between quiet composition and vocal color creates distinctive, memorable designs that stand out in minimalism-saturated markets. This style is particularly effective for brands seeking to communicate both sophistication and creative energy.",
        color: "#ec4899",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Polycultural Design",
        category: "graphic",
        year: "2024",
        description: "Design that intentionally incorporates multiple cultural influences in non-hierarchical, respectful synthesis.",
        details: "Polycultural design deliberately incorporates multiple cultural influences in non-hierarchical, informed synthesis that respects source cultures. Unlike approaches that appropriate isolated elements without context, polycultural design involves research, collaboration, and accurate attribution while creating new expressions that reflect contemporary multicultural realities. This approach recognizes design's role in cultural conversation while navigating complex questions about influence, exchange, and representation. Projects often involve diverse design teams and consultants to ensure authentic, respectful integration of cultural elements.",
        color: "#f59e0b",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Adaptive Textile Design",
        category: "fashion",
        year: "2025",
        description: "Fabrics and materials that change properties in response to environmental conditions or user needs.",
        details: "Adaptive textiles change their properties in response to environmental conditions or user needs without requiring power systems or complex mechanisms. These advanced materials might adjust insulation based on temperature, change permeability with humidity, alter color with UV exposure, or modify structure with movement. Designers working with these materials must consider both their static appearance and dynamic behavior over time and changing conditions. This category bridges fashion, industrial design, and materials science to create more responsive and functional products.",
        color: "#14b8a6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Ambient Computing Interfaces",
        category: "ui",
        year: "2025",
        description: "Minimal interfaces designed to exist in the periphery of attention until needed.",
        details: "Ambient computing interfaces operate primarily in the periphery of user attention, providing information and functionality without demanding focus. These systems use subtle visual cues, gentle audio signals, or environmental changes to communicate information, only becoming more prominent when requiring user attention. The design challenge involves creating systems that remain perceivable without being intrusive, using principles of ambient awareness and calm technology. This approach aims to reduce the cognitive load of digital systems while maintaining their utility in increasingly technology-saturated environments.",
        color: "#6366f1",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Extended Reality Wayfinding",
        category: "immersive",
        year: "2024",
        description: "Navigation systems that overlay directional information onto the physical world through AR.",
        details: "Extended reality wayfinding overlays directional information directly onto the physical environment through augmented reality. These systems range from simple directional arrows to context-aware guides that adjust based on user needs, environmental conditions, or facility status. The design involves balancing information clarity with unobtrusive integration into visual fields, ensuring safety while navigating. Applications extend beyond basic navigation to include cultural context in tourism, workflow guidance in industrial settings, and accessibility support for users with different abilities.",
        color: "#8b5cf6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Spatial Branding",
        category: "architecture",
        year: "2023",
        description: "Brand experiences designed primarily for physical spaces rather than adapted from 2D applications.",
        details: "Spatial branding creates brand expressions specifically designed for three-dimensional environments rather than adapting 2D brand assets to physical spaces. This approach considers how people move through environments, how materials and surfaces affect brand perception, and how spatial arrangements can embody brand values. Unlike traditional environmental graphics that apply 2D designs to spaces, spatial branding thinks natively in terms of volume, material, light, and human movement patterns. This specialty has grown as brands increasingly compete on experience rather than just visual identity.",
        color: "#0ea5e9",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Community-Sourced Design",
        category: "digital",
        year: "2023",
        description: "Products and platforms co-created with their user communities through formalized collaboration.",
        details: "Community-sourced design formalizes collaboration between product teams and user communities, involving users directly in ideation, testing, and sometimes implementation. Unlike traditional user research that keeps designers and users separate, this approach creates structured pathways for community members to contribute directly to the design process. Successful implementation requires careful community management, clear contribution frameworks, and transparent decision-making processes. This approach recognizes that for many products, users collectively possess more relevant knowledge and creativity than any internal team could.",
        color: "#f97316",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Generative Packaging",
        category: "graphic",
        year: "2024",
        description: "Mass-customized package designs created algorithmically to make each item unique.",
        details: "Generative packaging uses algorithmic design to create mass-customized packaging where each item features unique variations while maintaining brand coherence. Enabled by advances in digital printing and automated design systems, this approach can produce thousands or millions of distinct package designs from a single system. Applications range from limited-edition marketing campaigns to anti-counterfeiting measures and personalized customer experiences. The designer's role shifts from creating specific designs to establishing systems that generate appealing variations within defined parameters.",
        color: "#8b5cf6",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Ethical Experience Design",
        category: "ui",
        year: "2023",
        description: "Design framework centered on user wellbeing and ethical considerations rather than engagement metrics.",
        details: "Ethical experience design prioritizes user wellbeing and positive societal impacts over engagement metrics and business goals alone. This framework evaluates design decisions against criteria like cognitive load, attention respect, transparency, inclusivity, and environmental impact. Unlike traditional UX focused primarily on usability and conversion, ethical XD explicitly considers long-term user welfare and broader societal implications. This approach has gained traction as designers and organizations respond to growing concerns about digital wellbeing, algorithmic harm, and technology ethics.",
        color: "#10b981",
        imageUrl: "https://placehold.co/400x300"
    },
    {
        title: "Retrocomputing Revival",
        category: "digital",
        year: "2023",
        description: "Design aesthetic celebrating the constraints and unique visual language of early computer systems.",
        details: "Retrocomputing revival celebrates the distinctive aesthetics of early computing systems, embracing their constraints and visual languages rather than treating them as technical limitations. This style features pixel-perfect bitmap graphics, limited color palettes, blocky typography, and interface patterns from formative computing eras. Unlike generalized retro design, authentic retrocomputing revival demonstrates understanding of specific platforms' technical constraints and cultural contexts. The appeal extends beyond nostalgia to appreciation for a clarity and directness sometimes lost in contemporary interface design.",
        color: "#a855f7",
        imageUrl: "https://placehold.co/400x300"
    }
];

// DOM Elements
const trendContainer = document.querySelector('.trend-container');
const filterPanel = document.querySelector('.filter-panel');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const viewToggleBtn = document.getElementById('viewToggle');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const modalBody = document.querySelector('.modal-body');
const filterButtons = document.querySelectorAll('.filter-btn');
const yearButtons = document.querySelectorAll('.year-btn');

// State
let currentCategory = 'all';
let currentYear = 'all';
let isListView = false;
let filteredTrends = [...designTrends];

// Initialize the app
function init() {
    renderTrendCards(designTrends);
    setupEventListeners();
    animateCardsOnLoad();
}

// Render trend cards
function renderTrendCards(trends) {
    trendContainer.innerHTML = '';
    
    if (trends.length === 0) {
        trendContainer.innerHTML = `
            <div class="no-results">
                <h3>No trends found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    trends.forEach(trend => {
        const card = document.createElement('div');
        card.className = 'trend-card';
        card.dataset.category = trend.category;
        card.dataset.year = trend.year;
        
        // Change all card backgrounds to light pink regardless of category
        let cardColor = '#ffb6c1'; // Light pink
        
        card.innerHTML = `
            <div class="card-visual" style="background: linear-gradient(135deg, #ffb6c1, #ffcdd2)">
                <img src="${trend.imageUrl || getIconForCategory(trend.category)}" class="trend-image" alt="${trend.title}">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${trend.title}</h3>
                    <span class="card-year">${trend.year}</span>
                </div>
                <span class="card-category">${getCategoryName(trend.category)}</span>
                <p class="card-description">${trend.description}</p>
                <span class="card-read-more">Read more</span>
            </div>
        `;
        
        trendContainer.appendChild(card);
    });
}

// Helper to get readable category names
function getCategoryName(category) {
    const categories = {
        'digital': 'Digital Design',
        'ui': 'UI/UX Design',
        'graphic': 'Graphic Design',
        'industrial': 'Industrial Design',
        'fashion': 'Fashion Design',
        'architecture': 'Architecture',
        'immersive': 'Immersive Design'
    };
    
    return categories[category] || category;
}

// Helper to get default icon for a category
function getIconForCategory(category) {
    const icons = {
        'digital': 'https://placehold.co/200x150',
        'ui': 'https://placehold.co/300x200',
        'graphic': 'https://placehold.co/250x250',
        'industrial': 'https://placehold.co/350x150',
        'fashion': 'https://placehold.co/150x400',
        'architecture': 'https://placehold.co/600x400',
        'immersive': 'https://placehold.co/500x300'
    };
    
    return icons[category] || 'https://placehold.co/300x300';
}

// Adjust color lightness
function adjustColor(color, amount) {
    // Use our theme colors for gradients
    if (color === '#FFAB00') return '#FF9800'; // Darker orange
    if (color === '#00BCD4') return '#00ACC1'; // Darker cyan
    if (color === '#FFCDD2') return '#FFADB3'; // Darker pink
    
    // Simple darkening for gradient effect
    if (color.startsWith('#')) {
        return color;
    }
    return color;
}

// Filter trends by category and year
function filterTrends() {
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredTrends = designTrends.filter(trend => {
        const matchesCategory = currentCategory === 'all' || trend.category === currentCategory;
        const matchesYear = currentYear === 'all' || trend.year === currentYear;
        const matchesSearch = trend.title.toLowerCase().includes(searchTerm) || 
                              trend.description.toLowerCase().includes(searchTerm) ||
                              trend.details.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesYear && matchesSearch;
    });
    
    renderTrendCards(filteredTrends);
    animateCardsOnFilter();
}

// Setup event listeners
function setupEventListeners() {
    // Category filter button
    categoryFilter.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
    });
    
    // View toggle
    viewToggleBtn.addEventListener('click', () => {
        isListView = !isListView;
        trendContainer.classList.toggle('list', isListView);
        viewToggleBtn.textContent = isListView ? 'Grid View' : 'List View';
        
        // Animate the transition
        animateViewChange();
    });
    
    // Search input
    searchInput.addEventListener('input', debounce(() => {
        filterTrends();
    }, 300));
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and render
            currentCategory = btn.dataset.category;
            filterTrends();
        });
    });
    
    // Year buttons
    yearButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            yearButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and render
            currentYear = btn.dataset.year;
            filterTrends();
        });
    });
    
    // Card click for modal
    trendContainer.addEventListener('click', e => {
        const readMoreBtn = e.target.closest('.card-read-more');
        if (readMoreBtn) {
            const card = readMoreBtn.closest('.trend-card');
            const cardTitle = card.querySelector('.card-title').textContent;
            const trend = designTrends.find(t => t.title === cardTitle);
            
            if (trend) {
                openTrendModal(trend);
            }
        }
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Click outside modal to close
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// Open trend modal with details
function openTrendModal(trend) {
    let headerBg = '#ffb6c1'; // Light pink
    
    modalBody.innerHTML = `
        <div class="modal-header" style="background: linear-gradient(135deg, #ffb6c1, #ffcdd2)">
            <img src="${trend.imageUrl || getIconForCategory(trend.category)}" class="modal-image" alt="${trend.title}">
            <h2>${trend.title}</h2>
        </div>
        <div class="modal-info">
            <div class="modal-tags">
                <span class="modal-year">${trend.year}</span>
                <span class="modal-category">${getCategoryName(trend.category)}</span>
            </div>
            <div class="modal-description">
                <p>${trend.details}</p>
            </div>
            <div class="modal-examples" style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">Examples & Applications</h4>
                <p>This trend is used extensively in ${getExamplesForCategory(trend.category)}.</p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Helper to get examples for each category
function getExamplesForCategory(category) {
    const examples = {
        'digital': 'web applications, mobile apps, and interactive installations',
        'ui': 'dashboards, mobile interfaces, and control panels',
        'graphic': 'branding, editorial design, and advertising campaigns',
        'industrial': 'product design, furniture, and consumer electronics',
        'fashion': 'clothing collections, accessories, and textile design',
        'architecture': 'commercial buildings, residential spaces, and urban planning',
        'immersive': 'virtual reality experiences, augmented reality applications, and interactive environments'
    };
    
    return examples[category] || 'various design disciplines';
}

// Animate cards on initial load
function animateCardsOnLoad() {
    // Simple display without GSAP animation
    const cards = document.querySelectorAll('.trend-card');
    cards.forEach(card => {
        card.style.opacity = 1;
    });
}

// Animate cards when filtering
function animateCardsOnFilter() {
    // Simple display without GSAP animation
    const cards = document.querySelectorAll('.trend-card');
    cards.forEach(card => {
        card.style.opacity = 1;
    });
}

// Animate view change
function animateViewChange() {
    // Simple transition without GSAP animation
    const cards = document.querySelectorAll('.trend-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);