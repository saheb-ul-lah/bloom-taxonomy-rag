Directory structure:
bloom-taxonomy-rag/
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── backend/
    │   ├── package.json
    │   ├── server.js
    │   ├── .gitignore
    │   └── prisma/
    │       ├── schema.prisma
    │       └── migrations/
    │           ├── migration_lock.toml
    │           └── 20250510172209_init/
    │               └── migration.sql
    ├── prompts/
    │   ├── backend_files.md
    │   └── frontend_file.txt
    ├── public/
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── ChatHistory.tsx
        │   ├── ChatInput.tsx
        │   ├── ChatMessages.tsx
        │   ├── Footer.tsx
        │   ├── hero.tsx
        │   ├── Navbar.tsx
        │   ├── QuestionPreferences.tsx
        │   ├── UserDropdown.tsx
        │   ├── dashboard/
        │   │   ├── CustomPromptEditor.tsx
        │   │   ├── QuestionPapers.tsx
        │   │   ├── SubjectNotes.tsx
        │   │   └── TeachersInfo.tsx
        │   ├── preferences/
        │   │   ├── CustomMarksDistribution.tsx
        │   │   ├── MarksDistributionSelector.tsx
        │   │   └── PatternStreamSelector.tsx
        │   └── ui/
        │       ├── accordion.tsx
        │       ├── alert-dialog.tsx
        │       ├── alert.tsx
        │       ├── aspect-ratio.tsx
        │       ├── avatar.tsx
        │       ├── badge.tsx
        │       ├── breadcrumb.tsx
        │       ├── button.tsx
        │       ├── calendar.tsx
        │       ├── card.tsx
        │       ├── carousel.tsx
        │       ├── chart.tsx
        │       ├── checkbox.tsx
        │       ├── collapsible.tsx
        │       ├── command.tsx
        │       ├── context-menu.tsx
        │       ├── dialog.tsx
        │       ├── drawer.tsx
        │       ├── dropdown-menu.tsx
        │       ├── flip-words.tsx
        │       ├── form.tsx
        │       ├── hover-card.tsx
        │       ├── input-otp.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       ├── menubar.tsx
        │       ├── navigation-menu.tsx
        │       ├── pagination.tsx
        │       ├── popover.tsx
        │       ├── progress.tsx
        │       ├── radio-group.tsx
        │       ├── resizable.tsx
        │       ├── scroll-area.tsx
        │       ├── select.tsx
        │       ├── separator.tsx
        │       ├── sheet.tsx
        │       ├── sidebar.tsx
        │       ├── skeleton.tsx
        │       ├── slider.tsx
        │       ├── sonner.tsx
        │       ├── switch.tsx
        │       ├── table.tsx
        │       ├── tabs.tsx
        │       ├── textarea.tsx
        │       ├── toast.tsx
        │       ├── toaster.tsx
        │       ├── toggle-group.tsx
        │       ├── toggle.tsx
        │       ├── tooltip.tsx
        │       └── use-toast.ts
        ├── hooks/
        │   ├── use-mobile.tsx
        │   └── use-toast.ts
        ├── lib/
        │   └── utils.ts
        ├── pages/
        │   ├── ChatPage.tsx
        │   ├── Index.tsx
        │   ├── LandingPage.tsx
        │   ├── Login.tsx
        │   ├── NotFound.tsx
        │   ├── Signup.tsx
        │   └── TeachersDashboard.tsx
        └── types/
            └── questionPreferences.ts
