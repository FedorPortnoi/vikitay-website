Load a specific section of the Obsidian brain on demand.
Usage: /pull [topic]

Based on the topic requested, read and summarize the relevant note:
- "architecture" or "system" → read Architecture/System Overview.md
- "components" → read Architecture/Component Map.md
- "design" or "colors" → read Architecture/Design System.md
- "deploy" or "deployment" → read Architecture/Deployment.md
- "integrations" or "emailjs" → read Architecture/Integrations.md
- "todos" or "roadmap" → read Roadmap/Active TODOs.md
- "content" or "data" or "services" → read Architecture/Content & Data.md
- "env" or "environment" or "setup" → read Architecture/Environment Setup.md
- "glossary" → read Architecture/Glossary.md
- "changelog" or "history" → read History/Changelog.md
- "portfolio" → read Portfolio/VIKITAY as Portfolio Piece.md
- "checklist" or "release" → read Roadmap/Deployment Checklist.md

After reading, output:
"📖 [note name] loaded" followed by a concise summary of the most relevant parts.

If topic is not recognized, list all available topics.
