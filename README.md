# Orbit - Productivity Dashboard

A high-end, feature-rich productivity application that combines calendar management, task tracking, status monitoring, and personal insights into a single, elegant interface. Built with vanilla JavaScript, HTML5, and CSS3, Orbit provides a smooth, modern experience for managing your daily workflow.

![Orbit Productivity Dashboard](https://img.shields.io/badge/Status-Active-success) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

### 📅 Event Management
- **Today's Schedule**: View all events scheduled for today with live status indicators
- **Tomorrow's Preview**: See upcoming events for the next day with full hover, edit, and delete functionality
- **Full Calendar View**: 
  - Click the calendar icon to open a comprehensive weekly view (Sunday through Saturday)
  - Navigate between past and future weeks with previous/next buttons
  - "Today" button to quickly jump to the current week
  - All events displayed with visual priority indicators
  - Scrollable week grid with detailed event cards
- **Smart Recurring Events**: 
  - Daily, weekly, and monthly repeats
  - **Custom repeat days**: Select specific days of the week (e.g., Monday, Wednesday, Friday)
  - Events automatically appear on matching days based on repeat patterns
  - Accurate date tracking ensures events only appear on correct days
- **Event Details**: 
  - All-day or timed events
  - Priority levels (Normal, Important, Urgent)
  - Multiple calendar categories (Personal, Work, Focus, Social)
  - Location and guest management
  - Meeting links
  - Rich descriptions
  - Custom color coding
- **Visual Priority Indicators**:
  - **Urgent events**: Red glow with pulsing animation
  - **Important events**: Amber/orange glow with pulsing animation
  - **Running events**: Blue glow indicating live events
  - Hover tooltips with detailed event information

### ✅ Task Management
- **Smart Task Queue**: 
  - **Priority-based sorting**: Tasks sorted by priority (Urgent → Important → Normal) then by due date
  - **Start date filtering**: Tasks not yet started are hidden by default
  - **Completed task management**: Completed tasks move to bottom and automatically disappear after deadline passes
  - **Automatic urgency**: Tasks due today or overdue are automatically marked as urgent
  - **Overdue warnings**: Incomplete overdue tasks show visual warnings with red highlighting
- **Task Details**:
  - Start and due dates
  - Priority levels
  - Reference links (clickable task titles that open in new tabs)
  - Detailed notes
- **Full List Toggle**: Option to view all tasks including those that haven't started yet
- **Visual Priority Indicators**:
  - **Urgent tasks**: Red glow and highlighting
  - **Important tasks**: Amber/orange glow and highlighting
  - Priority-based visual distinction throughout the interface

### 🎨 Status Tracking
- **Custom Status System**: 
  - Create personalized status indicators with custom labels, colors, and images
  - "Invisible" default status option
  - Visual status display with associated images
- **Status Management**:
  - Add, edit, delete, and rearrange statuses
  - Drag-and-drop reordering
  - Image uploads for visual representation
  - Dropdown selector for quick status changes

### 📊 Insights & Analytics
- **Upcoming Highlights Panel**:
  - Urgent and important events in the next 7 days
  - Due dates approaching
  - Summary counts and detailed listings
- **Metrics Dashboard**:
  - Today's event count
  - Total task count
  - Focus items (high-priority events + active/overdue tasks)

### 📝 Notes & Reminders
- **Persistent Notes**: 
  - Auto-saving notes section
  - Timestamp on last save
  - Large, scrollable text area

### 🎨 Customization
- **Four Beautiful Themes**:
  - **Aurora**: Deep blue gradient with vibrant accents
  - **Midnight**: Dark purple tones with neon accents
  - **Solar**: Warm, light theme with orange accents
  - **Mono**: High-contrast black and white with subdued blue accents
- **Resizable Layout**:
  - Adjustable panel sizes with visual drag handles
  - Saved layout preferences persist across sessions
  - Three-way split functionality for optimal workspace organization
  - Drag handles with hover effects for intuitive resizing
- **Settings Menu**:
  - Bottom-right corner settings button (three vertical dots)
  - Quick access to "Load sample day" and "Reset" options
  - Confirmation dialogs for data-altering actions
  - Elegant dropdown menu with smooth animations

### 💾 Data Persistence
- **Local Storage**: All data (events, tasks, statuses, notes, preferences) is automatically saved to browser localStorage
- **Session Continuity**: Your workspace state is preserved between browser sessions
- **Auto-save**: Changes are saved immediately without manual intervention

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build process required - runs entirely client-side

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd productivity
```

2. Open `index.html` in your web browser, or use a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### Quick Start Guide

1. **Create Your First Event**:
   - Click the "+" button in the "Today's schedule" header
   - Fill in event details (title, date, time, priority)
   - Set up recurring patterns if needed
   - Click "Save event"

2. **Add Tasks**:
   - Click the "+" button in the "To-do command list" header
   - Enter task name, start date, due date, and priority
   - Add reference links or notes as needed
   - Save to add to your task queue

3. **Customize Your Status**:
   - Click the "+" button in the status section
   - Create statuses with custom colors and images
   - Select your current status from the dropdown

4. **Personalize**:
   - Choose your preferred theme from the header dropdown
   - Adjust panel sizes by dragging the dividers
   - Your preferences will be saved automatically

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Variables for theming
- **Layout**: CSS Grid and Flexbox
- **Resizing**: Split.js library for panel management
- **Icons**: Font Awesome 6
- **Storage**: Browser localStorage API

### Project Structure
```
productivity/
├── index.html          # Main HTML structure
├── app.js              # Application logic and state management
├── styles.css          # All styling, themes, and animations
└── README.md           # This file
```

### Key Components

#### State Management
- Centralized state object stored in localStorage
- Automatic persistence on all data changes
- Default state initialization for new users

#### Rendering System
- Modular render functions for each section
- Efficient DOM updates with scroll position preservation
- Event delegation for dynamic list items

#### Event System
- Custom repeat pattern matching
- Date-based filtering for today/tomorrow views
- Time-based status calculation (running, upcoming, completed)

#### Task System
- Priority-based sorting algorithm
- Start date filtering
- Overdue detection and auto-escalation
- Completion state management

## 📖 Usage Guide

### Creating Recurring Events
1. Open the event creation modal
2. Set your repeat pattern (Daily, Weekly, Monthly, or Custom days)
3. For custom repeats, select specific days of the week
4. The event will automatically appear on matching dates

### Managing Priorities
- **Urgent**: Red glow with pulsing animation, appears first in lists, tasks due today automatically become urgent
- **Important**: Amber/orange glow with pulsing animation, second priority
- **Normal**: Default styling, lowest priority
- Visual priority indicators work across all views (today, tomorrow, calendar view)

### Using the Status System
- Click "Add" to create a new status with label, color, and optional image
- Click "Edit" to manage all statuses, reorder them, or make changes
- Select a status from the dropdown to set your current status
- The status display shows your selected status with its associated image
- Status images are automatically resized and displayed with proper aspect ratio
- "Invisible" default status option for when no status is active

### Task Workflow
1. **Active Tasks**: Tasks that have started or have no start date
2. **Tasks Due Today**: Automatically marked as urgent with red glow
3. **Overdue Tasks**: Automatically become urgent and show warning badges
4. **Completed Tasks**: Move to bottom of list, disappear after deadline passes
5. **Future Tasks**: Hidden by default, visible with "See full list" toggle

### Layout Customization
- Drag the vertical dividers between main sections to adjust widths
- Drag the horizontal dividers in the right column to resize panels
- All layout preferences are saved automatically
- Layout state persists across browser sessions and page reloads

### Using the Calendar View
1. Click the calendar icon in the "Today's schedule" header
2. Navigate weeks using the previous/next arrow buttons
3. Click "Today" to quickly return to the current week
4. View all events in a weekly grid format (Sunday through Saturday)
5. Events display with visual priority indicators (glows and colors)
6. Hover over events to see detailed tooltips
7. Edit and delete events directly from the calendar view

## 🎨 Design Philosophy

Orbit is designed with a **high-end, non-minimalist aesthetic** that emphasizes:

- **Visual Richness**: Gradients, shadows, blur effects, and smooth animations
- **Information Density**: Maximum productivity without clutter
- **Visual Hierarchy**: Color coding, typography, and spacing guide attention
- **Consistency**: Unified design language across all components
- **Smooth Interactions**: Transitions, hover effects, and responsive feedback

## 🔧 Technical Details

### Browser Compatibility
- Modern browsers with ES6+ support
- localStorage API required
- CSS Grid and Flexbox support needed
- Recommended: Latest versions of Chrome, Firefox, Safari, or Edge

### Performance
- Optimized rendering with minimal DOM updates
- Efficient event filtering and sorting algorithms
- Lazy loading of modal content
- Debounced auto-save for notes

### Data Format
All data is stored in JSON format in localStorage under the key `orbit_state_v1`:
- Events array with full event details
- Todos array with task information
- Statuses array for custom status definitions
- Notes as plain text
- UI preferences (theme, split sizes, visibility toggles)

## 🚧 Future Enhancements

Potential features for future development:
- Cloud synchronization
- Multiple workspace support
- Export/import functionality
- Month view calendar option
- Task dependencies
- Time tracking
- Collaboration features
- Mobile app version
- Custom repeat patterns (e.g., "every 2 weeks", "first Monday of month")

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📧 Support

For questions, issues, or feedback, please open an issue in the repository.

---

**Built with ❤️ for productivity enthusiasts**
