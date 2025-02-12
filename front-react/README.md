arborescence du projet :

frontend/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── placeholder.png
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.styles.ts
│   │   │   │   └── index.ts
│   │   │   └── Card/
│   │   │       ├── Card.tsx
│   │   │       ├── Card.styles.ts
│   │   │       └── index.ts
│   │   ├── events/
│   │   │   ├── EventCard/
│   │   │   │   ├── EventCard.tsx
│   │   │   │   ├── EventCard.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── EventFilter/
│   │   │   │   ├── EventFilter.tsx
│   │   │   │   ├── EventFilter.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── EventList/
│   │   │   │   ├── EventList.tsx
│   │   │   │   ├── EventList.styles.ts
│   │   │   │   └── index.ts
│   │   │   └── SearchBar/
│   │   │       ├── SearchBar.tsx
│   │   │       ├── SearchBar.styles.ts
│   │   │       └── index.ts
│   ├── hooks/
│   │   ├── useEvents.ts
│   │   └── useFilters.ts
│   ├── interfaces/
│   │   ├── Event.interface.ts
│   │   └── Filter.interface.ts
│   ├── pages/
│   │   └── Home/
│   │       ├── Home.tsx
│   │       ├── Home.styles.ts
│   │       └── index.ts
│   ├── services/
│   │   └── api/
│   │       ├── events.service.ts
│   │       └── index.ts
│   ├── store/
│   │   └── events/
│   │       ├── actions.ts
│   │       ├── mutations.ts
│   │       └── index.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── types/
│   │   └── events.types.ts
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts