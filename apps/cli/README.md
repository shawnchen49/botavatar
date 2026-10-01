# Command-line application

Build from the root, then generate SVG or PNG using `format` in the request:

```sh
pnpm build
pnpm avatar --request examples/requests/coder.json --output output/avatar.svg
```

Create the destination parent first. Omit `--output` for stdout, including binary
PNG output. For pipelines, invoke `node apps/cli/dist/main.js` directly to avoid
package-manager logging. The filename extension does not override request format.

Batch input is a JSON array of 1–100 requests, up to 1 MiB:

```sh
pnpm avatar --batch examples/requests/batch.json --output-dir output/my-batch
```

The destination must not exist. Validation and rendering finish before directory
creation. Files use numbered names, with format-specific extensions. A final
`manifest.json` records requests, normalized values, versions, resource identities,
and file SHA-256 hashes. I/O failures may leave an incomplete directory without a
manifest; inspect it and choose a new destination before retrying.

`--help` prints usage. Unknown, duplicate, or incompatible flags and invalid input
exit 2; I/O/conversion errors exit 1; success exits 0. Existing files are never
overwritten. `runCli` is the public entrypoint; `main.ts` owns process startup.
