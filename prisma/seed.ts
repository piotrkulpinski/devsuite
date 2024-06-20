import { slugify } from "@curiousleaf/utils"
import { prisma } from "~/services.server/prisma"

const categories = [
  {
    name: "Analytics",
    description: "Track web/app visitors and events.",
  },
  {
    name: "API Development",
    description: "Creating, managing, and testing APIs.",
  },
  {
    name: "APIs",
    description: "Protocols and tools that let apps communicate and interact.",
  },
  {
    name: "Authentication",
    description: "Products that handle authentication and user identity for you.",
  },
  {
    name: "Backend-as-a-Service",
    description:
      "Abstract away all the backend hassles with an out-of-the-box suite of backend solutions.",
  },
  {
    name: "Background Jobs",
    description: "Schedule and manage background tasks.",
  },
  {
    name: "CI/CD",
    description: "Continuous Integration/Delivery.",
  },
  {
    name: "Cloud Cost Management",
    description: "Monitor and control cloud costs.",
  },
  {
    name: "Code Boilerplates",
    description: "Pre-written code segments for starting projects.",
  },
  {
    name: "Copilots & Autopilots",
    description: "AI assistants for coding help and automation.",
  },
  {
    name: "Databases & Spreadsheets",
    description: "Storing data and processing it.",
  },
  {
    name: "Debug & Get Help",
    description: "Bug tracking, fixing, and getting help.",
  },
  {
    name: "Deployment & Hosting",
    description: "Products that help you deploy your app/website.",
  },
  {
    name: "Developer Portal",
    description: "Central resource hubs for developers.",
  },
  {
    name: "Documentation",
    description: "Documentation solutions.",
  },
  {
    name: "Environment & Secret Management",
    description: "Manage environment variables and secrets for multiple apps or projects.",
  },
  {
    name: "Feature Flags",
    description: "Control production features with conditional flags in your code.",
  },
  {
    name: "IDEs & Environment",
    description: "Products that extend your IDE and help with development.",
  },
  {
    name: "Internal Tooling",
    description: "Creating and managing in-house software.",
  },
  {
    name: "Issue Tracking",
    description: "Systems for managing project issues.",
  },
  {
    name: "Localization",
    description: "Translating your product (also denoted i18n).",
  },
  {
    name: "Mail",
    description: "Sending and verifying emails as a service.",
  },
  {
    name: "Media",
    description: "Media APIs (optimization, CDN).",
  },
  {
    name: "Messaging",
    description: "Messaging APIs - SMS, notifications, chats, and VoIP.",
  },
  {
    name: "Monitoring",
    description: "Observing system or application performance.",
  },
  {
    name: "Mono Fonts",
    description: "Fixed-width fonts for readable coding.",
  },
  {
    name: "Observability",
    description: "Insights into internal system state.",
  },
  {
    name: "Onboarding",
    description: "Tools to introduce new team members to a project.",
  },
  {
    name: "Payment & Pricing",
    description: "Handling payments, credit card processing, and invoices.",
  },
  {
    name: "Realtime API",
    description: "APIs for live data transmission.",
  },
  {
    name: "Repository Management",
    description: "Repository and pull request management.",
  },
  {
    name: "Search API",
    description: "Index and search your content as a service API.",
  },
  {
    name: "Workflow Automation",
    description: "Automating tasks within a workflow.",
  },
]

const tools = [
  {
    name: "Knock",
    websiteUrl: "https://knock.app",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline notifications with a powerful tool for developers. Easily manage user preferences, delivery channels, and notification history in one place.",
    content: "",
  },
  {
    name: "Arcade",
    websiteUrl: "https://arcade.software",
    category: "Onboarding",
    isOpenSource: false,
    tagline: "Create effortlessly beautiful demos in minutes.",
    description:
      "Boost productivity with powerful debugging, testing, and deployment features. Streamline your development process and accelerate project timelines effortlessly.",
    content: "",
  },
  {
    name: "Retool",
    websiteUrl: "https://retool.com",
    category: "Internal Tooling",
    isOpenSource: false,
    tagline: "The fastest way to develop effective software.",
    description:
      "Easily build and manage custom internal tools with this powerful developer platform. Speed up development, integrate data sources, and streamline your workflow efficiently.",
    content: "",
  },
  {
    name: "Iosevka",
    websiteUrl: "https://typeof.net/Iosevka",
    category: "Mono Fonts",
    isOpenSource: false,
    tagline: "Versatile typeface for code, from code.",
    description:
      "A versatile and highly customizable typeface designed for coding, offering clear, readable characters and multiple styles to enhance your development experience.",
    content:
      "Iosevka is an open-source, sans-serif + slab-serif, monospace + quasi‑proportional typeface family, designed for writing code, using in terminals, and preparing technical documents.",
  },
  {
    name: "Zenaton",
    websiteUrl: "https://zenaton.com",
    category: "Workflow Automation",
    isOpenSource: false,
    tagline: "Workflow Builder for Developers",
    description:
      "Automate complex workflows effortlessly with this powerful developer tool. Enhance productivity, streamline tasks, and integrate seamlessly with your existing tech stack.",
    content: "",
  },
  {
    name: "Mintlify",
    websiteUrl: "https://mintlify.com",
    category: "Documentation",
    isOpenSource: true,
    tagline: "Build the documentation you've always wanted",
    description:
      "Boost your code documentation with an AI-powered tool that generates, updates, and maintains clear, concise, and accurate descriptions automatically.",
    content: "",
  },
  {
    name: "Inngest",
    websiteUrl: "https://inngest.com",
    category: "Background Jobs",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline event-driven development with powerful tools that automate workflows, enhance efficiency, and seamlessly integrate with your existing tech stack.",
    content: "",
  },
  {
    name: "Relay",
    websiteUrl: "https://relay.app",
    category: "Workflow Automation",
    isOpenSource: false,
    tagline: "The next generation of workflow automation",
    description:
      "Streamline modern app development with this GraphQL client, optimizing data fetching and state management for seamless, fast, and scalable applications.",
    content: "",
  },
  {
    name: "Frigade",
    websiteUrl: "https://frigade.com",
    category: "Onboarding",
    isOpenSource: false,
    tagline: "Product growth and onboarding for modern software companies",
    description:
      "Effortlessly integrate in-app onboarding, user guides, and feature highlights with this tool, designed to boost user engagement and retention for your application.",
    content: "",
  },
  {
    name: "Commit Mono",
    websiteUrl: "https://commitmono.com",
    category: "Mono Fonts",
    isOpenSource: false,
    tagline: "Neutral programming typeface.",
    description:
      "Boost your coding efficiency with this developer tool featuring code analysis, syntax highlighting, and version control integration. Enhance productivity and streamline workflow.",
    content:
      "Commit Mono is an anonymous and neutral coding font focused on creating a better reading experience.",
  },
  {
    name: "Graphite",
    websiteUrl: "https://graphite.dev",
    category: "Repository Management",
    isOpenSource: false,
    tagline: "Never wait for a code review again.",
    description:
      "Streamline your code review process with a developer tool that enhances collaboration, boosts productivity, and ensures seamless integration with your workflow.",
    content: "",
  },
  {
    name: "Trigger",
    websiteUrl: "https://trigger.dev",
    category: "Background Jobs",
    isOpenSource: true,
    tagline: "The open source Background Jobs framework for TypeScript",
    description:
      "Accelerate your development process with streamlined automation, real-time code monitoring, and powerful debugging tools designed to boost productivity and efficiency.",
    content: "",
  },
  {
    name: "Resend",
    websiteUrl: "https://resend.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "Deliver transactional and marketing emails at scale.",
    description:
      "Easily deliver, test, and debug webhooks with this developer tool. Streamline your workflow and ensure reliable, error-free integrations with automated monitoring.",
    content: "",
  },
  {
    name: "Sentry",
    websiteUrl: "https://sentry.io",
    category: "Monitoring",
    isOpenSource: true,
    tagline: "",
    description:
      "Monitor and fix software issues in real-time with error tracking, performance monitoring, and automated alerts. Improve user experience by identifying and resolving bugs quickly.",
    content: "",
  },
  {
    name: "Highlight",
    websiteUrl: "https://highlight.io",
    category: "Monitoring",
    isOpenSource: true,
    tagline: "",
    description:
      "Streamline debugging with a powerful developer tool for monitoring, logging, and analyzing web apps in real-time. Boost productivity and ensure seamless user experiences.",
    content: "",
  },
  {
    name: "PostHog",
    websiteUrl: "https://posthog.com",
    category: "Analytics",
    isOpenSource: true,
    tagline: "",
    description:
      "Open-source analytics tool for product teams. Track user behavior, run A/B tests, and gain actionable insights. Self-host for full data control and privacy.",
    content: "",
  },
  {
    name: "ClickHouse",
    websiteUrl: "https://clickhouse.com",
    category: "Analytics",
    isOpenSource: true,
    tagline: "",
    description:
      "Lightning-fast, open-source columnar database for real-time analytics, optimized for high performance on large datasets. Ideal for modern, data-intensive applications.",
    content: "",
  },
  {
    name: "Meilisearch",
    websiteUrl: "https://meilisearch.com",
    category: "Search API",
    isOpenSource: true,
    tagline: "",
    description:
      "Lightning-fast, open-source search engine with easy integration, real-time indexing, and powerful features for developers. Boost your app's search experience effortlessly.",
    content: "",
  },
  {
    name: "Algolia",
    websiteUrl: "https://algolia.com",
    category: "Search API",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your site's search functionality with a powerful API that ensures fast, relevant results and enhances user experience. Perfect for developers and businesses.",
    content: "",
  },
  {
    name: "Typesense",
    websiteUrl: "https://typesense.org",
    category: "Search API",
    isOpenSource: true,
    tagline: "",
    description:
      "Blazing fast, open-source search engine offering real-time, typo-tolerant search with automatic indexing and geo-search capabilities for modern applications.",
    content: "",
  },
  {
    name: "Elastic",
    websiteUrl: "https://elastic.co",
    category: "Search API,Observability",
    isOpenSource: false,
    tagline: "",
    description:
      "Unlock powerful search, logging, and analytics with this tool. Easily visualize data in real-time and make informed decisions with scalable, high-performance solutions.",
    content: "",
  },
  {
    name: "Novu",
    websiteUrl: "https://novu.co",
    category: "Messaging",
    isOpenSource: true,
    tagline: "",
    description:
      "Centralize notifications with an open-source tool. Streamline your messaging across multiple channels seamlessly and enhance your application's communication.",
    content: "",
  },
  {
    name: "PocketBase",
    websiteUrl: "https://pocketbase.io",
    category: "Backend-as-a-Service",
    isOpenSource: true,
    tagline: "",
    description:
      "Streamline your app development with an open-source backend featuring a database, authentication, file storage, and real-time capabilities, all in one easy-to-deploy package.",
    content: "",
  },
  {
    name: "Vercel",
    websiteUrl: "https://vercel.com",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Accelerate web development with seamless deployment, automatic scaling, and painless DevOps. Experience faster builds and improved collaboration.",
    content: "",
  },
  {
    name: "Netlify",
    websiteUrl: "https://netlify.com",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Accelerate your web projects with seamless deployment, continuous integration, and global hosting. Boost performance and simplify your workflow today.",
    content: "",
  },
  {
    name: "Render",
    websiteUrl: "https://render.com",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Deploy and scale your applications effortlessly with this powerful developer tool. Enjoy seamless integration, robust performance, and simplified cloud hosting.",
    content: "",
  },
  {
    name: "Fly.io",
    websiteUrl: "https://fly.io",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Deploy globally with ease using this tool for developers. Run full-stack apps close to users, ensuring low latency and high performance. Scale effortlessly!",
    content: "",
  },
  {
    name: "Railway",
    websiteUrl: "https://railway.app",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly deploy, manage, and scale your applications with a powerful cloud infrastructure service designed for developers. Boost productivity and streamline workflow.",
    content: "",
  },
  {
    name: "Planar",
    websiteUrl: "https://useplanar.com",
    category: "Repository Management",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost productivity with a powerful developer tool for interactive data visualization, easy debugging, and seamless workflow integration. Ideal for efficient software development.",
    content: "",
  },
  {
    name: "Stenography",
    websiteUrl: "https://stenography.dev",
    category: "Documentation",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost productivity with an AI-powered developer tool that autocompletes code, provides instant documentation, and simplifies code reviews to streamline your workflow.",
    content: "",
  },
  {
    name: "Redocly",
    websiteUrl: "https://redocly.com",
    category: "Documentation",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly design, document, and deploy interactive API documentation with user-friendly features, powerful integrations, and seamless collaboration. Create APIs that wow.",
    content: "",
  },
  {
    name: "Swimm",
    websiteUrl: "https://swimm.io",
    category: "Documentation",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your team's productivity with collaborative documentation, code tutorials, and seamless onboarding for developers, helping you deliver quality software faster.",
    content: "",
  },
  {
    name: "Readme",
    websiteUrl: "https://readme.com",
    category: "Documentation",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly create and manage dynamic API documentation with an intuitive interface, real-time collaboration, and powerful integrations for developers and teams.",
    content: "",
  },
  {
    name: "Grit",
    websiteUrl: "https://grit.io",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost productivity with this powerful developer tool. Streamline coding, manage projects, and collaborate seamlessly. Optimized for efficiency and innovation.",
    content: "",
  },
  {
    name: "Second",
    websiteUrl: "https://second.dev",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Revolutionize your development process with automated code reviews, real-time collaboration, and seamless project management—all in one intuitive platform.",
    content: "",
  },
  {
    name: "Tabnine",
    websiteUrl: "https://tabnine.com",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Unleash your coding potential with an AI-powered code completion tool that accelerates development, reduces errors, and boosts productivity in any IDE.",
    content: "",
  },
  {
    name: "GitHub Copilot",
    websiteUrl: "https://github.com/features/copilot",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "AI-powered code assistant that helps developers write code faster with real-time suggestions and autocompletion, enhancing productivity and efficiency.",
    content: "",
  },
  {
    name: "Codeium",
    websiteUrl: "https://codeium.com",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost productivity with an AI-powered code completion tool. Enhance coding speed, accuracy, and efficiency with intelligent suggestions and real-time error detection.",
    content: "",
  },
  {
    name: "Codium",
    websiteUrl: "https://codium.ai",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Efficient, customizable code editor for developers. Enjoy a streamlined, open-source experience with numerous extensions and robust performance. Boost productivity today!",
    content: "",
  },
  {
    name: "Sourcegraph",
    websiteUrl: "https://sourcegraph.com",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost productivity with a powerful code search and navigation tool. Quickly find, understand, and fix code across repositories to streamline development workflows.",
    content: "",
  },
  {
    name: "Supermaven",
    websiteUrl: "https://supermaven.com",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your Java project management with this robust developer tool, featuring dependency management, automated builds, and seamless integrations.",
    content: "",
  },
  {
    name: "Mutable",
    websiteUrl: "https://mutable.ai",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly update, test, and manage application code in real-time with our powerful developer tool designed to boost productivity and streamline the development process.",
    content: "",
  },
  {
    name: "Release",
    websiteUrl: "https://release.com",
    category: "IDEs & Environment",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your deployment process with this developer tool, ensuring efficient, reliable, and automated releases. Enhance productivity and minimize downtime today!",
    content: "",
  },
  {
    name: "Coder",
    websiteUrl: "https://coder.com",
    category: "IDEs & Environment",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development workflow with this powerful tool, offering seamless code collaboration, efficient project management, and integrated debugging solutions.",
    content: "",
  },
  {
    name: "Gitpod",
    websiteUrl: "https://gitpod.io",
    category: "IDEs & Environment",
    isOpenSource: false,
    tagline: "",
    description:
      "Seamlessly code from anywhere with cloud-based development environments. Instant setup, powerful collaboration, and integrated tools for efficient workflows.",
    content: "",
  },
  {
    name: "Replit",
    websiteUrl: "https://replit.com",
    category: "IDEs & Environment",
    isOpenSource: false,
    tagline: "",
    description:
      "Code, collaborate, and deploy effortlessly with this all-in-one online IDE. Supports multiple languages, real-time collaboration, and instant deployment.",
    content: "",
  },
  {
    name: "Cursor",
    websiteUrl: "https://cursor.com",
    category: "IDEs & Environment",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your coding efficiency with this developer tool. Enjoy real-time collaboration, intelligent code suggestions, and seamless project management all in one place.",
    content: "",
  },
  {
    name: "Zed",
    websiteUrl: "https://zed.dev",
    category: "IDEs & Environment",
    isOpenSource: true,
    tagline: "",
    description:
      "Revolutionize your code editing with a high-performance, collaborative developer tool that boosts productivity with real-time collaboration, seamless integration, and speed.",
    content: "",
  },
  {
    name: "Linear",
    websiteUrl: "https://linear.app",
    category: "Issue Tracking",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline project management with an intuitive platform for issue tracking, team collaboration, and seamless workflows. Boost productivity and keep projects on track effortlessly.",
    content: "",
  },
  {
    name: "Huly",
    websiteUrl: "https://huly.io",
    category: "Issue Tracking",
    isOpenSource: true,
    tagline: "",
    description:
      "Streamline your development workflow with seamless integration, code collaboration, and powerful debugging tools all in one place. Optimize productivity effortlessly.",
    content: "",
  },
  {
    name: "LaunchDarkly",
    websiteUrl: "https://launchdarkly.com",
    category: "Feature Flags",
    isOpenSource: false,
    tagline: "",
    description:
      "Empower your development teams with feature flag management, enabling real-time feature toggling, rapid deployments, and safer releases. Boost productivity and innovation.",
    content: "",
  },
  {
    name: "Statsig",
    websiteUrl: "https://statsig.com",
    category: "Feature Flags",
    isOpenSource: false,
    tagline: "",
    description:
      "Unlock rapid experimentation and feature management for your applications with powerful A/B testing, feature flags, and analytics, driving data-informed decisions seamlessly.",
    content: "",
  },
  {
    name: "Harness",
    websiteUrl: "https://harness.io",
    category: "CI/CD",
    isOpenSource: false,
    tagline: "",
    description:
      "Simplify software delivery with a powerful CI/CD platform that automates deployments, optimizes costs, and provides robust performance monitoring for your applications.",
    content: "",
  },
  {
    name: "Cortex",
    websiteUrl: "https://cortex.io",
    category: "Developer Portal",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development process with automated monitoring, actionable insights, and seamless integration. Boost efficiency and code quality effortlessly.",
    content: "",
  },
  {
    name: "Backstage",
    websiteUrl: "https://backstage.io",
    category: "Developer Portal",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your software development lifecycle with a powerful, customizable platform, enabling seamless collaboration, automation, and efficiency. Perfect for modern dev teams.",
    content: "",
  },
  {
    name: "Replay",
    websiteUrl: "https://replay.io",
    category: "Debug & Get Help",
    isOpenSource: false,
    tagline: "",
    description:
      "Debug, collaborate, and share your code effortlessly with this tool designed for developers. Simplify troubleshooting and streamline development with innovative features.",
    content: "",
  },
  {
    name: "Adrenaline",
    websiteUrl: "https://useadrenaline.com",
    category: "Debug & Get Help",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your app performance and streamline debugging with this powerful developer tool. Optimize code, monitor performance, and enhance productivity effortlessly.",
    content: "",
  },
  {
    name: "ChatGPT",
    websiteUrl: "https://chat.openai.com",
    category: "Debug & Get Help",
    isOpenSource: false,
    tagline: "",
    description:
      "AI-powered assistant for code generation, debugging, and documentation. Boost productivity and streamline workflows with instant, accurate solutions to development challenges.",
    content: "",
  },
  {
    name: "AskCodi",
    websiteUrl: "https://askcodi.com",
    category: "Debug & Get Help",
    isOpenSource: false,
    tagline: "",
    description:
      "Enhance your development workflow with instant code suggestions, error detection, and seamless integrations. Boost productivity and streamline coding tasks effortlessly.",
    content: "",
  },
  {
    name: "AWS Q Developer",
    websiteUrl: "https://aws.amazon.com/q/developer",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Enhance quantum computing projects with this tool offering coding, testing, and deployment capabilities, streamlined for developers to innovate efficiently.",
    content: "",
  },
  {
    name: "Liveblocks",
    websiteUrl: "https://liveblocks.io",
    category: "Realtime API",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost collaboration in real-time with ease. This powerful tool seamlessly integrates live editing, presence, and multiplayer features into your apps. Try it today!",
    content: "",
  },
  {
    name: "LiveKit",
    websiteUrl: "https://livekit.io",
    category: "Realtime API",
    isOpenSource: false,
    tagline: "The Realtime Cloud. Build and scale voice and video applications.",
    description:
      "Build and scale voice and video applications for conversational AI, robotics, and livestreaming.",
    content: "",
  },
  {
    name: "Liveblocks",
    websiteUrl: "https://liveblocks.io",
    category: "Realtime API",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost collaboration in real-time with ease. This powerful tool seamlessly integrates live editing, presence, and multiplayer features into your apps. Try it today!",
    content: "",
  },
  {
    name: "Flox",
    websiteUrl: "https://flox.dev",
    category: "IDEs & Environment",
    isOpenSource: false,
    tagline: "",
    description:
      "Accelerate software development with package management, customizable dev environments, and seamless collaboration tools, enhancing productivity and code quality.",
    content: "",
  },
  {
    name: "Storylane",
    websiteUrl: "https://storylane.io",
    category: "Onboarding",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly create interactive demos and shareable product walkthroughs to boost user engagement and conversion rates with this intuitive developer tool.",
    content: "",
  },
  {
    name: "AuthKit",
    websiteUrl: "https://authkit.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline user authentication with this developer tool, featuring secure, scalable, and customizable login solutions for apps and websites. Boost efficiency and security.",
    content: "",
  },
  {
    name: "Clerk",
    websiteUrl: "https://clerk.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline user management in your apps with seamless authentication, user profiles, and access control. Boost security and enhance user experience effortlessly.",
    content: "",
  },
  {
    name: "Kinde",
    websiteUrl: "https://kinde.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline user authentication, authorization, and management with an all-in-one tool. Enhance security, boost developers' productivity, and scale confidently.",
    content: "",
  },
  {
    name: "Auth0",
    websiteUrl: "https://auth0.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Securely manage user authentication and authorization for your apps with a scalable, customizable, and easy-to-integrate identity management solution.",
    content: "",
  },
  {
    name: "AWS Cognito",
    websiteUrl: "https://aws.amazon.com/cognito",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Securely manage user sign-up, sign-in, and access control with this robust authentication service, providing scalability and seamless integration for your applications.",
    content: "",
  },
  {
    name: "FrontEgg",
    websiteUrl: "https://frontegg.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your web development with a powerful platform offering authentication, user management, and custom identity solutions for fast and secure app creation.",
    content: "",
  },
  {
    name: "FusionAuth",
    websiteUrl: "https://fusionauth.io",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Secure user authentication and authorization with a scalable, flexible solution, perfect for developers. Simplify user management and boost security effortlessly.",
    content: "",
  },
  {
    name: "Kitemaker",
    websiteUrl: "https://kitemaker.co",
    category: "Issue Tracking",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline product development with this collaborative tool for agile teams, offering task tracking, real-time updates, and seamless integrations for peak efficiency.",
    content: "",
  },
  {
    name: "Antimetal",
    websiteUrl: "https://antimetal.com",
    category: "Cloud Cost Management",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your database management with an automated optimization tool, reducing costs and enhancing performance. Ideal for DevOps and developers seeking efficiency.",
    content: "",
  },
  {
    name: "Plane",
    websiteUrl: "https://plane.so",
    category: "Issue Tracking",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly manage projects, streamline tasks, and boost collaboration in your development workflow with this powerful, intuitive tool designed for modern teams.",
    content: "",
  },
  {
    name: "Uploadcare",
    websiteUrl: "https://uploadcare.com",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Transform file handling with this robust API. Effortlessly upload, manage, and deliver files with seamless integration and top-tier security.",
    content: "",
  },
  {
    name: "Checkly",
    websiteUrl: "https://checklyhq.com",
    category: "CI/CD",
    isOpenSource: false,
    tagline: "",
    description:
      "Monitor APIs and browser click flows effortlessly. Ensure your web app's performance and reliability with real-time alerts and detailed reporting.",
    content: "",
  },
  {
    name: "Bucket",
    websiteUrl: "https://bucket.co",
    category: "Feature Flags",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development workflow with an intuitive tool for code collaboration, task management, and version control integration. Perfect for teams and individual developers.",
    content: "",
  },
  {
    name: "Folio",
    websiteUrl: "https://folio.la",
    category: "Onboarding",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your productivity with this developer tool, streamlining workflows, automating tasks, and simplifying project management for seamless development.",
    content: "",
  },
  {
    name: "Volta",
    websiteUrl: "https://volta.net",
    category: "Repository Management",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly manage and switch between Node.js versions and package managers with this powerful tool designed for modern JavaScript developers. Streamline your workflow today.",
    content: "",
  },
  {
    name: "KloudMate",
    websiteUrl: "https://kloudmate.com",
    category: "Observability",
    isOpenSource: false,
    tagline: "",
    description:
      "Simplify cloud monitoring and observability with real-time insights, automated anomaly detection, and seamless alerts to optimize your applications and infrastructure.",
    content: "",
  },
  {
    name: "Axiom",
    websiteUrl: "https://axiom.co",
    category: "Observability",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development workflow with this tool, offering automation, data scraping, and task management to boost productivity and efficiency in your projects.",
    content: "",
  },
  {
    name: "Urlbox",
    websiteUrl: "https://urlbox.com",
    category: "APIs",
    isOpenSource: false,
    tagline: "",
    description:
      "Capture high-quality, responsive screenshots of websites effortlessly with this tool. Perfect for developers and marketers needing reliable and fast visual content.",
    content: "",
  },
  {
    name: "ScreenshotOne",
    websiteUrl: "https://screenshotone.com",
    category: "APIs",
    isOpenSource: false,
    tagline: "",
    description:
      "Capture high-quality website screenshots effortlessly. Enhance your development workflow with automatic, customizable, and reliable screenshot generation.",
    content: "",
  },
  {
    name: "MailerSend",
    websiteUrl: "https://mailersend.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Simplify transactional email and SMS sending with reliable API solutions. Enhance your communication with robust features and top-notch deliverability.",
    content: "",
  },
  {
    name: "Aide",
    websiteUrl: "https://aide.dev",
    category: "Copilots & Autopilots",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development workflow with this powerful tool, featuring code generation, debugging, and real-time collaboration for enhanced productivity and efficiency.",
    content: "",
  },
  {
    name: "Postmark",
    websiteUrl: "https://postmarkapp.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Reliable email delivery service for developers, ensuring fast, secure, and efficient transactional emails with real-time analytics and robust API integration tools.",
    content: "",
  },
  {
    name: "Pusher",
    websiteUrl: "https://pusher.com",
    category: "Realtime API",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly build real-time features like notifications, chat, and live updates into your apps with this powerful developer tool, boosting user engagement and interaction.",
    content: "",
  },
  {
    name: "GrowthBook",
    websiteUrl: "https://growthbook.io",
    category: "Feature Flags",
    isOpenSource: true,
    tagline: "",
    description:
      "All-in-one feature flagging and A/B testing platform for developers. Easily manage experiments, rollout features, and improve product decisions seamlessly.",
    content: "",
  },
  {
    name: "Unleash",
    websiteUrl: "https://getunleash.io",
    category: "Feature Flags",
    isOpenSource: true,
    tagline: "",
    description:
      "Empower your development team with feature management, A/B testing, and seamless deployment control. Streamline releases and optimize performance effectively.",
    content: "",
  },
  {
    name: "Corbado",
    websiteUrl: "https://corbado.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline authentication workflows and enhance security with powerful, easy-to-integrate solutions designed to save developers time and improve user satisfaction.",
    content: "",
  },
  {
    name: "SuperTokens",
    websiteUrl: "https://supertokens.com",
    category: "Authentication",
    isOpenSource: true,
    tagline: "",
    description:
      "Effortlessly add secure, scalable, and customizable authentication to your app. Simplify user management with minimal code and robust security features.",
    content: "",
  },
  {
    name: "Stytch",
    websiteUrl: "https://stytch.com",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly integrate secure authentication with passwordless solutions, including biometrics, SMS, email magic links, and OAuth with this powerful developer tool.",
    content: "",
  },
  {
    name: "Ory",
    websiteUrl: "https://ory.sh",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline authentication, authorization, and user management with advanced, secure, and scalable solutions for seamless app development and deployment.",
    content: "",
  },
  {
    name: "Hanko",
    websiteUrl: "https://hanko.io",
    category: "Authentication",
    isOpenSource: true,
    tagline: "",
    description:
      "Effortlessly add secure, passwordless authentication to your applications with this powerful developer tool designed for ease of use and seamless integration.",
    content: "",
  },
  {
    name: "Magic.link",
    websiteUrl: "https://magic.link",
    category: "Authentication",
    isOpenSource: false,
    tagline: "",
    description:
      "Implement secure, passwordless authentication in your app effortlessly with decentralized identity and seamless user experience. Perfect for developers seeking robust solutions.",
    content: "",
  },
  {
    name: "Ably",
    websiteUrl: "https://ably.com",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly build scalable, realtime applications with reliable data streaming, low-latency messaging, and robust infrastructure. Transform how you sync and stream data.",
    content: "",
  },
  {
    name: "MagicBell",
    websiteUrl: "https://magicbell.com",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly integrate real-time notifications into your web and mobile apps, enhancing user engagement and delighting customers with seamless communication.",
    content: "",
  },
  {
    name: "Stream",
    websiteUrl: "https://getstream.io",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly build scalable chat and activity feed applications with our developer-friendly API, featuring real-time updates and customizable UI components.",
    content: "",
  },
  {
    name: "Twilio",
    websiteUrl: "https://twilio.com",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description:
      "Easily integrate communication features like SMS, voice, and video into your apps with this robust and scalable cloud communication platform, boosting user engagement effortlessly.",
    content: "",
  },
  {
    name: "Bytescale",
    websiteUrl: "https://bytescale.com",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Optimize your code efficiently with this developer tool. Experience faster, scalable solutions and enhance productivity seamlessly within your projects.",
    content: "",
  },
  {
    name: "Cloudinary",
    websiteUrl: "https://cloudinary.com",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Manage, optimize, and deliver high-quality images and videos effortlessly with this powerful cloud-based media management solution designed for developers and marketers.",
    content: "",
  },
  {
    name: "Dyte",
    websiteUrl: "https://dyte.io",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Real-time video and audio calling API for developers, enabling seamless integration of interactive communication features into your web and mobile applications.",
    content: "",
  },
  {
    name: "Flatfile",
    websiteUrl: "https://flatfile.com",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly import, validate, and transform data with this powerful tool designed for developers. Streamline data onboarding and improve data quality with ease.",
    content: "",
  },
  {
    name: "Pintura",
    websiteUrl: "https://pqina.nl/pintura",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Transform your app's image editing capabilities with this powerful developer tool, featuring a versatile set of image manipulation functions and an intuitive UI.",
    content: "",
  },
  {
    name: "Mux",
    websiteUrl: "https://mux.com",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your video infrastructure with rapid, high-quality video delivery, analytics, and live streaming solutions that simplify video management for developers.",
    content: "",
  },
  {
    name: "Imgix",
    websiteUrl: "https://imgix.com",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Optimize, transform, and deliver images effortlessly with real-time seamless integration. Boost performance and visual appeal with this powerful image processing tool.",
    content: "",
  },
  {
    name: "ImageKit",
    websiteUrl: "https://imagekit.io",
    category: "Media",
    isOpenSource: false,
    tagline: "",
    description:
      "Optimize images with a powerful developer tool for faster load times, superior quality, and seamless delivery across all devices. Enhance performance and user experience.",
    content: "",
  },
  {
    name: "Loops",
    websiteUrl: "https://loops.so",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your workflow with a versatile developer tool, enabling efficient code management, real-time collaboration, and automated testing for seamless project development.",
    content: "",
  },
  {
    name: "Mailgun",
    websiteUrl: "https://mailgun.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Reliable email delivery API for developers. Easily send, receive, and track emails with powerful analytics and scalability. Enhance your app's communication today!",
    content: "",
  },
  {
    name: "SendGrid",
    websiteUrl: "https://sendgrid.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly manage email marketing, transactional emails, and analytics with this powerful tool designed for developers. Enhance deliverability and engagement seamlessly.",
    content: "",
  },
  {
    name: "Lob",
    websiteUrl: "https://lob.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development process with automated address verification and real-time mail delivery. Enhance efficiency and accuracy in your projects effortlessly.",
    content: "",
  },
  {
    name: "Hunter",
    websiteUrl: "https://hunter.io",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Discover email addresses instantly and boost your outreach efforts with a powerful and intuitive tool designed to find professional contacts effortlessly.",
    content: "",
  },
  {
    name: "Anymail Finder",
    websiteUrl: "https://anymailfinder.com",
    category: "Mail",
    isOpenSource: false,
    tagline: "",
    description:
      "Find email addresses effortlessly with this powerful tool. Ideal for developers, it ensures accurate and fast email discovery for your business needs.",
    content: "",
  },
  {
    name: "Weglot",
    websiteUrl: "https://weglot.com",
    category: "Localization",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly translate and manage your website's multilingual content, enhancing global reach and SEO, with an intuitive integration process.",
    content: "",
  },
  {
    name: "Tolgee",
    websiteUrl: "https://tolgee.io",
    category: "Localization",
    isOpenSource: true,
    tagline: "",
    description:
      "Streamline localization in your app with this powerful tool. Simplify translations, improve workflow, and support seamless internationalization efforts for developers.",
    content: "",
  },
  {
    name: "Doppler",
    websiteUrl: "https://doppler.com",
    category: "Environment & Secret Management",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your workflow with a powerful secrets management tool designed to securely handle environment variables, boosting development efficiency and team productivity.",
    content: "",
  },
  {
    name: "Vault",
    websiteUrl: "https://vaultproject.io",
    category: "Environment & Secret Management",
    isOpenSource: false,
    tagline: "",
    description:
      "Secure, store, and manage access to secrets and sensitive data with this tool. Enhance your security framework with robust encryption and access controls.",
    content: "",
  },
  {
    name: "Ubiq",
    websiteUrl: "https://ubiqsecurity.com",
    category: "Environment & Secret Management",
    isOpenSource: false,
    tagline: "",
    description:
      "Developer tool for building real-time applications with ease. Combine real-time data integration, robust performance, and seamless collaboration for optimal results.",
    content: "",
  },
  {
    name: "Unkey",
    websiteUrl: "https://unkey.com",
    category: "Environment & Secret Management,API Development",
    isOpenSource: true,
    tagline: "",
    description:
      "Boost developer productivity with efficient code generation and seamless API integration. Transform complex tasks into simple ones, saving time and reducing errors.",
    content: "",
  },
  {
    name: "DeveloperHub",
    websiteUrl: "https://developerhub.io",
    category: "Documentation",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your coding workflow with an all-in-one collaboration platform for developers. Manage projects, debug code, and deploy effortlessly. Boost productivity now!",
    content: "",
  },
  {
    name: "Bump",
    websiteUrl: "https://bump.sh",
    category: "Documentation",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline API development with automated updates, detailed documentation, and seamless integration. Elevate your workflow and enhance productivity effortlessly.",
    content: "",
  },
  {
    name: "Apidog",
    websiteUrl: "https://apidog.com",
    category: "Documentation,API Development",
    isOpenSource: false,
    tagline: "",
    description:
      "Optimize your API integration and testing with this developer tool, designed for efficient API management, automated testing, and seamless collaboration.",
    content: "",
  },
  {
    name: "Rely",
    websiteUrl: "https://rely.io",
    category: "Developer Portal",
    isOpenSource: false,
    tagline: "",
    description:
      "Optimize your development workflow with a powerful tool designed for code reliability, automated testing, and continuous integration. Enhance productivity and code quality seamlessly.",
    content: "",
  },
  {
    name: "Zeabur",
    websiteUrl: "https://zeabur.com",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly deploy, manage, and scale your web applications with powerful, user-friendly features designed for developers. Enhance productivity with minimal hassle.",
    content: "",
  },
  {
    name: "Platform.sh",
    websiteUrl: "https://platform.sh",
    category: "Deployment & Hosting",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly deploy, manage, and scale websites and apps with this powerful tool designed for developers. Boost productivity with automated workflows and seamless collaboration.",
    content: "",
  },
  {
    name: "Neon",
    websiteUrl: "https://neon.tech",
    category: "Databases & Spreadsheets",
    isOpenSource: true,
    tagline: "",
    description:
      "Accelerate your development with a powerful serverless Postgres solution that offers scalable, high-performance databases and cutting-edge developer features.",
    content: "",
  },
  {
    name: "PlanetScale",
    websiteUrl: "https://planetscale.com",
    category: "Databases & Spreadsheets",
    isOpenSource: false,
    tagline: "",
    description:
      "Revolutionize your database management with a powerful, serverless MySQL solution designed for scale, performance, and seamless integration with modern development workflows.",
    content: "",
  },
  {
    name: "Upstash",
    websiteUrl: "https://upstash.com",
    category: "Databases & Spreadsheets,Background Jobs",
    isOpenSource: false,
    tagline: "",
    description:
      "Serverless database for Redis and Kafka. Instantly scalable, cost-efficient, and easy to integrate, perfect for developers needing high-performance data management.",
    content: "",
  },
  {
    name: "Supabase",
    websiteUrl: "https://supabase.com",
    category: "Backend-as-a-Service",
    isOpenSource: true,
    tagline: "",
    description:
      "Get a seamless backend with open-source tools for databases, authentication, and real-time subscriptions. Perfect for building modern, scalable applications effortlessly.",
    content: "",
  },
  {
    name: "Appwrite",
    websiteUrl: "https://appwrite.io",
    category: "Backend-as-a-Service",
    isOpenSource: true,
    tagline: "",
    description:
      "Effortlessly build secure, scalable, and feature-rich apps with an open-source backend. Streamline development with authentication, databases, and cloud functions.",
    content: "",
  },
  {
    name: "Spacelift",
    websiteUrl: "https://spacelift.io",
    category: "CI/CD",
    isOpenSource: false,
    tagline: "",
    description:
      "Automate infrastructure management with a powerful, flexible tool. Streamline CI/CD pipelines, ensure compliance, and increase deployment efficiency effortlessly.",
    content: "",
  },
  {
    name: "Depot",
    websiteUrl: "https://depot.dev",
    category: "CI/CD",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline development with an AI-powered tool that accelerates builds, optimizes workflows, and ensures robust code quality for efficient software production.",
    content: "",
  },
  {
    name: "Tinybird",
    websiteUrl: "https://tinybird.co",
    category: "Analytics",
    isOpenSource: false,
    tagline: "",
    description:
      "Real-time data processing tool enabling developers to ingest, query, and visualize large datasets instantly. Boosts performance and integrates seamlessly into workflows.",
    content: "",
  },
  {
    name: "Pirsch",
    websiteUrl: "https://pirsch.io",
    category: "Analytics",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline analytics and enhance your web development with lightweight, privacy-focused, and easy-to-integrate tracking, boosting performance and user insights.",
    content: "",
  },
  {
    name: "Mixpanel",
    websiteUrl: "https://mixpanel.com",
    category: "Analytics",
    isOpenSource: false,
    tagline: "",
    description:
      "Optimize user engagement and track usage metrics effortlessly with this powerful analytics tool. Gain actionable insights and boost growth with in-depth data analysis.",
    content: "",
  },
  {
    name: "Plausible",
    websiteUrl: "https://plausible.io",
    category: "Analytics",
    isOpenSource: true,
    tagline: "",
    description:
      "Privacy-friendly web analytics tool offering simple, real-time insights to help you track and optimize your website's performance effortlessly.",
    content: "",
  },
  {
    name: "Segment",
    websiteUrl: "https://segment.com",
    category: "Analytics",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline customer data management and boost your analytics capabilities with a powerful tool that unifies data from multiple sources into a single platform.",
    content: "",
  },
  {
    name: "OpenPanel",
    websiteUrl: "https://openpanel.dev",
    category: "Analytics",
    isOpenSource: true,
    tagline: "",
    description:
      "Streamline your development process with a powerful, user-friendly tool designed to enhance productivity, simplify collaboration, and boost performance.",
    content: "",
  },
  {
    name: "DocuSign",
    websiteUrl: "https://developers.docusign.com",
    category: "APIs",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline document workflow with e-signatures, automatic reminders, and secure storage. Enhance productivity and ensure compliance with a seamless digital signing experience.",
    content: "",
  },
  {
    name: "Documenso",
    websiteUrl: "https://documenso.com",
    category: "APIs",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your documentation process with this developer tool, enhancing clarity and efficiency. Collaborate seamlessly, boost productivity, and simplify version control.",
    content: "",
  },
  {
    name: "Interval",
    websiteUrl: "https://interval.com",
    category: "Internal Tooling",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline task management and boost productivity with this powerful developer tool. Plan projects, track progress, and collaborate effortlessly in one platform.",
    content: "",
  },
  {
    name: "Refine",
    websiteUrl: "https://refine.dev",
    category: "Internal Tooling",
    isOpenSource: true,
    tagline: "",
    description:
      "Accelerate your web application development with this powerful tool, offering seamless data handling, intuitive UI, and robust performance for developers.",
    content: "",
  },
  {
    name: "Illa",
    websiteUrl: "https://illacloud.com",
    category: "Internal Tooling",
    isOpenSource: true,
    tagline: "",
    description:
      "Accelerate app development with a low-code platform offering customizable components, real-time collaboration, and seamless integration to streamline workflows.",
    content: "",
  },
  {
    name: "Appsmith",
    websiteUrl: "https://appsmith.com",
    category: "Internal Tooling",
    isOpenSource: true,
    tagline: "",
    description:
      "Build custom internal tools swiftly and effortlessly with this open-source platform. Drag-and-drop interface, powerful integrations, and real-time collaboration.",
    content: "",
  },
  {
    name: "Airbrake",
    websiteUrl: "https://airbrake.io",
    category: "Monitoring",
    isOpenSource: false,
    tagline: "",
    description:
      "Monitor, detect, and resolve errors in web applications seamlessly. Enhance your code quality and improve user experience with real-time error tracking and alerts.",
    content: "",
  },
  {
    name: "BetterStack",
    websiteUrl: "https://betterstack.com",
    category: "Monitoring",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your development with an all-in-one monitoring and incident response tool. Enhance uptime, performance, and team collaboration effortlessly.",
    content: "",
  },
  {
    name: "LogRocket",
    websiteUrl: "https://logrocket.com",
    category: "Monitoring",
    isOpenSource: false,
    tagline: "",
    description:
      "Monitor user behavior, track bugs, and optimize web experiences with a developer tool that provides deep insights, session replays, and performance monitoring.",
    content: "",
  },
  {
    name: "Pagerly",
    websiteUrl: "https://pagerly.io",
    category: "Monitoring",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost developer productivity with this tool! Streamline task management, enhance team collaboration, and accelerate your software development process effortlessly.",
    content: "",
  },
  {
    name: "Rollbar",
    websiteUrl: "https://rollbar.com",
    category: "Monitoring",
    isOpenSource: false,
    tagline: "",
    description:
      "Automatic error monitoring and debugging tool for developers. Identify, prioritize, and fix software issues in real-time to boost productivity and improve user experience.",
    content: "",
  },
  {
    name: "OpenReplay",
    websiteUrl: "https://openreplay.com",
    category: "Monitoring",
    isOpenSource: true,
    tagline: "",
    description:
      "Capture, replay, and debug web sessions effortlessly. Improve UX, resolve issues faster, and enhance team collaboration with powerful visual insights.",
    content: "",
  },
  {
    name: "OpenMeter",
    websiteUrl: "https://openmeter.io",
    category: "Monitoring,Cloud Cost Management",
    isOpenSource: true,
    tagline: "",
    description:
      "Effortlessly monitor, analyze, and optimize your software performance with this powerful developer tool, enhancing productivity and ensuring superior code quality in no time.",
    content: "",
  },
  {
    name: "NetData",
    websiteUrl: "https://netdata.cloud",
    category: "Monitoring,Observability",
    isOpenSource: true,
    tagline: "",
    description:
      "Real-time performance monitoring, health tracking, and systems debugging tool for servers, containers, and IoT devices. Simple, interactive, and resource-efficient.",
    content: "",
  },
  {
    name: "Braintree",
    websiteUrl: "https://braintreepayments.com",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Accept payments seamlessly with this tool. Integrate online payment processing, fraud protection, and global support into your app or website easily.",
    content: "",
  },
  {
    name: "Increase",
    websiteUrl: "https://increase.com",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your productivity with this developer tool. Streamline your coding workflow, automate tasks, and optimize performance for faster, efficient development.",
    content: "",
  },
  {
    name: "LemonSqueezy",
    websiteUrl: "https://lemonsqueezy.com",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline digital product sales with effortless checkout, subscription management, and automated marketing tools designed to optimize revenue for developers.",
    content: "",
  },
  {
    name: "Paddle",
    websiteUrl: "https://paddle.com",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline payment workflows, manage subscriptions, and simplify tax compliance effortlessly with an all-in-one developer tool for seamless SaaS growth.",
    content: "",
  },
  {
    name: "Plaid",
    websiteUrl: "https://plaid.com",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Easily connect and integrate financial accounts with a powerful, secure API designed to streamline transactions and data access for seamless financial services.",
    content: "",
  },
  {
    name: "Stigg",
    websiteUrl: "https://stigg.io",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your app's monetization with powerful pricing and UX tools. Streamline feature launches, billing, and revenue optimization in one seamless platform.",
    content: "",
  },
  {
    name: "Stripe",
    websiteUrl: "https://stripe.com",
    category: "Payment & Pricing",
    isOpenSource: false,
    tagline: "",
    description:
      "Effortlessly integrate payment processing into your apps. Enjoy secure transactions with robust APIs, global reach, and detailed analytics for informed decision-making.",
    content: "",
  },
  {
    name: "Swiftype",
    websiteUrl: "https://swiftype.com",
    category: "Search API",
    isOpenSource: false,
    tagline: "",
    description:
      "Enhance your site's search functionality with a powerful search tool that delivers fast, accurate results, boosting user engagement and satisfaction.",
    content: "",
  },
  {
    name: "Infiscal",
    websiteUrl: "https://infisical.com",
    category: "Environment & Secret Management",
    isOpenSource: true,
    tagline: "",
    description:
      "Securely manage and protect secrets, API keys, and credentials with this developer tool. Enhance your project's security and streamline secret management effortlessly.",
    content: "",
  },
  {
    name: "OneSignal",
    websiteUrl: "https://onesignal.com",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description:
      "Elevate your mobile and web app engagement with a leading push notification service, offering real-time messaging, user segmentation, and insightful analytics.",
    content: "",
  },
  {
    name: "AWS OpenSearch",
    websiteUrl: "https://aws.amazon.com/opensearch-service",
    category: "Search API",
    isOpenSource: false,
    tagline: "",
    description:
      "Scalable, secure, and managed service for searching, visualizing, and analyzing data in real-time. Ideal for analytics, monitoring, and application search.",
    content: "",
  },
  {
    name: "LaunchFast",
    websiteUrl: "https://launchfa.st",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Accelerate your development with instant deployments, continuous integration, and seamless collaboration. Boost your productivity and streamline your workflow today.",
    content: "",
  },
  {
    name: "MakerKit",
    websiteUrl: "https://makerkit.dev",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your development process with a tool that simplifies prototyping, accelerates coding, and enhances collaboration. Transform ideas into real projects effortlessly!",
    content: "",
  },
  {
    name: "ShipFast",
    websiteUrl: "https://shipfa.st",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Accelerate your app development with lightning-fast CI/CD pipelines, seamless integration, and automated deployments, ensuring top-notch performance and reliability.",
    content: "",
  },
  {
    name: "SaaS UI",
    websiteUrl: "https://saas-ui.dev",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your development with our intuitive SaaS UI tool. Enhance productivity, streamline workflows, and create stunning interfaces effortlessly. Try it today!",
    content: "",
  },
  {
    name: "Shipixen",
    websiteUrl: "https://shipixen.com",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Enhance your team's productivity with this developer tool. Simplify code reviews, streamline deployments, and boost collaboration effortlessly.",
    content: "",
  },
  {
    name: "Supastarter",
    websiteUrl: "https://supastarter.dev",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Boost your development process with a customizable boilerplate generator tool, streamlining project setup and enhancing productivity for developers.",
    content: "",
  },
  {
    name: "SaasRock",
    websiteUrl: "https://saasrock.com",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Build and scale your SaaS applications effortlessly with our powerful developer tool, offering robust features for rapid development, deployment, and management.",
    content: "",
  },
  {
    name: "LaraFast",
    websiteUrl: "https://larafast.com",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Accelerate your Laravel development with tools that optimize performance, streamline workflows, and boost productivity. Perfect for developers seeking efficiency.",
    content: "",
  },
  {
    name: "Shipped",
    websiteUrl: "https://shipped.club/",
    category: "Code Boilerplates",
    isOpenSource: false,
    tagline: "",
    description:
      "Streamline your app deployment with this powerful developer tool. Automate builds, tests, and deployments to accelerate your development cycle.",
    content: "",
  },
  {
    name: "Pipedream",
    websiteUrl: "https://pipedream.com",
    category: "Workflow Automation",
    isOpenSource: false,
    tagline: "Connect APIs, AI, databases and more.",
    description:
      "The fastest way to build powerful applications that connect all the services in your stack, with code-level control when you need it and no code when you don't.",
    content: "",
  },
  {
    name: "Engagespot",
    websiteUrl: "https://engagespot.co/",
    category: "Messaging",
    isOpenSource: false,
    tagline: "",
    description: "",
    content: "",
  },
  {
    name: "Dragonfly",
    websiteUrl: "https://www.dragonflydb.io/",
    category: "Databases & Spreadsheets",
    isOpenSource: true,
    tagline: "",
    description: "",
    content: "",
  },
]

async function seed() {
  await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: {
          name: category.name,
          slug: slugify(category.name),
          description: category.description,
        },
      })
    )
  )

  await Promise.all(
    tools.map((tool) =>
      prisma.tool.create({
        data: {
          name: tool.name,
          slug: slugify(tool.name),
          websiteUrl: tool.websiteUrl,
          tagline: tool.tagline,
          description: tool.description,
          content: tool.content,
          isOpenSource: tool.isOpenSource,
          publishedAt: new Date(),
          faviconUrl: `https://www.google.com/s2/favicons?sz=128&domain_url=${tool.websiteUrl}`,
          categories: {
            connect: tool.category.split(",").map((category) => ({
              name: category,
            })),
          },
        },
      })
    )
  )
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
