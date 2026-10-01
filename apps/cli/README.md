# Command-line application

Stage 2 assembles Core, the bundled catalog, and SVG rendering. Build at the root,
then run:

```sh
pnpm build
pnpm avatar --request examples/requests/assistant.json --output output/avatar.svg
```

Create the destination directory first. Omit `--output` to write SVG to stdout.
For machine pipelines, invoke `node apps/cli/dist/main.js` directly. `--help`
prints usage. Unknown or duplicate flags and invalid requests fail with code 2;
I/O failures use code 1. Existing files are never overwritten. Success uses code 0.

`src/index.ts` exports `runCli`; `src/main.ts` is the process entrypoint.
PNG, batch generation, HTTP, and interactive UI are outside this stage.
