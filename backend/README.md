```

backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── services/
│   │   ├── qdrantService.ts
│   │   ├── embeddingService.ts
│   │   ├── llmService.ts
│   │   └── documentProcessor.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── materialRoutes.ts
│   │   ├── preferenceRoutes.ts
│   │   ├── chatRoutes.ts
│   │   └── dashboardRoutes.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── utils/
│   │   └── fileStorage.ts // (Multer setup)
│   ├── server.ts       // Your main Express app file
│   └── config.ts       // Load env variables
├── .env
├── package.json
└── tsconfig.json




```