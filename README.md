# 🔗 Link Vault

A sleek, responsive, and light/dark theme-enabled web application for organizing, searching, and managing your essential web links and tags. Built with **React**, **TypeScript**, **CSS Grid/Flexbox**, and **Reicon Icons**.

---

## ✨ Features

- 🎯 **Dashboard Overview**: Quick insight into your total saved links, total tags, and your most recently added link.
- ⚡ **Seamless Navigation**: Custom lightweight routing implementation (`navigateTo`) for snappy view switches without heavy router overhead.
- 🔍 **Global Quick Search**: Instant modal search across all saved links by title or keywords from any page.
- 🌓 **Theme Toggle**: Light and Dark mode switcher powered by custom CSS variables.
- 🏷️ **Tag Management**: Categorize links with tags and add custom tags directly via an interactive modal.
- 📱 **Fully Responsive**: Adaptive CSS Grid and Flexbox layout tailored for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Reicon React](https://github.com/reicon)
- **Styling**: Pure Modular CSS with CSS Custom Properties (Variables)
- **State & Storage**: Client-side Service layer (`Service.ts`)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── ActionHeader.tsx       # Search modal & Dark/Light mode toggle
│   ├── AddNewLink.tsx          # Create new link view
│   ├── AddTagModal.tsx         # Modal interface for adding custom tags
│   ├── Buttons.tsx             # Reusable action buttons
│   ├── Dashboard.tsx           # Main application dashboard
│   ├── EditExistingLink.tsx    # Modify existing link details
│   ├── LinkDetails.tsx         # Detailed view for individual links
│   ├── MostRecentLink.tsx      # Showcase card for the latest link
│   ├── NavigationItem.tsx      # Side/Top navigation bar
│   ├── PageTitle.tsx           # View title header component
│   ├── SearchModal.tsx         # Standalone quick search overlay
│   └── TextInputField.tsx      # Styled form text input component
├── service/
│   └── service.ts              # Data management layer for link CRUD actions
├── App.tsx                     # Main application entry & custom router switch
├── App.css                     # Global layout, grid, and theme variables
└── navigation.ts               # Custom window location dispatcher
```
