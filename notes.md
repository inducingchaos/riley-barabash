# TODO

-   Add asset paths to a config file.
-   Add API routes to a config file.

# Deployment Optimization To-Do List [AI GEN]

## Vercel Deployment Optimization

1. **Enable Build Caching**:

    - **How**: In your Vercel project settings, enable caching for `node_modules` and other build artifacts. Configure the cache key in your build settings.

2. **Skip Linting and Type Checking in Production**:

    - **How**: Modify your Vercel build command to skip linting and type checking. You can run these checks locally or in a separate CI job. For example, change your build command to:
        ```bash
        bun run build --skip-lint --skip-typecheck
        ```

3. **Optimize Next.js Configuration**:

    - **How**: Ensure you are using the latest stable version of Next.js. Review your `next.config.js` for optimizations like enabling Incremental Static Regeneration (ISR) if applicable.

4. **Review and Optimize Dependencies**:

    - **How**: Regularly audit your `package.json` to remove unnecessary dependencies. Use tools like `npm prune` or `bun remove <package>` to clean up.

5. **Monitor Build Times**:

    - **How**: Use Vercel's analytics dashboard to track build times and identify slow steps. Adjust your workflow based on the insights gained.

6. **Consider Using Edge Functions**:

    - **How**: If applicable, refactor parts of your application to use Vercel's Edge Functions for faster response times. Review the Vercel documentation for implementation details.

7. **Utilize a Lockfile**:
    - **How**: Ensure you have a lockfile (`bun.lockb`) committed to your repository to maintain consistent dependency versions across builds.

-   Potentially combine workflow jobs into steps
-   Maybe build in workflow and pass to Vercel, or vice versa
-   Maybe opt for disabling a workflow if ran locally
