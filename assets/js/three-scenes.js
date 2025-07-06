// ==========================================
// THREE.JS SCENES MANAGER
// ==========================================

class ThreeSceneManager {
    constructor() {
        this.scenes = new Map();
        this.isWebGLSupported = this.checkWebGLSupport();
        this.init();
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                     (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    init() {
        if (!this.isWebGLSupported) {
            console.warn('WebGL not supported, falling back to CSS animations');
            return;
        }

        this.initHeroScene();
        this.initSkillsScene();
        this.startRenderLoop();
        this.setupResponsiveHandlers();
    }

    initHeroScene() {
        const container = document.getElementById('hero-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 16, 16),
            new THREE.TetrahedronGeometry(0.8),
            new THREE.OctahedronGeometry(0.8),
            new THREE.IcosahedronGeometry(0.8),
            new THREE.TorusGeometry(0.6, 0.2, 8, 16)
        ];

        const materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0x00d4ff, 
                transparent: true, 
                opacity: 0.8,
                shininess: 100
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0xff6b6b, 
                transparent: true, 
                opacity: 0.8,
                shininess: 100
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x4ecdc4, 
                transparent: true, 
                opacity: 0.8,
                shininess: 100
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0xffe66d, 
                transparent: true, 
                opacity: 0.8,
                shininess: 100
            })
        ];

        const meshes = [];
        const meshCount = 8;

        for (let i = 0; i < meshCount; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);

            // Random positioning
            mesh.position.x = (Math.random() - 0.5) * 8;
            mesh.position.y = (Math.random() - 0.5) * 8;
            mesh.position.z = (Math.random() - 0.5) * 8;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;

            // Store initial position for animation
            mesh.userData = {
                initialPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatRange: Math.random() * 2 + 1
            };

            scene.add(mesh);
            meshes.push(mesh);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x00d4ff, 0.5, 50);
        pointLight.position.set(-5, -5, 5);
        scene.add(pointLight);

        camera.position.z = 12;

        // Store scene data
        this.scenes.set('hero', {
            scene,
            camera,
            renderer,
            meshes,
            container,
            animate: (time) => {
                meshes.forEach((mesh, index) => {
                    // Rotation animation
                    mesh.rotation.x += mesh.userData.rotationSpeed.x;
                    mesh.rotation.y += mesh.userData.rotationSpeed.y;
                    mesh.rotation.z += mesh.userData.rotationSpeed.z;

                    // Floating animation
                    const offset = time * mesh.userData.floatSpeed + index * 0.5;
                    mesh.position.y = mesh.userData.initialPosition.y + 
                                    Math.sin(offset) * mesh.userData.floatRange;
                    mesh.position.x = mesh.userData.initialPosition.x + 
                                    Math.cos(offset * 0.7) * 0.5;
                });

                // Camera slight movement
                camera.position.x = Math.sin(time * 0.0005) * 2;
                camera.position.y = Math.cos(time * 0.0003) * 1;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            }
        });
    }

    initSkillsScene() {
        const container = document.getElementById('skills-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create DNA-like helix structure
        const helixGroup = new THREE.Group();
        const radius = 3;
        const height = 8;
        const segments = 50;

        // Create helix particles
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterials = [
            new THREE.MeshPhongMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.8 })
        ];

        const particles = [];

        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 4; // Two complete rotations
            const y = (i / segments) * height - height / 2;

            // First helix
            const particle1 = new THREE.Mesh(
                particleGeometry,
                particleMaterials[i % particleMaterials.length]
            );
            particle1.position.set(
                Math.cos(angle) * radius,
                y,
                Math.sin(angle) * radius
            );

            // Second helix (opposite)
            const particle2 = new THREE.Mesh(
                particleGeometry,
                particleMaterials[(i + 1) % particleMaterials.length]
            );
            particle2.position.set(
                Math.cos(angle + Math.PI) * radius,
                y,
                Math.sin(angle + Math.PI) * radius
            );

            // Store animation data
            particle1.userData = { 
                originalPosition: particle1.position.clone(),
                phase: i * 0.1
            };
            particle2.userData = { 
                originalPosition: particle2.position.clone(),
                phase: i * 0.1 + Math.PI
            };

            helixGroup.add(particle1);
            helixGroup.add(particle2);
            particles.push(particle1, particle2);

            // Connect particles with lines occasionally
            if (i > 0 && i % 5 === 0) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    particle1.position,
                    particle2.position
                ]);
                const lineMaterial = new THREE.LineBasicMaterial({ 
                    color: 0x00d4ff, 
                    transparent: true, 
                    opacity: 0.3 
                });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                helixGroup.add(line);
            }
        }

        scene.add(helixGroup);

        // Create floating tech icons
        const iconGroup = new THREE.Group();
        const iconGeometry = new THREE.PlaneGeometry(1, 1);
        const iconMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00d4ff, 
            transparent: true, 
            opacity: 0.6 
        });

        const iconCount = 6;
        const icons = [];

        for (let i = 0; i < iconCount; i++) {
            const icon = new THREE.Mesh(iconGeometry, iconMaterial.clone());
            const angle = (i / iconCount) * Math.PI * 2;
            const orbitRadius = 6;

            icon.position.set(
                Math.cos(angle) * orbitRadius,
                (Math.random() - 0.5) * 4,
                Math.sin(angle) * orbitRadius
            );

            icon.userData = {
                orbitSpeed: 0.01 + Math.random() * 0.01,
                orbitRadius: orbitRadius,
                angle: angle,
                bobSpeed: 0.02 + Math.random() * 0.02,
                bobRange: 1 + Math.random()
            };

            iconGroup.add(icon);
            icons.push(icon);
        }

        scene.add(iconGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(0, 10, 5);
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0x00d4ff, 0.5, 20);
        pointLight1.position.set(0, 0, 8);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff6b6b, 0.3, 15);
        pointLight2.position.set(5, 5, 0);
        scene.add(pointLight2);

        camera.position.set(0, 0, 12);

        // Store scene data
        this.scenes.set('skills', {
            scene,
            camera,
            renderer,
            helixGroup,
            iconGroup,
            particles,
            icons,
            container,
            animate: (time) => {
                // Rotate helix
                helixGroup.rotation.y = time * 0.0005;

                // Animate helix particles
                particles.forEach((particle, index) => {
                    const wave = Math.sin(time * 0.002 + particle.userData.phase) * 0.3;
                    particle.position.x = particle.userData.originalPosition.x + wave;
                    particle.position.z = particle.userData.originalPosition.z + wave * 0.5;
                });

                // Animate floating icons
                icons.forEach((icon) => {
                    icon.userData.angle += icon.userData.orbitSpeed;
                    icon.position.x = Math.cos(icon.userData.angle) * icon.userData.orbitRadius;
                    icon.position.z = Math.sin(icon.userData.angle) * icon.userData.orbitRadius;
                    icon.position.y += Math.sin(time * icon.userData.bobSpeed) * 0.02;
                    
                    // Face camera
                    icon.lookAt(camera.position);
                });

                // Camera movement
                camera.position.x = Math.sin(time * 0.0003) * 2;
                camera.position.y = Math.cos(time * 0.0002) * 1;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            }
        });
    }

    startRenderLoop() {
        if (!this.isWebGLSupported || this.scenes.size === 0) return;

        const animate = (time) => {
            this.scenes.forEach((sceneData) => {
                if (sceneData.animate && this.isSceneVisible(sceneData.container)) {
                    sceneData.animate(time);
                }
            });
            requestAnimationFrame(animate);
        };

        animate(0);
    }

    isSceneVisible(container) {
        if (!container) return false;
        
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= windowHeight &&
            rect.left <= windowWidth
        );
    }

    setupResponsiveHandlers() {
        window.addEventListener('resize', () => {
            this.scenes.forEach((sceneData) => {
                if (sceneData.container) {
                    const width = sceneData.container.clientWidth;
                    const height = sceneData.container.clientHeight;

                    sceneData.camera.aspect = width / height;
                    sceneData.camera.updateProjectionMatrix();
                    sceneData.renderer.setSize(width, height);
                    sceneData.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                }
            });
        });
    }

    // Public methods for external control
    pauseScene(sceneName) {
        const sceneData = this.scenes.get(sceneName);
        if (sceneData) {
            sceneData.paused = true;
        }
    }

    resumeScene(sceneName) {
        const sceneData = this.scenes.get(sceneName);
        if (sceneData) {
            sceneData.paused = false;
        }
    }

    destroyScene(sceneName) {
        const sceneData = this.scenes.get(sceneName);
        if (sceneData) {
            // Clean up Three.js objects
            sceneData.scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            sceneData.renderer.dispose();
            if (sceneData.container && sceneData.renderer.domElement) {
                sceneData.container.removeChild(sceneData.renderer.domElement);
            }

            this.scenes.delete(sceneName);
        }
    }

    // Fallback for non-WebGL browsers
    createFallbackAnimations() {
        const heroContainer = document.getElementById('hero-3d');
        const skillsContainer = document.getElementById('skills-3d');

        if (heroContainer) {
            heroContainer.innerHTML = `
                <div class="fallback-animation hero-fallback">
                    <div class="floating-shape shape-1"></div>
                    <div class="floating-shape shape-2"></div>
                    <div class="floating-shape shape-3"></div>
                    <div class="floating-shape shape-4"></div>
                </div>
            `;
        }

        if (skillsContainer) {
            skillsContainer.innerHTML = `
                <div class="fallback-animation skills-fallback">
                    <div class="orbit-animation">
                        <div class="orbit-particle"></div>
                        <div class="orbit-particle"></div>
                        <div class="orbit-particle"></div>
                    </div>
                </div>
            `;
        }
    }
}

// Particle System for Hero Section
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animate() {
        // Additional particle animations can be added here
        this.particles.forEach((particle, index) => {
            const time = Date.now() * 0.001;
            const x = Math.sin(time * 0.5 + index * 0.1) * 10;
            const y = Math.cos(time * 0.3 + index * 0.1) * 5;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scenes
    window.threeSceneManager = new ThreeSceneManager();
    
    // Initialize particle system for hero
    const heroParticlesContainer = document.getElementById('hero-particles');
    if (heroParticlesContainer) {
        window.heroParticles = new ParticleSystem(heroParticlesContainer);
    }
    
    // If WebGL is not supported, create fallback animations
    if (!window.threeSceneManager.isWebGLSupported) {
        window.threeSceneManager.createFallbackAnimations();
    }
});

// Add fallback CSS for non-WebGL browsers
if (!window.WebGLRenderingContext) {
    const style = document.createElement('style');
    style.textContent = `
        .fallback-animation {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .floating-shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, #00d4ff, #ff6b6b);
            opacity: 0.6;
            animation: floatFallback 6s ease-in-out infinite;
        }
        
        .shape-1 {
            width: 60px;
            height: 60px;
            top: 20%;
            left: 20%;
            animation-delay: 0s;
        }
        
        .shape-2 {
            width: 40px;
            height: 40px;
            top: 60%;
            right: 30%;
            animation-delay: 1.5s;
        }
        
        .shape-3 {
            width: 50px;
            height: 50px;
            bottom: 30%;
            left: 10%;
            animation-delay: 3s;
        }
        
        .shape-4 {
            width: 35px;
            height: 35px;
            top: 10%;
            right: 20%;
            animation-delay: 4.5s;
        }
        
        @keyframes floatFallback {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
            75% { transform: translateY(-30px) rotate(270deg); }
        }
        
        .orbit-animation {
            position: relative;
            width: 200px;
            height: 200px;
            margin: 0 auto;
            border: 2px solid rgba(0, 212, 255, 0.2);
            border-radius: 50%;
            animation: rotateFallback 20s linear infinite;
        }
        
        .orbit-particle {
            position: absolute;
            width: 20px;
            height: 20px;
            background: #00d4ff;
            border-radius: 50%;
            top: -10px;
            left: calc(50% - 10px);
        }
        
        .orbit-particle:nth-child(2) {
            top: calc(50% - 10px);
            right: -10px;
            left: auto;
        }
        
        .orbit-particle:nth-child(3) {
            bottom: -10px;
            top: auto;
        }
        
        @keyframes rotateFallback {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}