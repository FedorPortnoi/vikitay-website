You just completed a significant change to VIKITAY. Do the following immediately:

1. Identify what changed:
   - Which files were modified
   - What the change does
   - Whether it fixes a bug, adds a feature, or refactors

2. Update the relevant Obsidian note:
   - Bug fix → update 03 - VIKITAY/Dev Workflow/Debugging Guide.md if it reveals a new pattern
   - New feature → update the relevant Architecture/ note
   - New route → update Architecture/System Overview.md and Architecture/Component Map.md
   - New env var → update Architecture/Environment Setup.md
   - TODO completed → remove from Roadmap/Active TODOs.md and add to resolved section
   - Deployment change → update Architecture/Deployment.md
   - Design / color / font change → update Architecture/Design System.md
   - Integration change (EmailJS, Yandex, Cloudflare) → update Architecture/Integrations.md
   - Content / services / cases data change → update Architecture/Content & Data.md

3. Write a dev log entry:
   - Create or append to 03 - VIKITAY/Dev Logs/[TODAY'S DATE].md
   - Format:
     ## [TIME] — [ONE LINE SUMMARY]
     **Changed:** [files modified]
     **What:** [what it does]
     **Why:** [reason/context]
     **Next:** [what comes after this]

4. Update VIKITAY HQ.md:
   - If status changed (blocker resolved, feature shipped, section redesigned) update the status snapshot
   - If a new blocker appeared add it to active blockers list

5. Confirm what was updated:
   Output: "📝 Logged: [note names updated] + dev log entry written"

Be specific. Be brief. Update only what actually changed.
