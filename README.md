# Smart Task Manager with AI Assistance

A beautiful, modern task management application built with Next.js that uses Google Gemini AI to provide intelligent task breakdown suggestions.

## ✨ Features

- **AI-Powered Subtask Suggestions**: Break down complex tasks into actionable steps using Google Gemini AI
- **Complete Task Management**: Create, edit, delete, and mark tasks as complete
- **Beautiful Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, glassmorphism design with subtle gradients and shadows
- **Real-time Stats**: Track your progress with completion statistics
- **Search & Filter**: Find tasks quickly with search and status filtering
- **Local Storage**: Tasks persist between sessions

## 🚀 Technologies Used

- **Next.js 13+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **shadcn/ui** - Reusable UI components
- **Google Gemini API** - AI-powered task suggestions
- **Lucide React** - Beautiful icons

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key (free)

### 1. Get a Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd smart-task-manager

# Install dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your API key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Application

```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### 5. Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🎯 How to Use

### Creating Tasks
1. Click the "Add Task" button
2. Fill in the task title, description (optional), and due date
3. Click "Create Task"

### AI Subtask Suggestions
1. On any task card, click "Suggest Subtasks"
2. The AI will analyze your task and provide 3-5 actionable subtasks
3. View the suggestions by clicking the button again

### Managing Tasks
- **Complete**: Check the checkbox to mark as complete
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon to remove the task
- **Search**: Use the search bar to find specific tasks
- **Filter**: Use the status dropdown to filter by pending/completed

## 🔧 API Routes

- `POST /api/tasks/suggest-subtasks` - Generate AI subtask suggestions

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── TaskCard.tsx      # Individual task display
│   ├── TaskForm.tsx      # Task creation/editing form
│   └── TaskStats.tsx     # Statistics display
├── lib/                  # Utility functions
│   ├── storage.ts        # Local storage management
│   └── utils.ts          # General utilities
├── types/                # TypeScript type definitions
│   └── task.ts           # Task-related types
└── README.md            # This file
```

## 🤖 AI Integration

The application integrates with Google Gemini AI to provide intelligent task breakdown:

- **Smart Analysis**: AI analyzes task titles and descriptions
- **Actionable Steps**: Generates 3-5 specific, actionable subtasks
- **Context Aware**: Takes into account task complexity and domain
- **Secure**: API key is stored securely in environment variables

## 🎨 Design Philosophy

- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Micro-interactions**: Subtle animations that provide feedback
- **Accessibility**: High contrast ratios and keyboard navigation
- **Mobile-first**: Responsive design that works on all devices
- **Performance**: Optimized animations and lazy loading

## 🧩 Challenges Faced

1. **State Management**: Managing complex task state with local storage persistence
2. **Animation Coordination**: Coordinating multiple animations without performance issues
3. **AI Integration**: Parsing and formatting AI responses consistently
4. **Responsive Design**: Ensuring smooth animations across different screen sizes
5. **Type Safety**: Maintaining strict TypeScript types throughout the application

## 🚀 Future Enhancements

- [ ] Cloud synchronization
- [ ] Task categories and tags
- [ ] Due date notifications
- [ ] Collaboration features
- [ ] Advanced AI suggestions
- [ ] Export/import functionality


---

Built with ❤️ using Next.js and Google Gemini AI