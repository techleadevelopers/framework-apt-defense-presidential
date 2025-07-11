document.addEventListener("DOMContentLoaded", () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // DOM elements
  const timeDisplay = document.getElementById("time-display");
  const uptimeDisplay = document.getElementById("uptime-display");
  const logContent = document.getElementById("log-content");
  const toggleGridBtn = document.getElementById("toggle-grid");
  const resetSystemBtn = document.getElementById("reset-system");
  const triggerGlitchBtn = document.getElementById("trigger-glitch");
  const toggleFilterBtn = document.getElementById("toggle-filter");
  const cameraFeeds = document.querySelectorAll(".camera-feed");
  const cameraGrid = document.querySelector(".camera-grid");
  const videoElements = document.querySelectorAll(".camera-video");
  const scanLines = document.querySelectorAll(".scan-line");

  // After uploading videos to CodePen, replace these with your actual asset URLs
  const videoSources = [
    "https://mattcannon.games/codepen/glitches/cam1.mp4",
    "https://mattcannon.games/codepen/glitches/cam2.mp4",
    "https://mattcannon.games/codepen/glitches/cam3.mp4",
    "https://mattcannon.games/codepen/glitches/cam4.mp4",
    "https://mattcannon.games/codepen/glitches/cam5.mp4",
    "https://mattcannon.games/codepen/glitches/cam6.mp4"
  ];

  // Current view state and filter state
  let gridState = "three-per-row"; // 'three-per-row', 'two-per-row', 'single-column'
  let isColorMode = true;

  // Initialize and setup camera feeds
  function initializeSystem() {
    // Set current time
    updateTime();
    setInterval(updateTime, 1000);

    // Randomize scan line speeds
    randomizeScanLines();

    // Load videos - use the same video for multiple feeds if fewer than 6 are available
    videoElements.forEach((video, index) => {
      // Use modulo to cycle through available videos if fewer than 6
      const sourceIndex = index % videoSources.length;
      video.src = videoSources[sourceIndex];
      video.load();

      // Play video when it's ready - except for offline cameras
      video.addEventListener("canplaythrough", () => {
        // Style offline cameras differently but play all videos
  if (video.id === "video3" || video.id === "video5") {
    video.style.opacity = 0.5; // Make the video appear darker
    
    // Add more static noise to offline cameras
    const feed = video.closest(".camera-feed");
    const noiseOverlay = feed.querySelector(".noise-overlay");
    noiseOverlay.style.opacity = 0.15; // More static
  }
  
  // Play all videos
  video.play().catch((error) => {
    console.error("Video playback error:", error);
    logEvent("ERROR: Camera feed " + (index + 1) + " playback failed");
  });
      });
    });

    // Set videos to color mode by default
    videoElements.forEach((video) => {
      video.classList.add("color-mode");
    });

    // Set button text to match initial state
    toggleFilterBtn.textContent = "BW MODE";

    // Initialize glitch effects
    if (!prefersReducedMotion) {
      setupGlitchEffects();
    } else {
      setupReducedMotionEffects();
    }

    // Log initialization
    logEvent("SECURITY SYSTEM INITIALIZED");
    logEvent("LOADING CAMERA FEEDS...");

    // Simulate system issues
    setTimeout(() => {
      logEvent("WARNING: UNAUTHORIZED ACCESS ATTEMPTS DETECTED");
      setTimeout(() => {
        logEvent("SYSTEM INTEGRITY: 68%");
        setTimeout(() => {
          logEvent("APPLYING EMERGENCY PROTOCOLS...");
          setTimeout(() => {
            logEvent("ENCRYPTION LAYER COMPROMISED");
          }, 3000);
        }, 2000);
      }, 1500);
    }, 1000);
  }

  // Randomize scan line speeds and densities
  function randomizeScanLines() {
    scanLines.forEach((scanLine) => {
      // Random animation duration between 4 and 12 seconds
      const duration = 4 + Math.random() * 8;
      scanLine.style.animationDuration = `${duration}s`;

      // Random line density
      const density = 2 + Math.random() * 6;
      scanLine.style.backgroundSize = `100% ${density}px`;

      // Random delay
      scanLine.style.animationDelay = `-${Math.random() * 10}s`;
    });
  }

  // Update time display
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Log events to terminal
  function logEvent(message) {
    const timestamp = timeDisplay.textContent;
    logContent.innerHTML =
      `> [${timestamp}] ${message}<br>` + logContent.innerHTML;
    logContent.scrollTop = 0;
  }

  // Setup glitch effects for cameras
  function setupGlitchEffects() {
    cameraFeeds.forEach((feed, index) => {
      const glitchOverlay = feed.querySelector(".glitch-overlay");
      const colorDistortion = feed.querySelector(".color-distortion");
      const video = feed.querySelector(".camera-video");

      // Trigger an immediate glitch on startup
      setTimeout(() => {
        applyRandomGlitch(feed, video, glitchOverlay, colorDistortion);
      }, Math.random() * 1000); // Random delay within first second

      // Random glitch intervals for each camera - more frequent now
      const minInterval = 2000 + index * 500;
      const maxInterval = 8000 + index * 1000;

      function scheduleNextGlitch() {
        const nextGlitchDelay =
          Math.random() * (maxInterval - minInterval) + minInterval;

        setTimeout(() => {
          if (Math.random() < 0.85) {
            // 85% chance for a glitch - more likely
            applyRandomGlitch(feed, video, glitchOverlay, colorDistortion);
          }
          scheduleNextGlitch();
        }, nextGlitchDelay);
      }

      scheduleNextGlitch();
    });
  }

  // Apply a random glitch effect to a camera
  function applyRandomGlitch(feed, video, glitchOverlay, colorDistortion) {
    // Use more intense, modern neon-style glitches
    const glitchDuration = Math.random() * 1000 + 300;

    // Randomly choose 1-3 effects to apply simultaneously
    const numEffects = Math.floor(Math.random() * 3) + 1;
    const possibleEffects = [
      "slice",
      "rgb-split",
      "pixel",
      "flicker",
      "neon",
      "distort",
      "invert",
      "vhs",
      "matrix",
      "xray"
    ];
    const selectedEffects = [];

    // Select random unique effects
    while (selectedEffects.length < numEffects) {
      const effect =
        possibleEffects[Math.floor(Math.random() * possibleEffects.length)];
      if (!selectedEffects.includes(effect)) {
        selectedEffects.push(effect);
      }
    }

    // Apply each selected effect
    selectedEffects.forEach((effect) => {
      switch (effect) {
        case "slice":
          // Create horizontal slice/tear effect with neon highlights
          const sliceCount = Math.floor(Math.random() * 5) + 1;

          for (let i = 0; i < sliceCount; i++) {
            const sliceHeight = Math.random() * 30 + 5; // 5-35px slice
            const yPos = Math.random() * 80; // Position anywhere in the top 80%

            // Create the slice element
            const slice = document.createElement("div");
            slice.style.position = "absolute";
            slice.style.left = "0";
            slice.style.right = "0";
            slice.style.top = `${yPos}%`;
            slice.style.height = `${sliceHeight}px`;
            slice.style.backgroundColor = "transparent";
            slice.style.overflow = "hidden";
            slice.style.zIndex = "5";

            // Create a clone of the video inside the slice, but offset
            const offsetX = Math.random() * 20 - 10;
            const offsetY = Math.random() * 10 - 5;
            slice.style.transform = `translateX(${offsetX}px)`;

            // Add a neon border for dramatic effect
            const neonColor = ["#0ff", "#f0f", "#ff0", "#0f0"][
              Math.floor(Math.random() * 4)
            ];
            slice.style.boxShadow = `0 0 5px ${neonColor}, inset 0 0 5px ${neonColor}`;

            feed.querySelector(".camera-content").appendChild(slice);

            setTimeout(() => {
              slice.remove();
            }, glitchDuration - 50);
          }
          break;

        case "rgb-split":
          // Extreme RGB color channel separation with motion
          const rgbAmount = Math.random() * 20 + 10; // 10-30px split

          // Create dramatic RGB shadows with animation
          video.style.boxShadow = `
            ${rgbAmount}px 0 0 rgba(255, 0, 0, 0.8), 
            ${-rgbAmount}px 0 0 rgba(0, 255, 255, 0.8), 
            0 ${rgbAmount / 2}px 0 rgba(0, 255, 0, 0.8)
          `;

          // Animate the RGB split
          video.style.animation = `rgb-shift ${glitchDuration / 1000}s linear`;

          setTimeout(() => {
            video.style.boxShadow = "none";
            video.style.animation = "";
          }, glitchDuration);
          break;

        case "pixel":
          // Pixelation/Mosaic effect with neon edges
          video.style.filter = `blur(1px) contrast(1.5)`;

          // Add a pixelation overlay
          const pixelOverlay = document.createElement("div");
          pixelOverlay.style.position = "absolute";
          pixelOverlay.style.top = "0";
          pixelOverlay.style.left = "0";
          pixelOverlay.style.right = "0";
          pixelOverlay.style.bottom = "0";
          pixelOverlay.style.backgroundImage =
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 6px)";
          pixelOverlay.style.backgroundSize = "6px 6px";
          pixelOverlay.style.zIndex = "4";
          pixelOverlay.style.mixBlendMode = "overlay";

          feed.querySelector(".camera-content").appendChild(pixelOverlay);

          setTimeout(() => {
            video.style.filter = "";
            pixelOverlay.remove();
          }, glitchDuration);
          break;

        case "flicker":
          // Rapid strobing/flickering effect with color shifts
          const flickerCount = Math.floor(Math.random() * 10) + 5; // 5-15 flickers
          const flickerColors = [
            "rgba(255,0,255,0.5)",
            "rgba(0,255,255,0.5)",
            "rgba(255,255,0,0.5)",
            "rgba(0,0,0,0.7)"
          ];

          for (let i = 0; i < flickerCount; i++) {
            setTimeout(() => {
              // Random opacity flicker
              feed.style.opacity = Math.random() * 0.6 + 0.4;

              // Random position jitter
              const jitterX = Math.random() * 10 - 5;
              const jitterY = Math.random() * 10 - 5;
              video.style.transform = `translate(${jitterX}px, ${jitterY}px)`;

              // Random color overlay
              if (Math.random() < 0.5) {
                colorDistortion.style.backgroundColor =
                  flickerColors[
                    Math.floor(Math.random() * flickerColors.length)
                  ];
                colorDistortion.style.opacity = 0.7;
              } else {
                colorDistortion.style.opacity = 0;
              }

              // Last flicker, reset everything
              if (i === flickerCount - 1) {
                feed.style.opacity = 1;
                video.style.transform = "none";
                colorDistortion.style.opacity = 0;
              }
            }, (glitchDuration / flickerCount) * i);
          }
          break;

        case "neon":
          // Neon glow/edge effect with oversaturation
          video.style.filter = `saturate(300%) brightness(1.2) contrast(1.5)`;

          // Add neon border
          feed.querySelector(".camera-content").style.boxShadow = `
            inset 0 0 20px rgba(0, 255, 255, 0.8),
            0 0 10px rgba(255, 0, 255, 0.8)
          `;

          // Add a subtle pulse animation
          feed.querySelector(".camera-content").style.animation =
            "neon-pulse 0.5s alternate infinite";

          setTimeout(() => {
            video.style.filter = "";
            feed.querySelector(".camera-content").style.boxShadow = "";
            feed.querySelector(".camera-content").style.animation = "";
          }, glitchDuration);
          break;

        case "distort":
          // Extreme warping/distortion
          const skewX = Math.random() * 40 - 20;
          const skewY = Math.random() * 40 - 20;
          const rotate = Math.random() * 10 - 5;
          const scale = 0.8 + Math.random() * 0.4;

          video.style.transform = `skew(${skewX}deg, ${skewY}deg) rotate(${rotate}deg) scale(${scale})`;

          // Add pulsing effect
          setTimeout(() => {
            video.style.transform = `skew(${-skewX / 2}deg, ${
              -skewY / 2
            }deg) rotate(${-rotate}deg) scale(${2 - scale})`;

            setTimeout(() => {
              video.style.transform = "none";
            }, glitchDuration / 3);
          }, glitchDuration / 3);
          break;

        case "invert":
          // Color inversion with flashing
          video.style.filter = `invert(100%) hue-rotate(180deg)`;

          setTimeout(() => {
            video.style.filter = "";

            // Brief flash
            setTimeout(() => {
              video.style.filter = `invert(100%) hue-rotate(90deg)`;

              setTimeout(() => {
                video.style.filter = "";
              }, 100);
            }, 200);
          }, glitchDuration - 300);
          break;

        case "vhs":
          // VHS tracking issues with scan lines
          const scanLine = feed.querySelector(".scan-line");
          scanLine.style.opacity = 0.8;
          scanLine.style.backgroundSize = "100% 4px";

          // Add horizontal tracking lines
          for (let i = 0; i < 3; i++) {
            const trackingLine = document.createElement("div");
            trackingLine.style.position = "absolute";
            trackingLine.style.left = "0";
            trackingLine.style.right = "0";
            trackingLine.style.height = "2px";
            trackingLine.style.top = `${Math.random() * 100}%`;
            trackingLine.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            trackingLine.style.zIndex = "5";
            trackingLine.style.boxShadow = "0 0 5px rgba(0, 255, 255, 0.8)";

            feed.querySelector(".camera-content").appendChild(trackingLine);

            // Animate the tracking line
            setTimeout(() => {
              trackingLine.style.transform = `translateY(${
                Math.random() * 50 - 25
              }px)`;
              setTimeout(() => {
                trackingLine.remove();
              }, 300);
            }, Math.random() * 300);
          }

          // Horizontal shift
          video.style.transform = `translateX(${Math.random() * 30 - 15}px)`;

          setTimeout(() => {
            scanLine.style.opacity = "";
            scanLine.style.backgroundSize = "";
            video.style.transform = "none";
          }, glitchDuration);
          break;

        case "matrix":
          // Matrix-style digital rain effect
          const matrixOverlay = document.createElement("div");
          matrixOverlay.style.position = "absolute";
          matrixOverlay.style.top = "0";
          matrixOverlay.style.left = "0";
          matrixOverlay.style.right = "0";
          matrixOverlay.style.bottom = "0";
          matrixOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
          matrixOverlay.style.zIndex = "4";
          matrixOverlay.style.color = "#0f0";
          matrixOverlay.style.fontSize = "10px";
          matrixOverlay.style.overflow = "hidden";
          matrixOverlay.style.mixBlendMode = "screen";

          // Generate random matrix characters
          let matrixHtml = "";
          for (let i = 0; i < 20; i++) {
            const chars =
              "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデド";
            const randomChars = Array.from(
              { length: 20 },
              () => chars[Math.floor(Math.random() * chars.length)]
            ).join("");
            matrixHtml += `<div style="opacity:${
              Math.random() * 0.7 + 0.3
            }">${randomChars}</div>`;
          }
          matrixOverlay.innerHTML = matrixHtml;

          feed.querySelector(".camera-content").appendChild(matrixOverlay);

          // Add digital glitch filter
          video.style.filter = "brightness(1.2) contrast(1.5) saturate(0.7)";

          setTimeout(() => {
            matrixOverlay.remove();
            video.style.filter = "";
          }, glitchDuration);
          break;

        case "xray":
          // X-ray/negative effect with dramatic edge detection
          video.style.filter =
            "invert(85%) contrast(2) brightness(1.5) saturate(0.2)";

          // Add scan effect
          const scanOverlay = document.createElement("div");
          scanOverlay.style.position = "absolute";
          scanOverlay.style.top = "0";
          scanOverlay.style.left = "0";
          scanOverlay.style.right = "0";
          scanOverlay.style.bottom = "0";
          scanOverlay.style.background =
            "linear-gradient(transparent, rgba(0, 255, 255, 0.2), transparent)";
          scanOverlay.style.backgroundSize = "100% 100%";
          scanOverlay.style.animation = "scan-move 1s linear infinite";
          scanOverlay.style.zIndex = "4";
          scanOverlay.style.mixBlendMode = "exclusion";

          feed.querySelector(".camera-content").appendChild(scanOverlay);

          setTimeout(() => {
            video.style.filter = "";
            scanOverlay.remove();
          }, glitchDuration);
          break;
      }
    });

    // Log camera glitch with dramatic error messages
    if (Math.random() < 0.6) {
      const cameraId = feed.querySelector(".camera-id").textContent;
      const glitchMessages = [
        "REALITY CORRUPTION",
        "FEED DESTABILIZATION",
        "DIMENSIONAL INTERFERENCE",
        "QUANTUM BIT ERROR",
        "NEURAL NETWORK FAILURE",
        "TEMPORAL ANOMALY",
        "SYSTEM BREACH",
        "CONNECTION FRAGMENTED",
        "DATA EXTRACTION ERROR",
        "PROTOCOL VIOLATION"
      ];
      const glitchMessage =
        glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
      logEvent(`${glitchMessage}: ${cameraId}`);
    }
  }

  // Setup reduced motion alternative effects
  function setupReducedMotionEffects() {
    cameraFeeds.forEach((feed) => {
      const noiseOverlay = feed.querySelector(".noise-overlay");
      noiseOverlay.style.opacity = 0.02;

      // Add subtle visual indicators instead of animations
      feed.querySelector(".camera-content").style.border =
        "1px solid rgba(33, 150, 243, 0.3)";
    });
  }

  // Toggle fullscreen for a camera when clicked
  cameraFeeds.forEach((feed) => {
    feed.addEventListener("click", () => {
      // If already fullscreen, revert back
      if (feed.classList.contains("fullscreen")) {
        feed.classList.remove("fullscreen");
        document.body.style.overflow = "auto";
      } else {
        // Remove fullscreen from any other feed
        document.querySelectorAll(".camera-feed.fullscreen").forEach((f) => {
          f.classList.remove("fullscreen");
        });

        // Make this feed fullscreen
        feed.classList.add("fullscreen");
        document.body.style.overflow = "hidden";

        // Log the action
        const cameraId = feed.querySelector(".camera-id").textContent;
        logEvent(`EXPANDED VIEW: ${cameraId}`);
      }
    });
  });

  // Toggle grid layout
  toggleGridBtn.addEventListener("click", () => {
    switch (gridState) {
      case "three-per-row":
        cameraGrid.classList.remove("three-per-row");
        cameraGrid.classList.add("two-per-row");
        gridState = "two-per-row";
        toggleGridBtn.textContent = "2x GRID";
        logEvent("SWITCHED TO 2x3 GRID VIEW");
        break;
      case "two-per-row":
        cameraGrid.classList.remove("two-per-row");
        cameraGrid.classList.add("single-column");
        gridState = "single-column";
        toggleGridBtn.textContent = "1x GRID";
        logEvent("SWITCHED TO SINGLE COLUMN VIEW");
        break;
      case "single-column":
        cameraGrid.classList.remove("single-column");
        cameraGrid.classList.add("three-per-row");
        gridState = "three-per-row";
        toggleGridBtn.textContent = "3x GRID";
        logEvent("SWITCHED TO 3x2 GRID VIEW");
        break;
    }
  });

  // Toggle color/BW filter
  toggleFilterBtn.addEventListener("click", () => {
    isColorMode = !isColorMode;

    videoElements.forEach((video) => {
      if (isColorMode) {
        video.classList.add("color-mode");
        toggleFilterBtn.textContent = "BW MODE";
      } else {
        video.classList.remove("color-mode");
        toggleFilterBtn.textContent = "COLOR MODE";
      }
    });

    logEvent(`SWITCHED TO ${isColorMode ? "COLOR" : "MONOCHROME"} MODE`);
  });

  // Reset system button
  resetSystemBtn.addEventListener("click", () => {
    document.querySelector(".status-alert").textContent = "REBOOTING";
    logEvent("SYSTEM RESET INITIATED");

    // Apply visual reboot effect
    document.querySelectorAll(".camera-content").forEach((content) => {
      content.style.opacity = 0.2;
    });

    // Simulate system reboot
    setTimeout(() => {
      logEvent("CLEARING MEMORY BUFFER...");
      setTimeout(() => {
        logEvent("RESTARTING CAMERA MODULES...");
        setTimeout(() => {
          // Restore camera feeds
          document.querySelectorAll(".camera-content").forEach((content) => {
            content.style.opacity = 1;
          });

          // Reset videos
          videoElements.forEach((video) => {
            video.currentTime = 0;
            video.play().catch((e) => console.error("Video restart error:", e));
          });

          // Randomize scanlines again
          randomizeScanLines();

          // Update system status
          document.querySelector(".status-alert").textContent = "ONLINE";
          logEvent("SYSTEM SUCCESSFULLY REBOOTED");

          // Trigger a few random glitches to simulate system instability after reboot
          setTimeout(() => {
            if (!prefersReducedMotion) {
              cameraFeeds.forEach((feed) => {
                const glitchOverlay = feed.querySelector(".glitch-overlay");
                const colorDistortion = feed.querySelector(".color-distortion");
                const video = feed.querySelector(".camera-video");

                setTimeout(() => {
                  applyRandomGlitch(
                    feed,
                    video,
                    glitchOverlay,
                    colorDistortion
                  );
                }, Math.random() * 2000);
              });
            }
          }, 1000);
        }, 1500);
      }, 1000);
    }, 1000);
  });

  // Force glitch button
  triggerGlitchBtn.addEventListener("click", () => {
    logEvent("WARNING: MANUAL INTERFERENCE DETECTED");

    if (prefersReducedMotion) {
      // Alternative feedback for reduced motion
      document.querySelectorAll(".camera-content").forEach((content) => {
        content.style.borderColor = "var(--error-color)";
        setTimeout(() => {
          content.style.borderColor = "rgba(33, 150, 243, 0.3)";
        }, 2000);
      });
      return;
    }

    // Apply simultaneous glitches to all cameras
    cameraFeeds.forEach((feed) => {
      const glitchOverlay = feed.querySelector(".glitch-overlay");
      const colorDistortion = feed.querySelector(".color-distortion");
      const video = feed.querySelector(".camera-video");

      // Create more severe glitch for this manual trigger
      // Random horizontal and vertical displacement
      video.style.transform = `translate(${Math.random() * 10 - 5}px, ${
        Math.random() * 10 - 5
      }px)`;

      // Color channel split
      video.style.boxShadow = `${
        Math.random() * 8 - 4
      }px 0 0 rgba(255,0,0,0.5), ${
        Math.random() * -8 + 4
      }px 0 0 rgba(0,255,255,0.5)`;

      // Increase static
      feed.querySelector(".noise-overlay").style.opacity = 0.3;

      // Add color tint
      colorDistortion.style.opacity = 0.4;
      colorDistortion.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      colorDistortion.style.mixBlendMode = "hard-light";

      // Reset after a short delay
      setTimeout(() => {
        video.style.transform = "none";
        video.style.boxShadow = "none";
        feed.querySelector(".noise-overlay").style.opacity = 0.03;
        colorDistortion.style.opacity = 0;

        // Sometimes add a secondary glitch
        if (Math.random() < 0.5) {
          setTimeout(() => {
            applyRandomGlitch(feed, video, glitchOverlay, colorDistortion);
          }, Math.random() * 1000 + 500);
        }
      }, 800);
    });

    // Add system response to manual glitch
    setTimeout(() => {
      logEvent("SYSTEM ATTEMPTING TO STABILIZE SIGNAL...");
    }, 1200);
  });

  // Handle escape key to exit fullscreen
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const fullscreenCamera = document.querySelector(
        ".camera-feed.fullscreen"
      );
      if (fullscreenCamera) {
        fullscreenCamera.classList.remove("fullscreen");
        document.body.style.overflow = "auto";
      }
    }
  });

  // Initialize the system
  initializeSystem();
});
