// IndexedDB Database Management for Orbit
const DB_NAME = "orbit_db";
const DB_VERSION = 2; // Incremented to add state store
const PRESETS_STORE = "presets";
const STATE_STORE = "state";

let dbInstance = null;

/**
 * Open or create the IndexedDB database
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Failed to open database"));
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create presets object store if it doesn't exist
      if (!db.objectStoreNames.contains(PRESETS_STORE)) {
        const store = db.createObjectStore(PRESETS_STORE, { keyPath: "name" });
        store.createIndex("savedAt", "savedAt", { unique: false });
      }
      
      // Create state object store if it doesn't exist
      if (!db.objectStoreNames.contains(STATE_STORE)) {
        db.createObjectStore(STATE_STORE, { keyPath: "id" });
      }
    };
  });
}

/**
 * Get all presets from IndexedDB
 * @returns {Promise<Object>} Object with preset names as keys
 */
async function getPresets() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PRESETS_STORE], "readonly");
      const store = transaction.objectStore(PRESETS_STORE);
      const request = store.getAll();

      request.onerror = () => {
        reject(new Error("Failed to get presets"));
      };

      request.onsuccess = () => {
        const presets = {};
        request.result.forEach(preset => {
          presets[preset.name] = preset;
        });
        resolve(presets);
      };
    });
  } catch (error) {
    console.error("Error getting presets from IndexedDB:", error);
    return {};
  }
}

/**
 * Save a preset to IndexedDB
 * @param {string} name - Preset name
 * @param {Object} presetData - Preset data object
 * @returns {Promise<void>}
 */
async function savePreset(name, presetData) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PRESETS_STORE], "readwrite");
      const store = transaction.objectStore(PRESETS_STORE);
      const request = store.put({
        name: name,
        ...presetData
      });

      request.onerror = () => {
        reject(new Error("Failed to save preset"));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  } catch (error) {
    console.error("Error saving preset to IndexedDB:", error);
    throw error;
  }
}

/**
 * Save multiple presets to IndexedDB
 * @param {Object} presets - Object with preset names as keys
 * @returns {Promise<void>}
 */
async function savePresets(presets) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PRESETS_STORE], "readwrite");
      const store = transaction.objectStore(PRESETS_STORE);
      
      // Clear existing presets first
      const clearRequest = store.clear();
      
      clearRequest.onsuccess = () => {
        // Add all presets
        const presetNames = Object.keys(presets);
        let completed = 0;
        
        if (presetNames.length === 0) {
          resolve();
          return;
        }
        
        presetNames.forEach(name => {
          const request = store.put({
            name: name,
            ...presets[name]
          });
          
          request.onsuccess = () => {
            completed++;
            if (completed === presetNames.length) {
              resolve();
            }
          };
          
          request.onerror = () => {
            reject(new Error(`Failed to save preset: ${name}`));
          };
        });
      };
      
      clearRequest.onerror = () => {
        reject(new Error("Failed to clear presets"));
      };
    });
  } catch (error) {
    console.error("Error saving presets to IndexedDB:", error);
    throw error;
  }
}

/**
 * Delete a preset from IndexedDB
 * @param {string} name - Preset name
 * @returns {Promise<void>}
 */
async function deletePreset(name) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PRESETS_STORE], "readwrite");
      const store = transaction.objectStore(PRESETS_STORE);
      const request = store.delete(name);

      request.onerror = () => {
        reject(new Error("Failed to delete preset"));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  } catch (error) {
    console.error("Error deleting preset from IndexedDB:", error);
    throw error;
  }
}

/**
 * Get a single preset by name
 * @param {string} name - Preset name
 * @returns {Promise<Object|null>}
 */
async function getPreset(name) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PRESETS_STORE], "readonly");
      const store = transaction.objectStore(PRESETS_STORE);
      const request = store.get(name);

      request.onerror = () => {
        reject(new Error("Failed to get preset"));
      };

      request.onsuccess = () => {
        resolve(request.result || null);
      };
    });
  } catch (error) {
    console.error("Error getting preset from IndexedDB:", error);
    return null;
  }
}

/**
 * Get the main state from IndexedDB
 * @returns {Promise<Object|null>}
 */
async function getState() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STATE_STORE], "readonly");
      const store = transaction.objectStore(STATE_STORE);
      const request = store.get("main");

      request.onerror = () => {
        reject(new Error("Failed to get state"));
      };

      request.onsuccess = () => {
        resolve(request.result ? request.result.data : null);
      };
    });
  } catch (error) {
    console.error("Error getting state from IndexedDB:", error);
    return null;
  }
}

/**
 * Save the main state to IndexedDB
 * @param {Object} stateData - The state object to save
 * @returns {Promise<void>}
 */
async function saveState(stateData) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STATE_STORE], "readwrite");
      const store = transaction.objectStore(STATE_STORE);
      const request = store.put({
        id: "main",
        data: stateData,
        updatedAt: new Date().toISOString()
      });

      request.onerror = () => {
        reject(new Error("Failed to save state"));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  } catch (error) {
    console.error("Error saving state to IndexedDB:", error);
    throw error;
  }
}

// Expose functions globally for use in app.js and migration.js
// Must be after function definitions
// Use a different namespace to avoid conflicts with app.js functions
window.dbGetPresets = getPresets;
window.dbSavePreset = savePreset;
window.dbSavePresets = savePresets;
window.dbDeletePreset = deletePreset;
window.dbGetPreset = getPreset;
window.dbGetState = getState;
window.dbSaveState = saveState;

// Also expose with original names for migration.js compatibility
window.getPresets = getPresets;
window.savePreset = savePreset;
window.savePresets = savePresets;
window.deletePreset = deletePreset;
window.getPreset = getPreset;
window.getState = getState;
window.saveState = saveState;
