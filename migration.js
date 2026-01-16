// Migration from localStorage to IndexedDB for Orbit
const PRESETS_STORAGE_KEY = "orbit_presets_v1";
const STATE_STORAGE_KEY = "orbit_state_v1";
const PRESETS_MIGRATION_FLAG_KEY = "orbit_presets_migrated_v1";
const STATE_MIGRATION_FLAG_KEY = "orbit_state_migrated_v1";

/**
 * Check if preset migration has already been completed
 * @returns {boolean}
 */
function isPresetMigrationComplete() {
  try {
    return localStorage.getItem(PRESETS_MIGRATION_FLAG_KEY) === "true";
  } catch (error) {
    return false;
  }
}

/**
 * Mark preset migration as complete
 */
function markPresetMigrationComplete() {
  try {
    localStorage.setItem(PRESETS_MIGRATION_FLAG_KEY, "true");
  } catch (error) {
    console.error("Error marking preset migration as complete:", error);
  }
}

/**
 * Check if state migration has already been completed
 * @returns {boolean}
 */
function isStateMigrationComplete() {
  try {
    return localStorage.getItem(STATE_MIGRATION_FLAG_KEY) === "true";
  } catch (error) {
    return false;
  }
}

/**
 * Mark state migration as complete
 */
function markStateMigrationComplete() {
  try {
    localStorage.setItem(STATE_MIGRATION_FLAG_KEY, "true");
  } catch (error) {
    console.error("Error marking state migration as complete:", error);
  }
}

/**
 * Get presets from localStorage (legacy storage)
 * @returns {Object}
 */
function getPresetsFromLocalStorage() {
  try {
    const raw = localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error loading presets from localStorage:", error);
    return {};
  }
}

/**
 * Clear presets from localStorage after successful migration
 */
function clearLocalStoragePresets() {
  try {
    localStorage.removeItem(PRESETS_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage presets:", error);
  }
}

/**
 * Get state from localStorage (legacy storage)
 * @returns {Object|null}
 */
function getStateFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STATE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return null;
  }
}

/**
 * Migrate presets from localStorage to IndexedDB
 * @returns {Promise<boolean>} True if migration was performed, false if already migrated or no data
 */
async function migratePresetsToIndexedDB() {
  // Check if migration already completed
  if (isPresetMigrationComplete()) {
    return false;
  }

  // Get presets from localStorage
  const presets = getPresetsFromLocalStorage();
  
  // If no presets in localStorage, mark as migrated and return
  if (Object.keys(presets).length === 0) {
    markPresetMigrationComplete();
    return false;
  }

  try {
    // Use IndexedDB functions (exposed globally from db.js)
    if (typeof window.savePresets === "function") {
      // Save all presets to IndexedDB
      await window.savePresets(presets);
      
      // Mark migration as complete
      markPresetMigrationComplete();
      
      // Clear localStorage (optional - you can keep it as backup)
      // clearLocalStoragePresets();
      
      console.log(`Migrated ${Object.keys(presets).length} preset(s) from localStorage to IndexedDB`);
      return true;
    } else {
      console.error("IndexedDB functions not available for preset migration");
      return false;
    }
  } catch (error) {
    console.error("Error during preset migration:", error);
    // Don't mark as complete if migration failed - will retry on next load
    return false;
  }
}

/**
 * Migrate main state from localStorage to IndexedDB
 * @returns {Promise<boolean>} True if migration was performed, false if already migrated or no data
 */
async function migrateStateToIndexedDB() {
  // Check if migration already completed
  if (isStateMigrationComplete()) {
    return false;
  }

  // Get state from localStorage
  const stateData = getStateFromLocalStorage();
  
  // If no state in localStorage, mark as migrated and return
  if (!stateData) {
    markStateMigrationComplete();
    return false;
  }

  try {
    // Use IndexedDB functions (exposed globally from db.js)
    if (typeof window.saveState === "function") {
      // Save state to IndexedDB
      await window.saveState(stateData);
      
      // Mark migration as complete
      markStateMigrationComplete();
      
      // Clear localStorage (optional - you can keep it as backup)
      // localStorage.removeItem(STATE_STORAGE_KEY);
      
      console.log("Migrated main state from localStorage to IndexedDB");
      return true;
    } else {
      console.error("IndexedDB functions not available for state migration");
      return false;
    }
  } catch (error) {
    console.error("Error during state migration:", error);
    // Don't mark as complete if migration failed - will retry on next load
    return false;
  }
}

/**
 * Initialize all migrations on app load
 * Should be called once when the app starts, before loading state
 */
async function initPresetMigration() {
  try {
    await migratePresetsToIndexedDB();
    await migrateStateToIndexedDB();
  } catch (error) {
    console.error("Failed to initialize migrations:", error);
  }
}
