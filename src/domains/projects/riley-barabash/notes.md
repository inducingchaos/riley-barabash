#

#

# Feature ideas.

## Developer experience.

-   Generic upsert function: offer an option to pass property keys to omit from the insert ("using"). Add a "before:query" and "before:update" arg for passing a transformation function. Add an "on:update:error" arg for passing a function that is called if the update fails.
-   Verbose logging with domain control - at every control point, add a logger that prints useful information to the console or an admin page. Domains can be filtered by a name/ID or tags.
-   Maintenance mode - where the app defaults to a "maintenance" page on change of a feature flag or a request that schedules maintenance.
-   Codebase notes: see "\_experimental/notes.ts". Add option for requiring notes in certain files (this could manifest in the form of specifying the file path in the note source, and then acknowledging that path in said file).
